#!/bin/bash

rm -rf docs/model-library
mkdir docs/model-library

cat >> docs/model-library/index.md << 'END'
---
id: models
sidebar_position: 10
---

# Model library

A library of models has been created as a part of TreePPL, see the `models` directory.  

Here is a list of example models of biological interest.

END

git clone https://github.com/treeppl/treeppl.git

base_name="./treeppl/lib/models/"
last_dir=$(ls $base_name)
for name in $last_dir
do
    file_name=$base_name$name"/README.md"
    if [ -f "$file_name" ]; then
        cp "$file_name" "./docs/model-library/"$name".md"
        description=$(awk 'c&&!--c; /id:/{c=1}' "$file_name" | sed 's/^.*: //')
        echo "- [$description]("$name".md)" >> docs/model-library/index.md
    fi
done

rm -rf ./treeppl