package com.hektorks.bucket.repository.school

import com.hektorks.bucket.model.School
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface SchoolMongoRepository : SchoolRepository, MongoRepository<School, UUID>
