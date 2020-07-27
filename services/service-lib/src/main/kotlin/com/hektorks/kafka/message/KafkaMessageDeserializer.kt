package com.hektorks.kafka.message

import org.springframework.kafka.support.serializer.JsonDeserializer


class KafkaMessageDeserializer<T>: JsonDeserializer<T>() {

  init {
    addTrustedPackages(KafkaMessage::class.java.packageName)
  }

}
