#!/bin/bash

# Initialize test users

# Initialize test schools
SCHOOL_PW_RESPONSE=$(curl -X POST http://localhost:9702/api/v1/schools -H 'Content-Type: application/json' \
  -d '{
	"name": "Politechnika Wrocławska",
	"address": {
		"country": "Poland",
		"city": "Wrocław",
		"zipCode": "50-370",
		"street": "Wybrzeże Wyspiańskiego",
		"buildingNumber": "27"
	}
}')
SCHOOL_PW_UUID=$(echo "$SCHOOL_PW_RESPONSE" | sed -nE 's/.*"id":"(.*)".*/\1/p')
echo "SCHOOL_PW_UUID=$SCHOOL_PW_UUID"
sleep 1

SCHOOL_PP_RESPONSE=$(curl -X POST http://localhost:9702/api/v1/schools -H 'Content-Type: application/json' \
  -d '{
	"name": "Politechnika Poznańska",
	"address": {
		"country": "Poland",
		"city": "Poznań",
		"zipCode": "60-965",
		"street": "Pl. Marii Skłodowskiej-Curie",
		"buildingNumber": "5"
	}
}')
SCHOOL_PP_UUID=$(echo "$SCHOOL_PP_RESPONSE" | sed -nE 's/.*"id":"(.*)".*/\1/p')
echo "SCHOOL_PP_UUID=$SCHOOL_PP_UUID"
sleep 1

SCHOOL_UAM_RESPONSE=$(curl -X POST http://localhost:9702/api/v1/schools -H 'Content-Type: application/json' \
  -d '{
	"name": "Uniwersytet im. Adama Mickiewicza",
	"address": {
		"country": "Poland",
		"city": "Poznań",
		"zipCode": "61-712",
		"street": "Wieniawskiego",
		"buildingNumber": "1"
	}
}')
SCHOOL_UAM_UUID=$(echo "$SCHOOL_UAM_RESPONSE" | sed -nE 's/.*"id":"(.*)".*/\1/p')
echo "SCHOOL_UAM_UUID=$SCHOOL_UAM_UUID"
sleep 1

# Initialize test buckets

# Initialize test topics
