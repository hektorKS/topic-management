package com.hektorks.user.repository.user

import com.hektorks.user.model.User
import org.springframework.data.mongodb.repository.MongoRepository
import java.util.UUID

interface UserMongoRepository : UserRepository, MongoRepository<User, UUID>
