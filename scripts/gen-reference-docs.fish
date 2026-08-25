#!/usr/bin/env fish

# Generates docs/Reference/**/*.md from the .tppl sources under
# other-repositories/treeppl/lib. Each generated file lists the types,
# functions, and type aliases defined in the corresponding .tppl file,
# sorted alphabetically, along with the comment preceding each one (if
# any). docs/Reference is git-ignored; run this script to (re)generate it.

source (path resolve (status dirname))/repo-utils.fish

set -l scriptDir $repoDir/scripts

ensureRepo treeppl https://github.com/treeppl/treeppl.git

set -l libDir $repoDir/other-repositories/treeppl/lib
set -l outDir $repoDir/docs/Reference

set -l US (printf '\x01')
set -l NL (printf '\x02')

rm -rf $outDir
mkdir -p $outDir

set -l count 0
for src in (find $libDir -name '*.tppl' | sort)
    set count (math $count + 1)
    set -l rel (string replace -- "$libDir/" "" $src)
    set -l out $outDir/(string replace -r '\.tppl$' '.md' -- $rel)
    mkdir -p (path dirname $out)

    set -l entries (awk -f $scriptDir/reference-doc-gen.awk $src | sort -f)

    begin
        echo "# "(path basename $src)
        echo

        if test (count $entries) -eq 0
            echo "No definitions found in this file."
        else
            for entry in $entries
                set -l fields (string split -- $US $entry)
                set -l name $fields[1]
                set -l kind $fields[2]
                set -l sigLines (string split -- $NL $fields[3])
                set -l commentLines
                if test -n "$fields[4]"
                    set commentLines (string split -- $NL $fields[4])
                end

                echo "## _"$kind"_ `"$name"`"
                echo
                if test (count $commentLines) -gt 0
                    printf '%s\n' $commentLines
                    echo
                end
                echo '```tppl'
                printf '%s\n' $sigLines
                echo '```'
                echo
            end
        end
    end > $out
end

echo "Generated reference docs for $count file(s) in $outDir"
