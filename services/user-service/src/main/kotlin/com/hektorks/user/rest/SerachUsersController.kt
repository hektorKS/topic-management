package com.hektorks.user.rest

import com.hektorks.user.model.UsernameUserView
import com.hektorks.user.repository.user.CustomUserRepository
import com.hektorks.user.repository.user.UserMongoRepository
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

data class SearchRequest(
  val value: String
)

data class SearchResponse(val usernameUsers: List<UsernameUserView>)

@RestController
@RequestMapping("/api/v1")
class SearchUsersController(private val userRepository: CustomUserRepository) {
  private val log = LoggerFactory.getLogger(javaClass)

  @PostMapping("/users/search")
  fun createTopic(@RequestBody searchRequest: SearchRequest): ResponseEntity<SearchResponse> {
    val usernameUsers = userRepository.search(searchRequest.value)
    log.info("Found usernameUsers=$usernameUsers")
    return ResponseEntity.ok().body(SearchResponse(usernameUsers))
  }

}
