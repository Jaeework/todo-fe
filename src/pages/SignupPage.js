import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ secPassword, setSecPassword ] = useState("");
  const [ error, setError ] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!name || !email || !password || !secPassword) {
        throw new Error("Please fill in all fields");
      }
      if (password !== secPassword) {
        throw new Error("Password do not match");
      }        
      const response = await api.post("/user", { name, email, password });
      if (response.status === 200) {
        setError("")
        navigate("/signin");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="display-center">
      { error && <div>{error}</div> }
      <Form className="login-box container" onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="string" placeholder="Name" onChange={(event) => setName(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control type="password" placeholder="re-enter the password" onChange={(event) => setSecPassword(event.target.value)} />
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default SignupPage;
