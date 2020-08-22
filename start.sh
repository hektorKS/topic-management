#!/bin/bash

./mvnw clean install

docker-compose up -d kafka mongo-node1 mongo-node2 mongo-node3
sleep 30

./env/init-mongo-cluster.sh
sleep 30

docker-compose up -d
sleep 30

./env/init-test-data.sh
