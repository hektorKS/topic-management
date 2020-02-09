package com.hektorks.topic.test

import com.hektorks.exceptionhandling.ControllerException
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import kotlin.random.Random

@ResponseBody
@RestController
@RequestMapping("/v1")
class TestController {

  @GetMapping("/hello")
  fun helloWorld(): ResponseEntity<String> {
    if(Random.nextInt() == 35) {
      throw ControllerException("", RuntimeException())
    }
    return ResponseEntity.ok().body("Hello world")
  }

}
