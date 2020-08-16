import {NameUser} from "../../users/user.model";

export interface ConversationIdentifier {
  firstUserId: string;
  secondUserId: string;
}

export interface Conversation {
  firstUser: NameUser;
  secondUser: NameUser;
  lastMessage: string;
  lastMessageInstant: number;
}
