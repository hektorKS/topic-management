#!/bin/bash

# Replication sets configuration
docker exec mongo-node1 mongo --eval 'rs.initiate({"_id": "replicaSet1", "members": [{"_id": 0,"host":"mongo-node1:27017","priority": 1000},{"_id": 1,"host":"mongo-node2:27017","priority": 50},{"_id":2,"host":"mongo-node3:27017","priority":50}]});'
sleep 20
docker exec mongo-node1 mongo topic --eval 'rs.status()'

# Collections - TOPIC SERVICE
sleep 1
docker exec mongo-node1 mongo topic --eval 'db.createCollection("topics")'
docker exec mongo-node1 mongo topic --eval 'db.createCollection("buckets")'
docker exec mongo-node1 mongo topic --eval 'db.createCollection("users")'
docker exec mongo-node1 mongo topic --eval 'db.topics.createIndex( { "bucketId": 1 } )'

# Collections - BUCKET SERVICE
sleep 1
docker exec mongo-node1 mongo bucket --eval 'db.createCollection("buckets")'
docker exec mongo-node1 mongo bucket --eval 'db.createCollection("users")'
docker exec mongo-node1 mongo bucket --eval 'db.createCollection("schools")'
docker exec mongo-node1 mongo bucket --eval 'db.buckets.createIndex( { "schoolId": 1 } )'

# Collections - SCHOOL SERVICE
sleep 1
docker exec mongo-node1 mongo school --eval 'db.createCollection("schools")'
docker exec mongo-node1 mongo school --eval 'db.schools.createIndex( { "name": 1 } )'

# Collections - USER SERVICE
sleep 1
docker exec mongo-node1 mongo user --eval 'db.createCollection("users")'
docker exec mongo-node1 mongo user --eval 'db.users.createIndex( { "identifier": 1 } )'

# Collections - MESSAGE SERVICE
sleep 1
docker exec mongo-node1 mongo message --eval 'db.createCollection("messages")'
docker exec mongo-node1 mongo message --eval 'db.users.createIndex( { "instant": 1 } )'
docker exec mongo-node1 mongo message --eval 'db.users.createIndex( { "senderId": 1, "recipientId": 1 } )'
