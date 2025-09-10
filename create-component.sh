BASE_URL="http://localhost:3000/component"
YEAR=2025
MONTH=2

echo "=== CREATE MANY COMPONENTS FOR YEAR $YEAR, MONTH $MONTH ==="

curl -X POST "$BASE_URL/$YEAR/$MONTH" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "section": "section_1",
      "title": "Tentang Kami",
      "desc": "Kami adalah perusahaan IT yang fokus pada solusi digital",
      "image": "https://example.com/about.jpg"
    },
    {
      "section": "section_3",
      "title": "Paket Premium",
      "desc": "Layanan premium dengan fitur lengkap",
      "image": "https://example.com/premium.jpg",
      "price": 150000
    }
  ]'
echo ""