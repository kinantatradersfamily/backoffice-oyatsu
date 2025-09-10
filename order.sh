#!/bin/bash

# === Konfigurasi ===
HOST="http://localhost:3000"   # ganti kalau API jalan di server lain
YEAR="2025"
MONTH="9"

URL="$HOST/order/$YEAR/$MONTH"

# Data sections (JSON array string)
SECTIONS='[{"email":"nofile@example.com","phone":"08987654321","flavor":"Vanilla","document":"Doc no file"}]'

# === Eksekusi Request ===
curl -X POST "$URL" \
  -F "sections=$SECTIONS" \
  -H "Accept: application/json"
