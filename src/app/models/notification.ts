
export interface Notification {
  id: number;
  message: string;
  type: 'Approval' | 'Rejection';
  isRead: boolean;
  createdAt: string;
}

