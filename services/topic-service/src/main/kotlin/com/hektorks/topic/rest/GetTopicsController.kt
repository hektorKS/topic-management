package com.hektorks.topic.rest

import com.hektorks.model.topic.Topic
import com.hektorks.topic.businesslogic.command.GetTopicsCommand
import com.hektorks.topic.businesslogic.command.GetTopicsInBucketCommand
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

data class GetTopicsResponse(val topics: List<Topic>)

@RestController
@RequestMapping("/api/v1")
class GetTopicsController(private val getTopicsCommand: GetTopicsCommand,
                          private val getTopicsInBucketCommand: GetTopicsInBucketCommand) {
  private val log = LoggerFactory.getLogger(javaClass)

  @GetMapping("/topics")
  fun getTopics(): ResponseEntity<GetTopicsResponse> {
    val topics = getTopicsCommand.execute()
    log.info("Topics found: $topics")
    return ResponseEntity.ok().body(GetTopicsResponse(topics))
  }

  @GetMapping("/topics/bucket/{bucketId}")
  fun getTopics(@PathVariable("bucketId") bucketId: UUID): ResponseEntity<GetTopicsResponse> {
    val topics = getTopicsInBucketCommand.execute(bucketId)
    log.info("Topics by bucketId: $bucketId found: $topics")
    return ResponseEntity.ok().body(GetTopicsResponse(topics))
  }

}
