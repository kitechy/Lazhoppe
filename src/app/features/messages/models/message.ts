export interface Message {
  _id: string;

  conversation: string;

  sender: {
    _id: string;
    firstName: string;
    lastName: string;
  };

  text: string;

  createdAt: string;

  isRead: boolean;
}
