package com.hektorks.topic.rest

import com.hektorks.topic.model.Topic
import com.hektorks.topic.repository.topic.TopicRepository
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
class GetTopicsController(private val topicRepository: TopicRepository) {
  private val log = LoggerFactory.getLogger(javaClass)

  @GetMapping("/topics")
  fun getTopics(): ResponseEntity<GetTopicsResponse> {
    val topics = topicRepository.getAll()
    log.info("Topics found: $topics")
    return ResponseEntity.ok().body(GetTopicsResponse(topics))
  }

  @GetMapping("/topics/bucket/{bucketId}")
  fun getTopics(@PathVariable("bucketId") bucketId: UUID): ResponseEntity<GetTopicsResponse> {
    val topics = topicRepository.getByBucketId(bucketId)
    log.info("Topics found for bucketId=$bucketId: $topics")
    return ResponseEntity.ok().body(GetTopicsResponse(topics))
  }

}
