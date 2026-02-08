import { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./AuthForm.module.css";

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.displayCenter}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <Form className={styles.formBox} onSubmit={handleSubmit}>
        <h1>{title}</h1>
        {fields.map((field) => (
          <Form.Group className="mb-3" controlId={field.controlId}>
            <Form.Label>{field.label}</Form.Label>
            <Form.Control
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              onChange={handleChange}
            />
          </Form.Group>
        ))}
        <div className={styles.buttonBox}>
          <button type="submit" className={styles.buttonPrimary}>
            {buttonText}
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
