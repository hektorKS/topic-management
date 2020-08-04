package com.hektorks.message.repository.user

import com.hektorks.message.model.User
import org.springframework.data.mongodb.repository.MongoRepository
import java.util.UUID

interface UserMongoRepository : UserRepository, MongoRepository<User, UUID>
