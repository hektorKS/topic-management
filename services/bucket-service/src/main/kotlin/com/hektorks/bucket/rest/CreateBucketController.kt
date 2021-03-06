package com.hektorks.bucket.rest

import com.hektorks.bucket.businesslogic.command.CreateBucketCommand
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

data class CreateBucketRequest(
    val schoolId: UUID,
    val ownerId: UUID,
    val name: String
)

data class CreateBucketResponse(val id: UUID)

@RestController
@RequestMapping("/api/v1")
class CreateBucketController(private val createBucketCommand: CreateBucketCommand) {
  private val log = LoggerFactory.getLogger(javaClass)

  @PostMapping("/buckets")
  fun createBucket(@RequestBody createBucketRequest: CreateBucketRequest): ResponseEntity<CreateBucketResponse> {
    val bucketId = createBucketCommand.execute(createBucketRequest)
    log.info("Created bucket with id=$bucketId")
    return ResponseEntity.ok().body(CreateBucketResponse(bucketId))
  }

}
