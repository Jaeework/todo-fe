import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
    </Routes>
  );
}

export default App;
