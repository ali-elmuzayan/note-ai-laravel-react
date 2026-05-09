import { SignIn as SignInComponent } from "@clerk/react";

const SignIn = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignInComponent signUpUrl="/sign-up" />
    </div>
  );
};

export default SignIn;
