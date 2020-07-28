#!/bin/bash

# Replication sets configuration
docker exec mongo-node1 mongo --eval 'rs.initiate({"_id": "replicaSet1", "members": [{"_id": 0, "host": "mongo-node1:27017", "priority": 2},{"_id": 1,"host": "mongo-node2:27017", "priority": 1}]});'

# Collections - TOPIC SERVICE
docker exec mongo-node1 mongo topic --eval 'db.createCollection("topics")'
docker exec mongo-node1 mongo topic --eval 'db.createCollection("buckets")'
docker exec mongo-node1 mongo topic --eval 'db.topics.createIndex( { "bucketId": 1 } )'

# Collections - BUCKET SERVICE
docker exec mongo-node1 mongo bucket --eval 'db.createCollection("buckets")'
docker exec mongo-node1 mongo bucket --eval 'db.buckets.createIndex( { "schoolId": 1 } )'
