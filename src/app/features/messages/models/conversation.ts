export interface Conversation {
  _id: string;

  customer?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };

  store?: {
    _id: string;
    storeName: string;
    logo?: string;
  };

  lastMessage: string;
  lastMessageAt: string;

  unreadCount?: number;
}
