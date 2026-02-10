import { Spinner } from "react-bootstrap";
import styles from "./Loader.module.css";

const Loader = ({ size = "default" }) => {
  return (
    <div className={`${styles.loaderContainer} ${styles[size]}`}>
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" />
    </div>
  );
};

export default Loader;
