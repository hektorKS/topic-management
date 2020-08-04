package com.hektorks.topic.model

import java.util.UUID

data class TopicView(
    val id: UUID,
    val bucketId: UUID,
    val title: String,
    val description: String,
    val supervisor: User,
    val students: MutableList<UsernameUser> = mutableListOf()
)
