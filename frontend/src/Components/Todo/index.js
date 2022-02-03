import { useState, memo } from "react";
import { message, Input, List, Checkbox, Button } from "antd";
import {
    CloseOutlined,
    EditOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import DatePicker from "./DatePicker";
import { delTodoApi, updateTodoApi } from "../../apis";
import dayjs from "dayjs";
import "./index.css";

const { Item } = List;
const { success } = message;

const Todo = ({ todo, getTodos }) => {
    const { id, message, completed, dueDate = null } = todo;
    const [todoMessage, setTodoMessage] = useState(message);
    const [editable, setEditable] = useState(false);
    const updateTodo = async (id, payload) => {
        await updateTodoApi(id, payload);
        await getTodos();
        success("更新成功");
    };

    const delTodo = async (id) => {
        await delTodoApi(id);
        await getTodos();
        success("删除成功");
    };

    return (
        <Item className="todoItem">
            <Checkbox
                className="todoCheckbox"
                checked={completed}
                onChange={() => updateTodo(id, { completed: !completed })}
            />
            <div className="todoContent">
                {editable ? (
                    <Input
                        value={todoMessage}
                        onChange={(e) => setTodoMessage(e.target.value)}
                    />
                ) : (
                    <>
                        {completed ? (
                            <del>{todoMessage}</del>
                        ) : (
                            <div>{todoMessage}</div>
                        )}
                    </>
                )}
            </div>
            <div className="todoDueDate">
                <DatePicker
                    defaultValue={dueDate ? dayjs(dueDate) : dueDate}
                    placeholder="请选择截止日期"
                    size="small"
                    onChange={(_, dueDate) => updateTodo(id, { dueDate })}
                />
                {!completed &&
                dueDate &&
                dayjs(dueDate).isBefore(dayjs(Date.now())) ? (
                    <ClockCircleOutlined
                        style={{ color: "red", marginLeft: 4 }}
                    />
                ) : (
                    ""
                )}
            </div>
            {editable ? (
                <>
                    <Button
                        onClick={() => {
                            setTodoMessage(message);
                            setEditable(false);
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        type="primary"
                        onClick={async () => {
                            await updateTodo(id, { message: todoMessage });
                            setEditable(false);
                        }}
                    >
                        更新
                    </Button>
                </>
            ) : (
                <Button
                    type="primary"
                    onClick={() => setEditable(true)}
                    size="small"
                    icon={<EditOutlined />}
                />
            )}
            <Button
                className="todoDel"
                shape="circle"
                size="small"
                icon={<CloseOutlined />}
                onClick={() => delTodo(id)}
                danger
            />
        </Item>
    );
};

export default memo(Todo);
