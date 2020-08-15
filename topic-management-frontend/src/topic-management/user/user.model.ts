export interface SignedInUser {
  user: User;
  jwtToken: string
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface UsernameUser {
  id: string;
  username: string;
}
