package com.hektorks.bucket.kafka.school

import com.hektorks.kafka.listen.HandlerDispatcher
import com.hektorks.kafka.listen.KafkaBaseListener
import com.hektorks.kafka.message.KafkaMessage
import com.hektorks.kafka.messagetype.SchoolMessageType
import org.apache.kafka.clients.consumer.ConsumerRecord
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Service


@Service
class KafkaSchoolListener(private val schoolHandlerDispatcher: SchoolHandlerDispatcher): KafkaBaseListener<SchoolMessageType>() {

  @KafkaListener(topics = ["users"], groupId = "bucket-cluster")
  override fun listen(consumerRecord: ConsumerRecord<String, KafkaMessage>) {
    super.listen(consumerRecord)
  }

  override fun getHandlerDispatcher(): HandlerDispatcher {
    return this.schoolHandlerDispatcher
  }

  override fun availableMessageTypes(): Set<SchoolMessageType> {
    return SchoolMessageType.values().toSet()
  }

}
