import TodoItem from "./TodoItem"
import styles from "./TodoBoard.module.css";

const TodoBoard = ({todoList, deleteTask, toggleComplete}) => {
  return (
    <div className={styles.todoBoardContainer}>
      <h2 className={styles.boardTitle}>Todo List</h2>
      <div className={styles.todoBoard}>
        {todoList.length > 0 
          ? todoList.map((item, idx) => 
            <TodoItem 
              key={`todo-${idx}`} 
              item={{...item, idx: idx}}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
              />)
          : <h2 className={styles.emptyMessage}>There is no Item to show</h2>
        }
      </div>
    </div>
  );
};

export default TodoBoard;
