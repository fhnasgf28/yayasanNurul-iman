import GoogleLoginButton from './GoogleLogin';

const SigninForm = () => {
  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-4 md:p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-4 md:p-8">
              <h1 className="text-2xl md:text-5xl font-bold text-indigo-600">
                Masuk Dengan Google
              </h1>
             <GoogleLoginButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
