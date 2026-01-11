import { AuthContext } from "./AuthContext.jsx";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import api from "../src/lib/axiosCustomize.js";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [authUser, setAuthUser] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [socket, setSocket] = useState(null);

  // ✅ check auth
  const checkAuth = async () => {
    try {
      const { data } = await api.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ login
  const Login = async (state, credential) => {
    try {
      const { data } = await api.post(`/api/auth/${state}`, credential);

      if (data.success) {
        setAuthUser(data.userData);
        setToken(data.token);
        localStorage.setItem("token", data.token);

        connectSocket(data.userData);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ logout
  const Logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setAuthUser(null);
    setOnlineUser([]);

    if (socket) {
      socket.disconnect();
      setSocket(null);
    }

    toast.success("Logout successful");
  };

  // ✅ update profile
  const updateProfile = async (body) => {
    try {
      const { data } = await api.put("/api/auth/update-profile", body);
      if (data.success) {
        setAuthUser((prev) => ({
          ...prev,
          ...data.updatedUser,
        }));

        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ socket connect
  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;

    const newSocket = io(backendUrl, {
      query: {
        userId: userData._id,
      },
    });

    setSocket(newSocket);

    newSocket.on("GetonlineUsers", (userIds) => {
      setOnlineUser(userIds);
    });
  };

  useEffect(() => {
    if (!token) return;

    const runCheckAuth = async () => {
      await checkAuth();
    };

    runCheckAuth();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        onlineUser,
        socket,
        Login,
        Logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
