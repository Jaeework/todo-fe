import { useEffect } from "react";
import styles from "./TodoPage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "../components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useTasks } from '../hooks.js/useTasks';

const TodoPage = ({ setUser }) => {
  const {
    todoList,
    todoValue,
    isLoading,
    setTodoValue,
    getTasks,
    addTask,
    deleteTask,
    toggleComplete,
  } = useTasks();

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

      <TodoBoard 
        todoList={todoList} 
        deleteTask={deleteTask} 
        toggleComplete={toggleComplete}
        isLoading={isLoading}
        />
    </Container>
  );
}

export default TodoPage;
