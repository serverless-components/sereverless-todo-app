import { useState, memo } from "react";
import { message, Input, List, Checkbox, Button } from "antd";
import { delTodoApi, updateTodoApi } from "../../apis";
import "./index.css";

const { Item } = List;
const { success } = message;

const Todo = ({ todo, getTodos }) => {
    const { id, message, completed } = todo;
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
                    <div>{todoMessage}</div>
                )}
            </div>
            {editable ? (
                <>
                    <Button
                        type="text"
                        onClick={() => {
                            setTodoMessage(message);
                            setEditable(false);
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        type="text"
                        onClick={async () => {
                            await updateTodo(id, { message: todoMessage });
                            setEditable(false);
                        }}
                    >
                        更新
                    </Button>
                </>
            ) : (
                <Button type="text" onClick={() => setEditable(true)}>
                    编辑
                </Button>
            )}
            <Button
                className="todoDel"
                onClick={() => delTodo(id)}
                danger
                type="text"
            >
                删除
            </Button>
        </Item>
    );
};

export default memo(Todo);
