package com.hektorks.topic.repository.user

import com.hektorks.topic.model.User
import org.springframework.data.mongodb.repository.MongoRepository
import java.util.UUID

interface UserMongoRepository : UserRepository, MongoRepository<User, UUID>
