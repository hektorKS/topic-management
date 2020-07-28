package com.hektorks.topic.repository.bucket

import com.hektorks.topic.model.Bucket
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface BucketMongoRepository: MongoRepository<Bucket, UUID>
