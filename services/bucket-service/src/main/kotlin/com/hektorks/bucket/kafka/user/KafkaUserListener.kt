package com.hektorks.bucket.kafka.user

import com.hektorks.kafka.listen.HandlerDispatcher
import com.hektorks.kafka.listen.KafkaBaseListener
import com.hektorks.kafka.message.KafkaMessage
import com.hektorks.kafka.messagetype.UserMessageType
import org.apache.kafka.clients.consumer.ConsumerRecord
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Service


@Service
class KafkaUserListener(private val schoolHandlerDispatcher: UserHandlerDispatcher): KafkaBaseListener<UserMessageType>() {

  @KafkaListener(topics = ["users"], groupId = "school-services-cluster")
  override fun listen(consumerRecord: ConsumerRecord<String, KafkaMessage>) {
    super.listen(consumerRecord)
  }

  override fun getHandlerDispatcher(): HandlerDispatcher {
    return this.schoolHandlerDispatcher
  }

  override fun availableMessageTypes(): Set<UserMessageType> {
    return UserMessageType.values().toSet()
  }

}
