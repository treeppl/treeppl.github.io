#!/bin/bash

git clone https://github.com/treeppl/treeppl.git

base_name="./treeppl/models/"
last_dir=$(ls $base_name)
for name in $last_dir
do
    file_name=$base_name$name"/README.md"
    if [ -f "$file_name" ]; then
        mv "$file_name" "./docs/model-library/"$name".md"
    fi
done

rm -rf ./treeppl