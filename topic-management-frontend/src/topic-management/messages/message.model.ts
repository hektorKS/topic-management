export interface Message {
  id: string;
  instant: Date;
  senderId: string;
  recipientId: string;
  message: string;
}
