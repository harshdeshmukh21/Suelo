import React, { useState } from "react";
import LoginButton from "../components/login";
import logo from "../assets/logo.svg";
import { collection, addDoc } from "firebase/firestore";
import db from "../Firebase"; // Import the initialized Firebase instance

const Auth: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const saveDataToFirebase = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        username: username,
        emailid: email,
        password: password,
      });
      alert("Signup Successful");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <div
        id="body"
        className="flex flex-row justify-end items-end h-screen w-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/503039699/photo/grass-and-soil.jpg?s=1024x1024&w=is&k=20&c=SgfemP4LLToK7jQWC502H2F110I122u8Z1Fxsr1s1wI=')",
        }}
      >
        <div className="text-7xl font-bold font-montserrat mb-auto mr-auto p-4 text-[#1F2114] ml-[270px] mt-[100px]">
          SUELO
        </div>
        <div className="h-full w-2/5 bg-white ">
          <div className="relative flex flex-col items-center justify-center h-full ">
            <img src={logo} alt="Logo" className="h-32 w-32 mr-2 mb-5" />
            <div className="flex flex-col justify-center items-center h-[425px] w-[450px] bg-black rounded-[20px] ">
              <div>
                <div className="font-bold text-3xl text-white font-montserrat mt-4 ml-4 mb-10 ">
                  Get Started
                </div>
              </div>
              <input
                type="text"
                placeholder="Username"
                className="font-montserrat rounded bg-white text-black p-4 outline-none mt-4 mb-1 h-[50px] w-[300px]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email id"
                className="font-montserrat rounded bg-white text-black p-4 outline-none mb-1 h-[50px] w-[300px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="font-montserrat rounded bg-white text-black p-4 outline-none mb-1 h-[50px] w-[300px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="font-montserrat bg-[#1F2114] text-white p-5 rounded mt-6 text-center h-[20px] flex flex-col justify-center"
                onClick={saveDataToFirebase}
              >
                Sign Up
              </button>
            </div>
            <div className="flex flex-row gap-2">
              <div className="text-black mt-4 font-montserrat opacity-60 text-xs">
                Already have an account?
              </div>
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
