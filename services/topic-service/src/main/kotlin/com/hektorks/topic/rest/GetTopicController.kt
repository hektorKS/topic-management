package com.hektorks.topic.rest

import com.hektorks.exceptionhandling.ResourceNotFoundException
import com.hektorks.topic.model.Topic
import com.hektorks.topic.model.TopicView
import com.hektorks.topic.repository.topic.TopicRepository
import com.hektorks.topic.repository.topic.TopicViewRepository
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

data class GetTopicResponse(val topic: Topic)

data class GetTopicViewResponse(val topicView: TopicView)

@RestController
@RequestMapping("/api/v1")
class GetTopicController(private val topicRepository: TopicRepository, private val topicViewRepository: TopicViewRepository) {
  private val log = LoggerFactory.getLogger(javaClass)

  @GetMapping("/topics/{id}")
  fun getTopicById(@PathVariable("id") topicId: UUID): ResponseEntity<GetTopicResponse> {
    val topic = topicRepository.getById(topicId) ?: throw ResourceNotFoundException()
    log.info("Topic found: $topic")
    return ResponseEntity.ok().body(GetTopicResponse(topic))
  }

  @GetMapping("/topics/{id}/view")
  fun getTopicViewById(@PathVariable("id") topicId: UUID): ResponseEntity<GetTopicViewResponse> {
    val topic = topicViewRepository.getViewByTopicId(topicId) ?: throw ResourceNotFoundException()
    log.info("Topic view found: $topic")
    return ResponseEntity.ok().body(GetTopicViewResponse(topic))
  }

}
