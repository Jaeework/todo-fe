import { Col, Row } from "react-bootstrap";

const TodoItem = ({item, deleteTask, toggleComplete}) => {
  return (
    <Row>
      <Col xs={12}>
        <div className="todo-item">
          <div className="todo-content">
            <input
              className="item-checkbox"
              type="checkbox" 
              onChange={() => toggleComplete(item)}
              checked={item.isComplete}
              />
            <div className="todo-item-index">{String(item.idx + 1).padStart(2, "0")}</div>
            <div className={`todo-text ${item.isComplete ? "item-complete" : ""}`}>{item.task}</div>
          </div>
          <div>
            <button className="button-delete" onClick={() => deleteTask(item._id)}>Delete</button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
