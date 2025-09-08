import LoginForm from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | Polling App',
  description: 'Sign in to your Polling App account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
