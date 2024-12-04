import LoginForm from './components/LoginForm';

export const runtime = 'edge';

export default function LoginPage() {
  return(
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='font-AlfaSlabOne text-5xl text-sub mb-4'>Teacher Only</h1>
      <LoginForm />
    </div>
  );
}