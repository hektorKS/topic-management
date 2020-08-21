### Topic Management project

#### Infrastructure
1. Kafka & zookeeper

2. MongoDB - 3 node cluster 

#### Backend
Written using Spring Framework, Kotlin and Maven as build tool 
 
##### Microservices:
1. Topic Service - Handles topics of projects or diploma thesis.

2. Bucket Service - Aggregates topics into a kind of folders.

3. User Service - Handles users and logging process.

4. School Service - Handles schools management.

5. Message Service - Handel communication between users.

6. [Nice to have] Statistics service - Gathers application statistics. 

7. [Nice to have] Access service - Manages users roles & access to resources. 

#### Frontend
Written in Angular using Angular Material, RxJS, NgRx and SCSS


#### Setup
```bash
./mvnw clean install
docker-compose up -d kafka mongo-node1 mongo-node2 mongo-node3
./env/init-mongo-cluster.sh
docker-compose up -d
./env/init-test-data.sh
```
