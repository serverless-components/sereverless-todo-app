import { useState } from "react";
import { Input, Button, message } from "antd";

import "./index.css";
import { addTodoApi } from "../../apis";

const AddTodo = ({ getTodos }) => {
    const [todoMsg, setTodoMsg] = useState("");

    const addTodo = async (msg) => {
        if (!msg) {
            message.error("todo内容不可为空");
            return;
        }
        await addTodoApi(msg);
        await getTodos();
        setTodoMsg("");
    };

    return (
        <div className="addTodo">
            <Input.Group compact>
                <Input
                    style={{ width: "calc(100% - 70px)" }}
                    value={todoMsg}
                    onChange={(e) => setTodoMsg(e.target.value)}
                />
                <Button type="primary" onClick={() => addTodo(todoMsg)}>
                    新增
                </Button>
            </Input.Group>
        </div>
    );
};

export default AddTodo;
