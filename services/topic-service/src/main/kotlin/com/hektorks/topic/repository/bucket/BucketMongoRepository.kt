package com.hektorks.topic.repository.bucket

import com.hektorks.topic.model.Bucket
import org.springframework.data.mongodb.repository.MongoRepository
import java.util.UUID

interface BucketMongoRepository: BucketRepository, MongoRepository<Bucket, UUID>
