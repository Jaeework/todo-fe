import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import AuthForm from "../components/AuthForm";

const SigninPage = () => {
  const navigate = useNavigate();
  const fields = [
    { name: "email", label: "Email address", type: "email", placeholder: "Enter email", controlId: "formBasicEmail" },
    { name: "password", label: "Password", type: "password", placeholder: "Enter password", controlId: "formBasicPassword" }
  ];

  const handleSignin = async (formData) => {
    const { email, password } = formData;

    if (!email || !password) {
      throw new Error("Please enter both email and password");
    }

    const response = await api.post("/user/signin", { email, password });

    if (response.status === 200) {
      sessionStorage.setItem("token", response.data.token);
      api.defaults.headers["authorization"] = "Bearer " + response.data.token;
      navigate("/");
    } else {
      throw new Error(response.message);
    }
  };

  return (
    <AuthForm
      title="Sign in"
      fields={fields}
      onSubmit={handleSignin}
      buttonText="Sign in"
      linkText="Don't have an account?"
      linkTo="/signup"
    />
  );
};

export default SigninPage;
