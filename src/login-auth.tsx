import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./components/Context";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./components/firebaseConfig";

export default function LoginAuth() {
  const navigate = useNavigate();
  const { theme, setUserId } = useGlobalContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signUp, setSignUp] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");

  const handleSignUp = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setHelperText("Congrats!, you can now Sign In");
        setTimeout(() => setHelperText(""), 2000);
        setSignUp(!signUp);
        setEmail(""); // Clear the email field
        setPassword(""); // Clear the password field
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleSignIn = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserId(user.uid);
        sessionStorage.setItem("uid", JSON.stringify(user.uid));
        sessionStorage.setItem("auth", JSON.stringify(auth));
        navigate("/my-todo");
        setEmail(""); // Clear the email field
        setPassword(""); // Clear the password field
      })
      .catch((error) => {
        const errorCode = error.code;
        errorCode === "auth/user-not-found!"
          ? setHelperText("Email is not registered!")
          : setHelperText("Invalid password");
        setTimeout(() => setHelperText(""), 2000);
      });
  };

  const handleToggle = () => {
    setSignUp((prev) => !prev);
    setEmail(""); // Clear the email field
    setPassword(""); // Clear the password field
  };

  return (
    <div className={`theme-${theme}`}>
      <div className="list-body relative h-screen flex justify-center items-center">
        <div className="relative auth-card list-text rounded-md shadow-2xl p-8">
          <p
            className={`${
              helperText === "Congrats!, you can now Sign In"
                ? "success-msg"
                : "error-msg"
            } w-full 
        absolute top-1 left-0 text-center`}
          >
            {helperText}
          </p>
          <p className="text-center text-3xl list-text">Welcome</p>
          <form className="mt-4">
            <div className="w-72">
              <label htmlFor="eMailField" className="font-bold">
                eMail
              </label>

              <input
                type="text"
                id="eMailField"
                value={email}
                className="mt-1 rounded-lg h-8 w-full list"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="saimkhan@gmail.com"
              />
            </div>
            <div className="mt-4 w-72">
              <label htmlFor="passwordField" className="font-bold">
                Password
              </label>

              <input
                type="password"
                id="passwordField"
                value={password}
                className="mt-1 outline-none rounded-lg w-full h-8 list"
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              onClick={!signUp ? handleSignIn : handleSignUp}
              className="border py-1 rounded-lg mt-4 w-full font-bold"
            >
              {!signUp ? "Sign In" : "Sign Up"}
            </button>
            <p className="mt-4">
              {!signUp ? "Don't have an account?" : "Already have an account?"}
              <span onClick={handleToggle} className="font-bold cursor-pointer">
                {signUp ? " Sign In" : " Sign Up"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
