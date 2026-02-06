import TodoItem from "./TodoItem"

const TodoBoard = ({todoList, deleteTask, toggleComplete}) => {
  return (
    <div className="todo-board-container">
      <div className="todo-board">
        <h2 className="board-title">Todo List</h2>
        {todoList.length > 0 
          ? todoList.map((item, idx) => 
            <TodoItem 
              key={`todo-${idx}`} 
              item={{...item, idx: idx}}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
              />)
          : <h2 className="empty-message">There is no Item to show</h2>
        }
      </div>
    </div>
  );
};

export default TodoBoard;
