import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import PrivateRoute from "./route/PrivateRoute";
import { useEffect, useState } from "react";
import api from './utils/api';

function App() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        const response = await api.get("/user/me");
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoPage />
          </PrivateRoute>
        }
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage user={user} setUser={setUser} />} />
    </Routes>
  );
}

export default App;
