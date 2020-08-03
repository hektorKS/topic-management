package com.hektorks.kafka.listen

import com.hektorks.kafka.Version
import com.hektorks.kafka.message.KafkaMessage
import com.hektorks.kafka.messagetype.VersionedMessageType
import org.apache.kafka.clients.consumer.ConsumerRecord
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service


@Service
abstract class KafkaBaseListener<E> where E : Enum<E>, E : VersionedMessageType {
  private val log = LoggerFactory.getLogger(javaClass)

  open fun listen(consumerRecord: ConsumerRecord<String, KafkaMessage>) {
    log.info("> Handling bucket event with offset: ${consumerRecord.offset()}, partition: ${consumerRecord.partition()}")
    val value: KafkaMessage = consumerRecord.value()
    val messageType = availableMessageTypes().find { value.messageType == it.name }
    if (messageType != null) {
      this.dispatch(value, messageType)
      log.info("Successfully handled bucket event with offset ${consumerRecord.offset()}")
    } else {
      log.error("Invalid message type received. messageType: ${value.messageType}, version: ${value.version}")
      throw IllegalStateException("Invalid message type received . messageType: ${value.messageType}, version: ${value.version}")
    }
  }

  private fun dispatch(value: KafkaMessage, messageType: E) {
    if (!messageType.version().isCompatible(Version(value.version))) {
      log.error("Listener received invalid version of record: ${value.version}, required: ${messageType.version()}")
      throw IllegalStateException("Listener received invalid version of record: ${value.version}, required: ${messageType.version()}")
    }
    getHandlerDispatcher().dispatch(value.messageType, value.payload)
  }

  abstract fun getHandlerDispatcher(): HandlerDispatcher

  abstract fun availableMessageTypes(): Set<E>
}
