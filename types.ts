
export enum UserRole {
  STUDENT = 'STUDENT',
  FACULTY = 'FACULTY',
  ADMIN = 'ADMIN'
}

export enum EventStatus {
  PENDING_FACULTY = 'PENDING_FACULTY',
  PENDING_ADMIN = 'PENDING_ADMIN',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
}

export interface EventProposal {
  id: string;
  name: string;
  date: string;
  venue: string;
  organizerId: string;
  department: string;
  budget: number;
  description: string;
  status: EventStatus;
  createdAt: string;
  facultyReviewerId?: string;
  adminReviewerId?: string;
  documents: { name: string; url: string }[];
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  timestamp: string;
}
