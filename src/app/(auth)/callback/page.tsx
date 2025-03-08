import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';

const AuthCallbackPage = async () => {
  const auth = await onAuthenticateUser();

  if ( auth && auth.status === 200 || auth && auth.status === 201) {
    redirect('/dashboard');
  } else if (auth && auth.status === 403 ||auth && auth.status === 400 ||auth && auth.status === 500) {
    redirect('/sign-in');
  }

 
};

export default AuthCallbackPage;
