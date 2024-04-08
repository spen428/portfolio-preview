#!/bin/bash
set -e
scriptDir="$(dirname "$0")"
pdfDir="$scriptDir/../bin/"
workDir="$scriptDir/../visual_regressions/pdf_test"

rm -rfv "$workDir/png"
mkdir -p "$workDir/png"

extractPngs() {
  local pdf="$1"
  local name
  name="$(basename "$pdf" | sed 's/\.pdf$//')"

  gs -dBATCH \
    -dNOPAUSE \
    -dNOPROMPT \
    -dMaxBitmap=500000000 \
    -dAlignToPixels=0 \
    -dGridFitTT=2 \
    -sDEVICE=pngalpha \
    -dTextAlphaBits=4 \
    -dGraphicsAlphaBits=4 \
    -r300x300 \
    -sOutputFile="$workDir/png/$name-%d.png" \
    "$pdf"

  while read -r png; do
    convert -verbose -flatten -background white "$png" "$png"
  done < <(find "$workDir/png" -name "$name-*.png")

  echo "Finished extracting PNGs for $pdf"
}

processIds=()
while read -r pdf; do
  extractPngs "$pdf" &
  processIds+=($!)
done < <(find "$pdfDir" -type f -iname "*.pdf")

for pid in "${processIds[@]}"; do
  wait "$pid"
done
