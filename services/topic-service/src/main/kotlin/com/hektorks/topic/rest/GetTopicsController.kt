package com.hektorks.topic.rest

import com.hektorks.model.topic.Topic
import com.hektorks.topic.businesslogic.command.GetTopicsCommand
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

data class GetTopicsResponse(val topics: List<Topic>)

@ResponseBody
@RestController
@RequestMapping("/v1")
class GetTopicsController(private val getTopicsCommand: GetTopicsCommand) {
  private val log = LoggerFactory.getLogger(javaClass)

  @GetMapping("/topics")
  fun getTopics(): ResponseEntity<GetTopicsResponse> {
    val topics = getTopicsCommand.execute()
    log.debug("Topics found: $topics")
    return ResponseEntity.ok().body(GetTopicsResponse(topics))
  }

}
