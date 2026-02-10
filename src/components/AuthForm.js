import { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./AuthForm.module.css";
import Loader from './Loader';

const AuthForm = ({
  fields,
  onSubmit,
  title,
  buttonText,
  linkText,
  linkTo,
}) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setError("");
      await onSubmit(formData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.displayCenter}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <Form className={styles.formBox} onSubmit={handleSubmit}>
        <h1>{title}</h1>
        {fields.map((field) => (
          <Form.Group
            className="mb-3"
            key={field.name}
            controlId={field.controlId}
          >
            <Form.Label>{field.label}</Form.Label>
            <Form.Control
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              onChange={handleChange}
              disabled={isLoading}
            />
          </Form.Group>
        ))}
        <div className={styles.buttonBox}>
          <button type="submit" className={styles.buttonPrimary} disabled={isLoading}>
            {isLoading ? <Loader size="small" /> : buttonText}
          </button>
        </div>

        <div className={styles.linkBox}>
          <span>
            {linkText}{" "}
            <Link to={linkTo}>
              {linkTo === "/signin" ? "Sign in" : "Create an account"}
            </Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;
