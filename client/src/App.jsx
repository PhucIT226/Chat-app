import { Routes, Route, Navigate } from "react-router-dom";
import HomePages from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function App() {
  const { authUser } = useContext(AuthContext);

  return (
    <div className="bg-[url('/bgImage.jpg')] bg-no-repeat bg-cover bg-center">
      <Toaster position="top-left" reverseOrder={false} />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePages /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" replace />}
        />

        <Route
          path="/profile"
          element={
            authUser ? <ProfilePage /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
