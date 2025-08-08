import LoginContent from '../components/login.content';
import LoginForm from '../components/login.form';

export default function LoginContainer() {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      <div className="hidden lg:block">
        <LoginContent />
      </div>
      <div className="flex items-center justify-center p-6 bg-gradient-to-r from-inherit to-purple-500">
        <LoginForm />
      </div>
    </div>
  );
}
