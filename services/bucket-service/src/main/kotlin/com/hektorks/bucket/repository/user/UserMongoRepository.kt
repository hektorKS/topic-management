package com.hektorks.bucket.repository.user

import com.hektorks.bucket.model.User
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface UserMongoRepository : UserRepository, MongoRepository<User, UUID>
