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

#### Assumptions
1. I skip user roles, but I assume there should be: ADMIN, SCHOOL_ADMIN, LECTURER, STUDENT
- ADMIN
    - Can access admin side frontend (imitated by script)
    - He can create schools & admin account for SCHOOL_ADMIN
- SCHOOL_ADMIN
    - Can access school admin side frontend (imitated by script)
    - Can manage certain school resources & users
- LECTURER
    - Can create buckets & topics in client side frontend (must have LECTURER role in school)
    - Have full read-only access to resources in client side
    - Can communicate with STUDENTS
- STUDENT
    - Have full read-only access to resources in client side
    - Can communicate with LECTURER
    
2.I do not write tests atm on purpose (lack of time). Maybe in future I will add them.
