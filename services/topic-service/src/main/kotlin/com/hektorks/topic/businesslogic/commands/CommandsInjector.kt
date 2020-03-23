package com.hektorks.topic.businesslogic.commands

import com.hektorks.topic.businesslogic.validation.TopicValidator
import com.hektorks.topic.kafka.topic.KafkaTopicService
import com.hektorks.topic.repository.topic.TopicRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class CommandsInjector {

  @Bean
  fun createTopicCommand(
      topicValidator: TopicValidator,
      topicRepository: TopicRepository,
      kafkaTopicService: KafkaTopicService
  ): CreateTopicCommand {
    return CreateTopicCommand(topicValidator, topicRepository, kafkaTopicService)
  }

  @Bean
  fun getTopicsCommand(topicRepository: TopicRepository): GetTopicsCommand {
    return GetTopicsCommand(topicRepository)
  }

  @Bean
  fun getTopicCommand(topicRepository: TopicRepository): GetTopicCommand {
    return GetTopicCommand(topicRepository);
  }

  @Bean
  fun deleteTopicCommand(topicRepository: TopicRepository, kafkaTopicService: KafkaTopicService): DeleteTopicCommand {
    return DeleteTopicCommand(topicRepository, kafkaTopicService);
  }

}
