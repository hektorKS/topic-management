package com.hektorks.topic.actions.getall

import com.hektorks.model.topic.Topic
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

data class GetTopicsResponse(private val topics: List<Topic>)

@ResponseBody
@RestController
@RequestMapping("/v1")
class GetTopicsController {

	@GetMapping("/topics")
	fun getTopics(): ResponseEntity<GetTopicsResponse> {
		// TODO Finish endpoint
		return ResponseEntity.ok().body(GetTopicsResponse(emptyList()))
	}

}
