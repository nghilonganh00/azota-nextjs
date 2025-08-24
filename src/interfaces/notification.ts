export interface INotification {
  _id: string;
  userId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  title: string;
  type: string;
  message: string;
  readAt: string;
  createdAt: string;
  extraData: Record<string, unknown>;
}
