import {User, UsernameUser} from "../../user/user.model";

export interface Topic {
  id: string
  bucketId: string,
  title: string,
  description: string,
  supervisor: User,
  studentsIds: UsernameUser[]
}
