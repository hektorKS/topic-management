package com.hektorks.bucket.rest

import com.hektorks.bucket.businesslogic.command.UpdateBucketCommand
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

data class UpdateBucketRequest(
  val name: String
)

@RestController
@RequestMapping("/api/v1")
class UpdateBucketController(private val updateBucketCommand: UpdateBucketCommand) {
  private val log = LoggerFactory.getLogger(javaClass)

  @PatchMapping("/buckets/{id}")
  fun updateBucket(@RequestBody updateBucketRequest: UpdateBucketRequest, @PathVariable("id") bucketId: UUID): ResponseEntity<Unit> {
    updateBucketCommand.execute(bucketId, updateBucketRequest)
    log.info("Updated bucket with id=$bucketId")
    return ResponseEntity.noContent().build()
  }

}
