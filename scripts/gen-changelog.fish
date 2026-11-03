#!/usr/bin/env fish

# Generates docs/changelog from CHANGELOG.md pulling from 
# the project root. docs/changelog is
# git-ignored; run this script to (re)generate it.

source (path resolve (status dirname))/repo-utils.fish

ensureRepo treeppl https://github.com/treeppl/treeppl.git
ensureRepo treeppl-python https://github.com/treeppl/treeppl-python.git
ensureRepo treepplr https://github.com/treeppl/treepplr.git

set -U modelsDir $repoDir/other-repositories/treeppl $repoDir/other-repositories/treeppl-python $repoDir/other-repositories/treepplr
set -l outDir $repoDir/docs/changelogs
set -l index $outDir/index.md

rm -rf $outDir
mkdir -p $outDir

echo '---
id: changelog
sidebar_position: 10
---

# Changelog

All notable changes to the support projects (since 2026-02-19) are documented in these files. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). 
These projects adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) with the following convention:

They use versioning in the format `v{X.Y.Z}`, where X, Y, and Z are integers:
* **X and Y** are determined by the `treeppl` version and used as-is by `treepplr` and `treeppl-python` (e.g., both `treepplr v1.2.0` and `treeppl-python v1.2.1` rely on `treeppl v1.2`).
* **Z** is unconstrained for `treepplr` and `treeppl-python` so they can track their own internal change
' > $index

for dir in $modelsDir
    set -l name (path basename $dir)
    set -l changelog $dir/CHANGELOG.md
    test -f $changelog || continue
    cp $changelog $outDir/$name.md
    set -l description (awk '/^#/ {sub(/^#\s*/, ""); print; exit}' $changelog)
    echo "- [$description]($name.md)" >> $index
end