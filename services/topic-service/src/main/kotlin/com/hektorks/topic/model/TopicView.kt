package com.hektorks.topic.model

import java.util.UUID

data class TopicView(
    val id: UUID,
    val title: String,
    val description: String,
    val bucket: Bucket
//    val supervisor: DetailedUser,
//    val students: List<User>
)
