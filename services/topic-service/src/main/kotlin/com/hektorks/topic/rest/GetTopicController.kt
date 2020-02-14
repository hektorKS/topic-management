package com.hektorks.topic.rest

import com.hektorks.model.topic.Topic
import com.hektorks.topic.businesslogic.commands.GetTopicCommand
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

data class GetTopicResponse(val topic: Topic)

@ResponseBody
@RestController
@RequestMapping("/v1")
class GetTopicController(private val getTopicCommand: GetTopicCommand) {
  private val log = LoggerFactory.getLogger(javaClass)

  @GetMapping("/topic/{id}")
  fun getTopics(@PathVariable("id") topicId: UUID): ResponseEntity<GetTopicResponse> {
    val topic = getTopicCommand.execute(topicId)
    log.debug("Topic found: $topic")
    return ResponseEntity.ok().body(GetTopicResponse(topic))
  }

}
