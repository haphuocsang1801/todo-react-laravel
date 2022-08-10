import { DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox, Popconfirm, Row, Tag } from "antd";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInfoSelector } from "../../redux/selector";
import { deleteTodo, updateTodo } from "../TodoList/todoSlice";
const priorityColorMapping = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};

export default function Todo({ id, name, priority, completed }) {
  const [checked, setChecked] = useState(completed);
  const userInfo = useSelector(userInfoSelector);
  const dispatch = useDispatch();
  const toggleCheckbox = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({ id, name, priority, completed, author: userInfo.user.id })
    );
  };
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(deleteTodo(id));
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <Row
      justify="space-between"
      style={{
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
          marginRight: 10,
          ...(checked ? { opacity: 0.5, textDecoration: "line-through" } : {}),
        }}
      >
        <Checkbox checked={checked} onChange={toggleCheckbox}>
          {name}
        </Checkbox>
        <Tag color={priorityColorMapping[priority]} style={{ margin: 0 }}>
          {priority}
        </Tag>
      </div>
      <Popconfirm
        title="Are you sure"
        visible={visible}
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
      >
        <Button
          size="small"
          type="danger"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={showPopconfirm}
        />
      </Popconfirm>
    </Row>
  );
}
