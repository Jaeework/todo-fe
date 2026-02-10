import { useEffect, useState } from "react";
import styles from "./TodoPage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "../components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "../utils/api";

const TodoPage = ({ setUser }) => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const getTasks = async () => {
    const response = await api.get("/tasks");
    setTodoList(response.data.data);
  };
  const addTask = async () => {
    if (!todoValue) return;
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });

      if (response.status === 200) {
        setTodoValue("");
        getTasks();
      } else {
        throw new Error("task can not be added");
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  const deleteTask = async(id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);

      if(response.status === 200) {
        getTasks();
      } else {
        throw new Error("failed to delete the task");
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  const toggleComplete = async(item) => {
    try {
      const response = await api.put(`/tasks/${item._id}`, {
        isComplete: !item.isComplete
      });

      if(response.status === 200) {
        getTasks();
      } else {
        throw new Error("failed to update the task");
      }
    } catch (err) {
      console.log("error", err);
    }
  }
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  }
  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    setUser(null);
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <div className={styles.signOutButtonContainer}>
          <button 
            className={styles.signOutButton}
            onClick={handleSignOut}
          >sign out</button>
      </div>
      <Row className={styles.addItemRow}>
        <Col xs={9} sm={10}>
          <input
            type="text"
            placeholder="Add a new task"
            className={styles.inputBox}
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
            onKeyUp={handleKeyDown}
          />
        </Col>
        <Col xs={3} sm={2}>
          <button className={styles.buttonAdd} onClick={addTask}>
            ADD
          </button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} deleteTask={deleteTask} toggleComplete={toggleComplete} />
    </Container>
  );
}

export default TodoPage;
