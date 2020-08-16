import {User, UsernameUser} from "../../users/user.model";

export interface Topic {
  id: string
  bucketId: string,
  title: string,
  description: string,
  supervisor: User,
  students: UsernameUser[]
}
