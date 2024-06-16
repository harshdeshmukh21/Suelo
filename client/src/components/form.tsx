import LoginButton from "../components/button"

const Form = () => {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center h-[425px] w-[450px] bg-black rounded-[20px]">
          <div>
            <div className="font-bold text-3xl text-white font-montserrat mt-4 ml-4 mb-10">
              Get Started
            </div>
          </div>
          <input
            type="text"
            placeholder="Username"
            className="font-montserrat rounded bg-white text-black p-4 outline-none mt-4 mb-1 h-[50px] w-[300px]"
          />
          <input
            type="email"
            placeholder="Email id"
            className="font-montserrat rounded bg-white text-black p-4 outline-none mb-1 h-[50px] w-[300px]"
          />
          <input
            type="password"
            placeholder="Password"
            className="font-montserrat rounded bg-white text-black p-4 outline-none mb-1 h-[50px] w-[300px]"
          />
          <button className="font-montserrat bg-[#1F2114] text-white p-5 rounded mt-6 text-center h-[20px] flex flex-col justify-center">
            Sign Up
          </button>
        </div>
        <div className="flex flex-row gap-2">
          <div className="text-black mt-4 font-montserrat opacity-60 text-xs">
            Already have an account?
          </div>
          <LoginButton></LoginButton>
        </div>
      </div>
    </>
  );
};

export default Form;
