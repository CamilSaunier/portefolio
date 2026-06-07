#!/usr/bin/env bash
# Régénère les CV (PDF) et leurs aperçus (PNG) depuis cv-src/*.html.
# Pour chaque langue : une variante claire et une variante sombre (?dark),
# puis chaque PDF est converti en images de pages pour l'aperçu du portfolio.
#
# Prérequis : google-chrome-stable (PDF) + pdftocairo / poppler-utils (PNG).
# Usage : bash scripts/generate-cv.sh   (depuis la racine du projet)

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/cv-src"
OUT="$ROOT/public/cv"
CHROME="${CHROME:-google-chrome-stable}"

mkdir -p "$OUT"

# nom_source  nom_sortie
# (clair = sans ?dark, sombre = avec ?dark)
gen() {
  local src="$1" out="$2"
  echo "→ $out (clair)"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="$OUT/$out.pdf" "file://$SRC/$src.html" 2>/dev/null
  echo "→ ${out}_Sombre (sombre)"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="$OUT/${out}_Sombre.pdf" "file://$SRC/$src.html?dark" 2>/dev/null
}

# génère les PDF
gen "cv-fr" "Camil_Saunier_CV_Francais"
gen "cv-en" "Camil_Saunier_CV_English"

# convertit chaque PDF en images de pages (aperçu)
echo "→ conversion des PDF en images (pdftocairo)"
for pdf in "$OUT"/*.pdf; do
  base="${pdf%.pdf}"
  rm -f "${base}"-*.png
  pdftocairo -png -r 150 "$pdf" "$base" 2>/dev/null
done

# rogne 2px à droite et en bas de chaque aperçu : supprime le liseré
# d'anti-aliasing dû à la rasterisation A4 (210mm) en pixels non entiers.
# (le PDF, vectoriel, n'est pas touché.)
echo "→ rognage du liseré de bord des aperçus (PIL)"
python3 - "$OUT" <<'PY'
import sys, glob, os
from PIL import Image
out = sys.argv[1]
for f in glob.glob(os.path.join(out, "*.png")):
    im = Image.open(f)
    w, h = im.size
    im.crop((0, 0, w - 2, h - 2)).save(f)
PY

echo "✓ CV régénérés : $(ls "$OUT"/*.pdf | wc -l) PDF, $(ls "$OUT"/*.png | wc -l) images"
