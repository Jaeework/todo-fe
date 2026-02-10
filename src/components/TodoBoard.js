import TodoItem from "./TodoItem";
import styles from "./TodoBoard.module.css";
import Loader from "./Loader";

const TodoBoard = ({ todoList, deleteTask, toggleComplete, filter, setFilter, isLoading }) => {
  const tabList = [
    { label: "All", filter: "all" },
    { label: "On Going", filter: "ongoing" },
    { label: "Completed", filter: "completed" },
  ];

  return (
    <div className={styles.todoBoardContainer}>
      <h2 className={styles.boardTitle}>Todo List</h2>
      <div className={styles.tabContainer}>
        {tabList.map((tab) => (
          <div
            key={tab.filter} 
            onClick={() => setFilter(tab.filter)}
            className={`${styles.tabs} ${tab.filter === filter ? styles.active : ""}`}>{tab.label}</div>
        ))}
      </div>
      <div className={styles.borderLine}></div>
      <div className={styles.todoBoard}>
        {isLoading ? (
          <Loader />
        ) : todoList.length > 0 ? (
          todoList.map((item, idx) => (
            <TodoItem
              key={`todo-${item._id}`}
              item={{ ...item, idx: idx }}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
            />
          ))
        ) : (
          <h2 className={styles.emptyMessage}>There is no Item to show</h2>
        )}
      </div>
    </div>
  );
};

export default TodoBoard;
