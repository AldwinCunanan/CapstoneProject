export type Notification = {
  id: string;
  adopterId: string;   // who receives the notification
  animalId: string;    // what triggered it (new animal)
  message: string;
  isRead: boolean;     // read/unread status
  createdAt: Date;
};