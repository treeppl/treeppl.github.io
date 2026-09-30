#!/usr/bin/env fish

# Generates docs/model-library from the model READMEs under
# other-repositories/treeppl/lib/models. docs/model-library is
# git-ignored; run this script to (re)generate it.

source (path resolve (status dirname))/repo-utils.fish

ensureRepo treeppl https://github.com/treeppl/treeppl.git

set -l modelsDir $repoDir/other-repositories/treeppl/lib/models
set -l outDir $repoDir/docs/model-library
set -l index $outDir/index.md

rm -rf $outDir
mkdir -p $outDir

echo '---
id: models
sidebar_position: 10
---

# Model library

A library of models has been created as a part of TreePPL, see the `models` directory.

Here is a list of example models of biological interest.
' > $index

for dir in $modelsDir/*
    set -l name (path basename $dir)
    set -l readme $dir/README.md
    test -f $readme || continue
    cp $readme $outDir/$name.md
    set -l description (awk 'c&&!--c; /id:/{c=1}' $readme | sed 's/^.*: //')
    echo "- [$description]($name.md)" >> $index
end
