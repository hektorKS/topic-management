package com.hektorks.user.repository.user

import com.hektorks.exceptionhandling.RepositoryException
import com.hektorks.user.model.UsernameUserView
import org.slf4j.LoggerFactory
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.aggregation.Aggregation
import org.springframework.data.mongodb.core.aggregation.Aggregation.match
import org.springframework.data.mongodb.core.aggregation.Aggregation.project
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.stereotype.Service

@Service
class CustomUserMongoRepository(private val mongoTemplate: MongoTemplate) : CustomUserRepository {
  private val log = LoggerFactory.getLogger(javaClass)

  companion object {
    const val USERS_COLLECTION_NAME = "users"
    const val USERNAME = "username"
  }

  override fun search(username: String): List<UsernameUserView> {
    try {
      val aggregation = Aggregation.newAggregation(
        match(Criteria.where(USERNAME).regex(username, "is")),
        project(UsernameUserView::class.java)
      )
      return mongoTemplate.aggregate(aggregation, USERS_COLLECTION_NAME, UsernameUserView::class.java).mappedResults
    } catch (exception: Exception) {
      log.error("Searching users by username=$username in mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }
}
