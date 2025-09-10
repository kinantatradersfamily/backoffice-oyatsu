#!/bin/bash

# URL endpoint
URL="http://localhost:3000/auth/login"

# Data login
USERNAME="member1"
PASSWORD="123456"

# Request pakai curl
curl -X POST $URL \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=$USERNAME&password=$PASSWORD" \
  -s | jq .