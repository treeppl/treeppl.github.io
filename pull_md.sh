#!/bin/bash

git clone https://github.com/treeppl/treeppl.git
mv ./treeppl/models/*.md ./docs/model-library
rm -rf ./treeppl