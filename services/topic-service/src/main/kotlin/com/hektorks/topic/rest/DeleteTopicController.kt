package com.hektorks.topic.rest

import com.hektorks.topic.businesslogic.command.DeleteTopicCommand
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import java.util.UUID



@RestController
@RequestMapping("/api/v1")
class DeleteTopicController(private val deleteTopicCommand: DeleteTopicCommand) {
  private val log = LoggerFactory.getLogger(javaClass)

  @DeleteMapping("/topics/{id}")
  fun deleteTopicById(@PathVariable("id") topicId: UUID): ResponseEntity<GetTopicResponse> {
    val topic = deleteTopicCommand.execute(topicId)
    log.info("Topic deleted: $topic")
    return ResponseEntity.noContent().build()
  }

}
