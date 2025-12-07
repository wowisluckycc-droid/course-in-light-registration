export interface RegistrationData {
  name: string;
  transferLast5: string;
}

export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface CourseInfo {
  date: string;
  time: string;
  location: string;
  tuition: string;
  bankCode: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}