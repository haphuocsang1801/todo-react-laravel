import { Button, Col, Input, Row, Select, Tag } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todosRemainingSelector, userInfoSelector } from "../../redux/selector";
import Todo from "../Todo";
import { addNewTodo } from "./todoSlice";
export default function TodoList() {
  const [todoName, setTodoName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoSelector);
  const todoList = useSelector(todosRemainingSelector);

  const handleInputChange = (e) => {
    setTodoName(e.target.value);
  };
  const handlePriority = (value) => {
    setPriority(value);
  };
  const handleAddButtonClick = () => {
    dispatch(
      addNewTodo({
        author: userInfo.user.id,
        name: todoName,
        priority,
        completed: false,
      })
    );
    setTodoName("");
    setPriority("Medium");
  };
  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {todoList?.map((todoItem) => {
          return (
            <Todo
              key={todoItem.id}
              id={todoItem.id}
              name={todoItem.name}
              priority={todoItem.priority}
              completed={todoItem.completed}
            />
          );
        })}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input value={todoName} onChange={handleInputChange} />
          <Select
            defaultValue="Medium"
            value={priority}
            onChange={handlePriority}
          >
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button type="primary" onClick={handleAddButtonClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
