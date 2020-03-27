#!/bin/bash

docker exec mongo-node1 mongo topic --eval 'rs.status()'
