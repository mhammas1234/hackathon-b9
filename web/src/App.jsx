import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import Home from "./pages/home/home";
import About from "./pages/about/about";
import Chat from "./pages/chat/chat";
import Login from "./pages/login/login";
// import Signup from "./pages/signup/signup";
import ProfilePage from "./pages/profile/profile";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "./context/context";
import splashScreen from "./assets/splash.gif";
import { baseUrl } from "./core";
import AdminHome from "./pages/admin home/admin home";
import AddStudent from "./pages/signup/signup";

// const baseUrl = "http://localhost:5001";

const App = () => {
  const { state, dispatch } = useContext(GlobalContext);
  // const [isLogin , setIsLogin] = useState(false)

  useEffect(() => {
    // Add a request interceptor
    axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        config.withCredentials = true;
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/mongoDB/profile`, {
          withCredentials: true,
        });
        dispatch({
          type: "USER_LOGIN",
          payload: response.data.data,
        });
        // setIsLogin(true)
      } catch (error) {
        console.log(error);
        dispatch({
          type: "USER_LOGOUT",
        });
        // setIsLogin(false)
      }
    };
    checkLoginStatus();
  }, []);

  const logoutHandler = async () => {
    try {
      await axios.post(
        `${baseUrl}/api/v1/mongoDB/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: "USER_LOGOUT",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* admin routes */}
      {state.isLogin === true && state.role === "admin" ? (
        <>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Admin Home</Link>
              </li>
              {/* <li>
                <Link to={"/chat"}>Admin Chat</Link>
              </li>
              <li>
                <Link to={"/about"}>Admin About</Link>
              </li> */}
              <li>
                <Link to={"/signup"}>Add Student </Link>
              </li>
              {state.user.email}
              <button onClick={logoutHandler}>Logout</button>
              {/* <li><Link to={'/login'}>Login</Link></li>
                <li><Link to={'/signup'}>Sign Up</Link></li> */}
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<AdminHome />} />
            {/* <Route path="about" element={<About />} />
            <Route path="chat" element={<Chat />} /> */}
            <Route path="signup" element={<AddStudent />} />
            {/* <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} /> */}
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </>
      ) : null}

      {/* user routes */}
      {state.isLogin === true && state.role === "user" ? (
        <>
          <nav>
            <ul>
              {/* <li>
                <Link to={"/"}>Home</Link>
              </li> */}
              <li>
                <Link to={`/profile/${state.user._id}`}>Profile</Link>
              </li>
              {/* <li>
                <Link to={"/chat"}>Chat</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li> */}
              {state.user.email}
              <button onClick={logoutHandler}>Logout</button>
              {/* <li><Link to={'/login'}>Login</Link></li>
                <li><Link to={'/signup'}>Sign Up</Link></li> */}
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<ProfilePage />} />
            <Route path="about" element={<About />} />
            <Route path="chat" element={<Chat />} />
            {/* <Route path="profile" element={<ProfilePage />} /> */}
            {/* <Route path="profile/:userId" element={<ProfilePage />} /> */}
            {/* <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} /> */}
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </>
      ) : null}

      {/* unAuth routes */}
      {state.isLogin === false ? (
        <>
          <nav>
            <ul>
              {/* <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/chat'}>Chat</Link></li>
            <li><Link to={'/about'}>About</Link></li> */}
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/signup"}>Sign Up</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            {/* <Route path='/' element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='chat' element={<Chat />} /> */}
            <Route path="login" element={<Login />} />
            {/* <Route path="signup" element={<Signup />} /> */}
            <Route path="*" element={<Navigate to="/login" replace={true} />} />
            <Route path="profile/:userId" element={<ProfilePage />} />
          </Routes>
        </>
      ) : null}

      {/* splash screen */}
      {state.isLogin === null ? (
        <div>
          <img
            src={splashScreen}
            width="100%"
            height="100%"
            alt=""
            style={{
              position: "absolute",
              margin: "auto",
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default App;
