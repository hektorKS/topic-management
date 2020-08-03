package com.hektorks.bucket.repository.user

import com.hektorks.bucket.model.User
import org.springframework.data.mongodb.repository.MongoRepository
import java.util.UUID

interface UserMongoRepository : UserRepository, MongoRepository<User, UUID>
