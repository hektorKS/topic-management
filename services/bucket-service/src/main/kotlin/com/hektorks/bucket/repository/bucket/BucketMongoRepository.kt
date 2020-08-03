package com.hektorks.bucket.repository.bucket

import com.hektorks.bucket.model.Bucket
import org.springframework.data.mongodb.repository.MongoRepository
import java.util.UUID

interface BucketMongoRepository : BucketRepository, MongoRepository<Bucket, UUID>
