import SignUpForm from './SignUpFrom';

const SignUpPage: React.FC = () => {
  return (
    <div className="container max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
