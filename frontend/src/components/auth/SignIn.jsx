import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLoggedIn } from "../../store/atoms/nav";

const SignIn = () => {
  const baseUrl = "http://localhost:3000";
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedIn);

  const usernameRef = useRef("");
  const passwordRef = useRef("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const logIntoUserAccount = async () => {
    try {
      console.log("request called");
      const loginToken = await axios.post(
        `${baseUrl}/creator/signin`,
        {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("accessToken", loginToken.data.accessToken);
      if (loginToken.data.accessToken) {
        setIsLoggedIn(true);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logIntoAdminAccount = async () => {
    try {
      console.log("request called");
      const loginToken = await axios.post(
        `${baseUrl}/creator/signin`,
        {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("accessToken", loginToken.data.accessToken);
      if (loginToken.data.accessToken) {
        setIsLoggedIn(true);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={(event) => event.preventDefault()}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  ref={usernameRef}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  //value={username}
                  // onChange={(event) => setUsername(event.target.value)}
                  required
                  className="block w-full rounded-md border border-gray-400 py-1.5 px-2 text-gray-900 shadow-sm "
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border border-gray-400 py-1.5 px-2 text-gray-900 shadow-sm "
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={logIntoUserAccount}
              >
                Sign in as User
              </button>
            </div>
            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={logIntoAdminAccount}
              >
                Sign in as Admin
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              className="cursor-pointer  font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              onClick={() => navigate("/signup")}
            >
              Signup
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
