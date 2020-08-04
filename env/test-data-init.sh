#!/bin/bash

# ADMIN INITIALIZATION
# Initialize test users
USER_KONRAD_RESPONSE=$(curl -X POST http://localhost:9703/api/v1/users -H 'Content-Type: application/json' \
  -d '{
	"firstName": "Konrad",
	"lastName": "Szyszka",
	"username": "hektorKS",
	"email": "kszyszka.1995@wp.pl",
	"password": "super#tajne443$"
}')
USER_KONRAD_UUID=$(echo "$USER_KONRAD_RESPONSE" | sed -nE 's/.*"id":"(.*)".*/\1/p')
echo "USER_KONRAD_UUID=$USER_KONRAD_UUID"
sleep 1

USER_MARCIN_RESPONSE=$(curl -X POST http://localhost:9703/api/v1/users -H 'Content-Type: application/json' \
  -d '{
	"firstName": "Marcin",
	"lastName": "Szukalski",
	"username": "marszuk15",
	"email": "marszuk15@wp.pl",
	"password": "pass$%^&1"
}')
USER_MARCIN_UUID=$(echo "$USER_MARCIN_RESPONSE" | sed -nE 's/.*"id":"(.*)".*/\1/p')
echo "USER_MARCIN_UUID=$USER_MARCIN_UUID"
sleep 1

USER_MICHAL_RESPONSE=$(curl -X POST http://localhost:9703/api/v1/users -H 'Content-Type: application/json' \
  -d '{
	"firstName": "Michał",
	"lastName": "Grzdąkalski",
	"username": "grzaku",
	"email": "grzaku.grzaku@gmail.com",
	"password": "HASLO449$*"
}')
USER_MICHAL_UUID=$(echo "$USER_MICHAL_RESPONSE" | sed -nE 's/.*"id":"(.*)".*/\1/p')
echo "USER_MICHAL_UUID=$USER_MICHAL_UUID"
sleep 1

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

# CERTAIN USERS INITIALIZATION
# Initialize test buckets
BUCKET_MAIN_RESPONSE=$(curl -X POST http://localhost:9701/api/v1/buckets -H 'Content-Type: application/json' \
  -d "{
	\"schoolId\": \"$SCHOOL_PP_UUID\",
	\"ownerId\": \"$USER_KONRAD_UUID\",
	\"name\": \"Informatyka WI, studia magisterskie, rok 2019 - 2020\"
}")
BUCKET_MAIN_UUID=$(echo "$BUCKET_MAIN_RESPONSE" | sed -nE 's/.*"id":"(.*)".*/\1/p')
echo "BUCKET_MAIN_UUID=$BUCKET_MAIN_UUID"
sleep 1

curl -X POST http://localhost:9701/api/v1/buckets -H 'Content-Type: application/json' \
  -d "{
	\"schoolId\": \"$SCHOOL_PP_UUID\",
	\"ownerId\": \"$USER_MARCIN_UUID\",
	\"name\": \"Informatyka WI, studia magisterskie, rok 2019 - 2020 - zakład Z1\"
}"
sleep 1

curl -X POST http://localhost:9701/api/v1/buckets -H 'Content-Type: application/json' \
  -d "{
	\"schoolId\": \"$SCHOOL_PP_UUID\",
	\"ownerId\": \"$USER_KONRAD_UUID\",
	\"name\": \"Informatyka WI, studia inżynierskie, rok 2015 - 2019\"
}"
sleep 1

curl -X POST http://localhost:9701/api/v1/buckets -H 'Content-Type: application/json' \
  -d "{
	\"schoolId\": \"$SCHOOL_PP_UUID\",
	\"ownerId\": \"$USER_KONRAD_UUID\",
	\"name\": \"Informatyka WI, studia inżynierskie, rok 2014 - 2018\"
}"
sleep 1

# Initialize test topics
curl -X POST http://localhost:9700/api/v1/topics -H 'Content-Type: application/json' \
  -d "{
	\"bucketId\": \"$BUCKET_MAIN_UUID\",
	\"title\": \"Super fajna magisterka pod nadzorem programisty z doświadczeniem\",
	\"description\": \"Będziemy się bawić Kafką, Kotlinem, Mongo i NgRx!\",
	\"supervisorId\": \"$USER_KONRAD_UUID\"
}"
