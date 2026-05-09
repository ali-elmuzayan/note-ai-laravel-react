import { SignUp as SignUpComponent } from "@clerk/react";

const SignUp = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignUpComponent signInUrl="/sign-in" />
    </div>
  );
};

export default SignUp;
