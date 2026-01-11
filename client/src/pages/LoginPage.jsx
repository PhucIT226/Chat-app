import { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmited, setIsDataSubmited] = useState(false);

  const { Login } = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currState === "Sign Up" && !isDataSubmited) {
      setIsDataSubmited(true);
      return;
    }

    Login(currState === "Sign Up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* Left */}
      <img src={assets.logo_big} alt="" className="w-[min(30vw,250px)]" />
      {/* Right */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmited && (
            <img
              onClick={() => setIsDataSubmited(false)}
              src={assets.arrow_icon}
              alt=""
              className="w-5 cursor-pointer"
            />
          )}
        </h2>
        {currState === "Sign Up" && !isDataSubmited && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="p-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-white"
            placeholder="Fullname"
            required
          />
        )}
        {!isDataSubmited && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-white"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-white"
            />
          </>
        )}
        {currState === "Sign Up" && isDataSubmited && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            name=""
            id=""
            rows={4}
            className="p-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-white"
            placeholder="Provide a short bio..."
            required
          ></textarea>
        )}
        <button
          type="submit"
          className="py-3 bg-linear-to-r from-yellow-400 to-orange-300 text-white rounded-md cursor-pointer "
        >
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" />
          <p>Agree to the terms and conditions</p>
        </div>
        <div className="flex flex-col gap-2">
          {currState === "Sign Up" ? (
            <p className="text-sm text-gray-600">
              Already have an account ?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmited(false);
                }}
                className="font-medium text-orange-300 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Create an account{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="font-medium text-orange-300 cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
