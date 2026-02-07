import { Col, Row } from "react-bootstrap";
import styles from "./TodoItem.module.css";

const TodoItem = ({item, deleteTask, toggleComplete}) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={styles.todoItem}>
          <div className={styles.todoContent}>
            <input
              className={styles.itemCheckbox}
              type="checkbox" 
              onChange={() => toggleComplete(item)}
              checked={item.isComplete}
              />
            <div className={styles.todoItemIndex}>{String(item.idx + 1).padStart(2, "0")}</div>
            <div className={`${styles.todoText} ${item.isComplete ? styles.itemComplete : ""}`}>{item.task}</div>
          </div>
          <div>
            <button className={styles.buttonDelete} onClick={() => deleteTask(item._id)}>Delete</button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
