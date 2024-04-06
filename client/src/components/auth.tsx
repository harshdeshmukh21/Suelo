// import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./login";
const Auth = () => {
  return (
    <>
      <div
        id="body"
        className="flex flex-row justify-end items-end h-screen w-screen bg-[url('https://api.deepai.org/job-view-file/8ac58adb-11f4-4a80-8f55-6cbe4a546604/outputs/output.jpg')] bg-custom-bg bg-cover bg-center"
      >
        <div className="text-2xl text-white font-montserrat mb-auto mr-auto p-4">
          SUELO
        </div>

        <div className="h-full w-1/2 bg-white">
          <div className="relative flex flex-col items-center justify-center h-full">
            <div className="text-3xl text-black font-montserrat mt-4 ml-4 ">
              Get Started
            </div>
            <input
              type="text"
              placeholder="Username"
              className="font-montserrat rounded bg-white text-black p-4 outline-none mt-4 mr-12"
            />
            <input
              type="email"
              placeholder="Email id"
              className="font-montserrat rounded bg-white text-black p-4 outline-none mr-12"
            />
            <input
              type="password"
              placeholder="Password"
              className="font-montserrat rounded bg-white text-black p-4 outline-none mr-12"
            />

            <button className="font-montserrat bg-white text-black p-5 rounded mt-4 text-center h-[20px] flex flex-col justify-center">
              Sign Up
            </button>

            <div className="flex flex-row gap-2">
              <div className="text-black mt-4 font-montserrat opacity-60 text-xs">
                Already have an account?
              </div>
              <LoginButton></LoginButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
