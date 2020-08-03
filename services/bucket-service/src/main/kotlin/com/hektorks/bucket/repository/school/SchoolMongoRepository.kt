package com.hektorks.bucket.repository.school

import com.hektorks.bucket.model.School
import org.springframework.data.mongodb.repository.MongoRepository
import java.util.UUID

interface SchoolMongoRepository : SchoolRepository, MongoRepository<School, UUID>
