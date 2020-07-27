package com.hektorks.topic.rest

import com.hektorks.topic.model.Topic
import com.hektorks.topic.businesslogic.command.GetTopicCommand
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

data class GetTopicResponse(val topic: Topic)

@RestController
@RequestMapping("/api/v1")
class GetTopicController(private val getTopicCommand: GetTopicCommand) {
  private val log = LoggerFactory.getLogger(javaClass)

  @GetMapping("/topics/{id}")
  fun getTopicById(@PathVariable("id") topicId: UUID): ResponseEntity<GetTopicResponse> {
    val topic = getTopicCommand.execute(topicId)
    log.info("Topic found: $topic")
    return ResponseEntity.ok().body(GetTopicResponse(topic))
  }

}
