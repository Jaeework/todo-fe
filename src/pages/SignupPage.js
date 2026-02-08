import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const SignupPage = () => {
  const navigate = useNavigate();

  const fields = [
    { name: "name", label: "Name", type: "text", placeholder: "Name", controlId: "formName" },
    { name: "email", label: "Email address", type: "email", placeholder: "Enter email", controlId: "formBasicEmail" },
    { name: "password", label: "Password", type: "password", placeholder: "Password", controlId: "formBasicPassword" },
    { name: "secPassword", label: "re-enter the password", type: "password", placeholder: "re-enter the password", controlId: "formBasicPassword" }
  ];

  const handleSubmit = async (formData) => {
    const { name, email, password, secPassword } = formData;

    if (!name || !email || !password || !secPassword) {
      throw new Error("Please fill in all fields");
    }
    if (password !== secPassword) {
      throw new Error("Passwords do not match");
    }
    const response = await api.post("/user", { name, email, password });
    if (response.status === 200) {
      navigate("/signin");
    } else {
      throw new Error(response.message);
    }
  };

  return (
    <AuthForm
      title="Sign up"
      fields={fields}
      onSubmit={handleSubmit}
      buttonText="Submit"
      linkText="Already have an account?"
      linkTo="/signin"
    />
  );
};

export default SignupPage;
