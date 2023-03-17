import { AuthForm } from '@/../../packages/ui';

export default function AboutPage() {
  const handleSubmit = (data: any) => {
  };
  return (
    <div>
      <h1>About Page</h1>
      <AuthForm type="register" onSubmit={handleSubmit} />
    </div>
  );
}
