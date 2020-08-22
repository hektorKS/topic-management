#!/bin/bash

# User to send messages to
MESSAGE_USER_RESPONSE=$(curl -X POST http://localhost:9703/api/v1/users/sign-up -H 'Content-Type: application/json' \
  -d '{
	"firstName": "Konrad",
	"lastName": "Szyszka",
	"username": "kszyszka",
	"email": "kszyszka.1995@wp.pl",
	"password": "super#tajne443$"
}')
MESSAGE_USER_UUID=$(echo "$MESSAGE_USER_RESPONSE" | sed -nE 's/.*"id":"(.*)".*/\1/p')
echo "MESSAGE_USER_UUID=$MESSAGE_USER_UUID"

counter=0
while [ $counter -le 1000 ]
do
  # Create user
  USERNAME="test-user-$counter"
  USER_RESPONSE=$(curl -X POST http://localhost:9703/api/v1/users/sign-up -H 'Content-Type: application/json' \
    -d "{
    \"firstName\": \"Max\",
    \"lastName\": \"Test\",
    \"username\": \"$USERNAME\",
    \"email\": \"test.email.1990@gmail.com\",
    \"password\": \"super#secret443$\"
  }")
  USER_UUID=$(echo "$USER_RESPONSE" | sed -nE 's/.*"id":"(.*)".*/\1/p')
  echo "USER_UUID=$USER_UUID"

  # Sign in with user
  SIGN_IN_RESPONSE=$(curl -X POST http://localhost:9703/api/v1/users/sign-in -H 'Content-Type: application/json' \
    -d "{
  	\"username\": \"$USERNAME\",
  	\"password\": \"super#secret443$\"
  }")
  TOKEN=$(echo "$SIGN_IN_RESPONSE" | sed -nE 's/.*"jwtToken":"(.*)".*/\1/p')
  echo "TOKEN=$TOKEN"

  # Create school
  SCHOOL_RESPONSE=$(curl -X POST http://localhost:9702/api/v1/schools -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"name\": \"Politechnika Wrocławska $counter\",
    \"address\": {
      \"country\": \"Poland\",
      \"city\": \"Wrocław\",
      \"zipCode\": \"50-370\",
      \"street\": \"Wybrzeże Wyspiańskiego\",
      \"buildingNumber\": \"27\"
    }
  }")
  SCHOOL_UUID=$(echo "$SCHOOL_RESPONSE" | sed -nE 's/.*"id":"(.*)".*/\1/p')
  echo "SCHOOL_UUID=$SCHOOL_UUID"

  # Create 100 buckets
  bucket_counter=0
  while [ $bucket_counter -le 100 ]
  do
    BUCKET_RESPONSE=$(curl -X POST http://localhost:9701/api/v1/buckets -H 'Content-Type: application/json' \
      -H "Authorization: Bearer $TOKEN" \
      -d "{
      \"schoolId\": \"$SCHOOL_UUID\",
      \"ownerId\": \"$USER_UUID\",
      \"name\": \"Informatyka WI, studia magisterskie, rok 2019 - 2020 - $counter - $bucket_counter\"
    }")
    BUCKET_UUID=$(echo "$BUCKET_RESPONSE" | sed -nE 's/.*"id":"(.*)".*/\1/p')
    echo "BUCKET_UUID=$BUCKET_UUID"

    # Create 10 topics in bucket
    topic_counter=0
    while [ $topic_counter -le 10 ]
    do
        TOPIC_RESPONSE=$(curl -X POST http://localhost:9700/api/v1/topics -H 'Content-Type: application/json' \
          -H "Authorization: Bearer $TOKEN" \
          -d "{
          \"bucketId\": \"$BUCKET_UUID\",
          \"title\": \"Super fajna magisterka $counter - $bucket_counter - $topic_counter\",
          \"description\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet mi sit amet ipsum elementum consectetur. Vivamus vitae sagittis libero. Etiam congue nisl eget euismod venenatis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean vehicula sem ultricies facilisis blandit. Aenean ac ligula malesuada, bibendum.\",
          \"supervisorId\": \"$USER_UUID\"
        }")
        TOPIC_UUID=$(echo "$TOPIC_RESPONSE" | sed -nE 's/.*"id":"(.*)".*/\1/p')
        echo "TOPIC_UUID=$TOPIC_UUID"
        ((topic_counter++))
    done
    ((bucket_counter++))
  done

  # Send 1000 messages
  message_counter=0
  while [ $message_counter -le 1000 ]
  do
    curl -X POST \
    http://localhost:9704/api/v1/messages -H 'Content-Type: application/json' \
      -H "Authorization: Bearer $TOKEN" \
      -d "{
        \"senderId\": \"$USER_UUID\",
        \"recipientId\": \"$MESSAGE_USER_UUID\",
        \"message\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in.\"
      }"
    ((message_counter++))
  done
  ((counter++))
done
