#!/bin/bash

function getCollectionSize() {
  databaseName=$1
  collectionName=$2
  docker exec mongo-node1 mongo "$databaseName" --eval "db.${collectionName}.stats({'scale': 1024})" | \
   grep size | \
    sed -nE 's/.*"size" : (.*),.*/\1/p'
}

US_USERS_COLLECTION_SIZE_KB=$(getCollectionSize user users)
TS_TOPICS_COLLECTION_SIZE_KB=$(getCollectionSize topic topics)
TS_BUCKETS_COLLECTION_SIZE_KB=$(getCollectionSize topic buckets)
TS_USERS_COLLECTION_SIZE_KB=$(getCollectionSize topic users)
BS_BUCKETS_COLLECTION_SIZE_KB=$(getCollectionSize bucket buckets)
BS_SCHOOLS_COLLECTION_SIZE_KB=$(getCollectionSize bucket schools)
BS_USERS_COLLECTION_SIZE_KB=$(getCollectionSize bucket users)
MS_MESSAGES_COLLECTION_SIZE_KB=$(getCollectionSize message messages)
MS_USERS_COLLECTION_SIZE_KB=$(getCollectionSize message users)
SS_SCHOOLS_COLLECTION_SIZE_KB=$(getCollectionSize school schools)

echo "[User Service] usersSize=${US_USERS_COLLECTION_SIZE_KB}kB"
echo "[Topic Service] topicsSize=${TS_TOPICS_COLLECTION_SIZE_KB}kB"
echo "[Topic Service] bucketsSize=${TS_BUCKETS_COLLECTION_SIZE_KB}kB"
echo "[Topic Service] usersSize=${TS_USERS_COLLECTION_SIZE_KB}kB"
echo "[Bucket Service] bucketsSize=${BS_BUCKETS_COLLECTION_SIZE_KB}kB"
echo "[Bucket Service] schoolsSize=${BS_SCHOOLS_COLLECTION_SIZE_KB}kB"
echo "[Bucket Service] usersSize=${BS_USERS_COLLECTION_SIZE_KB}kB"
echo "[Message Service] messagesSize=${MS_MESSAGES_COLLECTION_SIZE_KB}kB"
echo "[Message Service] usersSize=${MS_USERS_COLLECTION_SIZE_KB}kB"
echo "[School Service] schoolsSize=${SS_SCHOOLS_COLLECTION_SIZE_KB}kB"
