import { SignIn as SignInComponent } from "@clerk/react";

const SignIn = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignInComponent signUpUrl="/signup" />
    </div>
  );
};

export default SignIn;
