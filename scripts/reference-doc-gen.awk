# Extracts top-level type, type alias, and function definitions (including
# `model function`) from a .tppl source file, together with the comment
# block immediately preceding each one, if any.
#
# Emits one record per line to stdout: name US kind US signature US comment
# where US is \x01 and internal newlines within signature/comment are \x02,
# so each record stays on a single physical output line (sortable, and easy
# to split back apart by the caller).

BEGIN {
    US = sprintf("%c", 1)
    NLc = sprintf("%c", 2)
    OFS = US
    depth = 0
    capturing = 0
    mode = ""
    haveComment = 0
    commentBuf = ""
    inBlock = 0
}

function resetComment() {
    commentBuf = ""
    haveComment = 0
}

function addCommentLine(line,    cleaned) {
    cleaned = line
    sub(/^[ \t]*\/\*/, "", cleaned)
    sub(/^[ \t]*\/\//, "", cleaned)
    sub(/\*\/[ \t]*$/, "", cleaned)
    sub(/^[ \t]*\*[ \t]?/, "", cleaned)
    gsub(/^[ \t]+/, "", cleaned)
    gsub(/[ \t]+$/, "", cleaned)
    if (cleaned == "") return
    if (haveComment) commentBuf = commentBuf NLc cleaned
    else { commentBuf = cleaned; haveComment = 1 }
}

function braceDelta(line,    i, c, d) {
    d = 0
    for (i = 1; i <= length(line); i++) {
        c = substr(line, i, 1)
        if (c == "{") d++
        else if (c == "}") d--
    }
    return d
}

function emit() {
    print name, kind, sigBuf, (haveComment ? commentBuf : "")
    resetComment()
    capturing = 0
    mode = ""
    sigBuf = ""
}

# Consumes one line of a function's header (the part before its body's
# opening brace). Once the brace is found, only the text before it is kept
# in sigBuf, and capturing switches to silently tracking depth through the
# body via "func-body-skip".
function headerLine(line,    pos, prefix) {
    pos = index(line, "{")
    if (pos == 0) {
        sigBuf = (sigBuf == "" ? line : sigBuf NLc line)
        return
    }
    prefix = substr(line, 1, pos - 1)
    gsub(/[ \t]+$/, "", prefix)
    if (prefix != "") sigBuf = (sigBuf == "" ? prefix : sigBuf NLc prefix)
    depth = braceDelta(line)
    mode = "func-body-skip"
    if (depth <= 0) emit()
}

{
    line = $0

    if (capturing) {
        if (mode == "variant") {
            t = line
            gsub(/^[ \t]+/, "", t)
            gsub(/[ \t]+$/, "", t)
            if (substr(t, 1, 1) == "|") {
                sigBuf = sigBuf NLc line
                next
            } else {
                emit()
                # fall through: reprocess this line as top-level below
            }
        } else if (mode == "func-header") {
            headerLine(line)
            next
        } else if (mode == "func-body-skip") {
            depth += braceDelta(line)
            if (depth <= 0) emit()
            next
        } else {
            sigBuf = sigBuf NLc line
            depth += braceDelta(line)
            if (depth <= 0) emit()
            next
        }
    }

    t = line
    gsub(/^[ \t]+/, "", t)
    gsub(/[ \t]+$/, "", t)

    if (inBlock) {
        addCommentLine(line)
        if (t ~ /\*\/[ \t]*$/) inBlock = 0
        next
    }

    if (t == "") { resetComment(); next }

    if (t ~ /^\/\//) { addCommentLine(line); next }

    if (t ~ /^\/\*/) {
        addCommentLine(line)
        if (t !~ /\*\/[ \t]*$/) inBlock = 1
        next
    }

    if (match(t, /^(model[ \t]+)?type[ \t]+alias[ \t]+[A-Za-z_][A-Za-z0-9_]*/)) {
        kind = "type alias"
        name = t
        sub(/^(model[ \t]+)?type[ \t]+alias[ \t]+/, "", name)
        sub(/[^A-Za-z0-9_].*$/, "", name)
    } else if (match(t, /^(model[ \t]+)?type[ \t]+[A-Za-z_][A-Za-z0-9_]*/)) {
        kind = "type"
        name = t
        sub(/^(model[ \t]+)?type[ \t]+/, "", name)
        sub(/[^A-Za-z0-9_].*$/, "", name)
    } else if (match(t, /^(model[ \t]+)?function[ \t]+[A-Za-z_][A-Za-z0-9_]*/)) {
        kind = "function"
        name = t
        sub(/^(model[ \t]+)?function[ \t]+/, "", name)
        sub(/[^A-Za-z0-9_].*$/, "", name)
    } else {
        resetComment()
        next
    }

    sigBuf = ""
    if (kind == "type" && braceDelta(line) == 0 && t ~ /=[ \t]*$/) {
        sigBuf = line
        mode = "variant"
        capturing = 1
        next
    }
    if (kind == "function") {
        mode = "func-header"
        capturing = 1
        headerLine(line)
        next
    }

    sigBuf = line
    depth = braceDelta(line)
    if (depth <= 0) {
        emit()
    } else {
        mode = "brace"
        capturing = 1
    }
}
