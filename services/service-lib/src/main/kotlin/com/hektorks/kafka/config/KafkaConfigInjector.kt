package com.hektorks.kafka.config

import com.hektorks.kafka.message.KafkaMessage
import com.hektorks.kafka.message.KafkaMessageDeserializer
import org.apache.kafka.clients.admin.AdminClient
import org.apache.kafka.clients.admin.AdminClientConfig
import org.apache.kafka.clients.admin.NewTopic
import org.apache.kafka.clients.consumer.ConsumerConfig
import org.apache.kafka.clients.producer.ProducerConfig
import org.apache.kafka.common.serialization.StringDeserializer
import org.apache.kafka.common.serialization.StringSerializer
import org.slf4j.LoggerFactory
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory
import org.springframework.kafka.core.ConsumerFactory
import org.springframework.kafka.core.DefaultKafkaConsumerFactory
import org.springframework.kafka.core.DefaultKafkaProducerFactory
import org.springframework.kafka.core.KafkaAdmin
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.kafka.core.ProducerFactory
import org.springframework.kafka.support.serializer.JsonSerializer


@Configuration
@EnableConfigurationProperties(KafkaConfig::class)
class KafkaConfigInjector {
  private val log = LoggerFactory.getLogger(javaClass)

  @Bean
  fun kafkaAdmin(kafkaConfig: KafkaConfig): KafkaAdmin {
    return KafkaAdmin(mapOf(
        AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG to kafkaConfig.bootstrapAddress
    ))
  }

  @Bean
  fun adminClient(kafkaAdmin: KafkaAdmin): AdminClient {
    return AdminClient.create(kafkaAdmin.config)
  }

  @Bean
  fun createTopics(kafkaConfig: KafkaConfig, kafkaAdmin: KafkaAdmin): List<NewTopic> {
    AdminClient.create(kafkaAdmin.config).use { adminClient ->
      val currentTopicsSet = adminClient.listTopics().names().get()
      return kafkaConfig.topics.asSequence()
          .filterNot {
            return@filterNot currentTopicsSet.contains(it.name)
          }
          .map {
            NewTopic(it.name, it.partitionsNumber, it.replicationFactor)
          }
          .onEach {
            log.info("Defined not existing topic: $it")
          }
          .toList()
    }
  }

  @Bean
  fun producerFactory(kafkaConfig: KafkaConfig): ProducerFactory<String, KafkaMessage> {
    return DefaultKafkaProducerFactory(mapOf(
        ProducerConfig.BOOTSTRAP_SERVERS_CONFIG to kafkaConfig.bootstrapAddress,
        ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG to StringSerializer::class.java,
        ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG to JsonSerializer::class.java
    ))
  }

  @Bean
  fun consumerFactory(kafkaConfig: KafkaConfig): ConsumerFactory<String, KafkaMessage> {
    return DefaultKafkaConsumerFactory(mapOf(
        ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG to kafkaConfig.bootstrapAddress,
        ConsumerConfig.GROUP_ID_CONFIG to kafkaConfig.consumer.groupId,
        ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG to kafkaConfig.consumer.enableAutoCommit,
        ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG to kafkaConfig.consumer.autoCommitIntervalMs,
        ConsumerConfig.SESSION_TIMEOUT_MS_CONFIG to kafkaConfig.consumer.sessionTimeoutMs,
        ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG to StringDeserializer::class.java,
        ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG to KafkaMessageDeserializer::class.java
    ))
  }

  @Bean
  fun kafkaListenerContainerFactory(
      consumerFactory: ConsumerFactory<String, KafkaMessage>
  ): ConcurrentKafkaListenerContainerFactory<String, KafkaMessage> {
    val factory = ConcurrentKafkaListenerContainerFactory<String, KafkaMessage>()
    factory.consumerFactory = consumerFactory
    return factory
  }

  @Bean
  fun kafkaTemplate(producerFactory: ProducerFactory<String, KafkaMessage>): KafkaTemplate<String, KafkaMessage> {
    return KafkaTemplate(producerFactory)
  }

}
