#!/bin/sh

filename=$(basename "$1")
extension="${filename##*.}"
filename="${filename%.*}"

if [ $extension == "frag" ]; then
    glslViewer $1 --headless -s 2 -o $filename.png
    convert $filename.png -negate $filename.pnm
    rm $filename.png
else
    convert $1  $filename.pnm
fi

potrace $filename.pnm -s -o $filename.svg
rm $filename.pnm