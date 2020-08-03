package com.hektorks.bucket.repository.bucket

import com.hektorks.bucket.model.Bucket
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface BucketMongoRepository : BucketRepository, MongoRepository<Bucket, UUID>
