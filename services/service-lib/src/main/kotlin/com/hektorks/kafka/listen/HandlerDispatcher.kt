package com.hektorks.kafka.listen

interface HandlerDispatcher {
  fun dispatch(messageType: String, payload: Map<String, Any>)
}
