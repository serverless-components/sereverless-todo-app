import ioredis from "ioredis";
import { v4 as uuidv4 } from "uuid";

const client = new ioredis({
    port: Number(process.env.redis_port),
    host: process.env.redis_host,
    password: process.env.redis_password,
    family: 4,
    db: 0,
});

export const listTodos = async (sort = { index: "created", order: "desc" }) => {
    let todos = await client.get("todos");
    if (!todos) {
        return [];
    }
    const { order, index } = sort;
    const result = JSON.parse(todos).sort((a, b) => {
        if (order === "desc") {
            return a[index] - b[index];
        }
        return b[index] - a[index];
    });
    return result;
};

export const addTodo = async (message) => {
    const todos = await listTodos();
    const t = Date.now();
    todos.push({
        message,
        created: t,
        updated: t,
        completed: false,
        id: uuidv4(),
        dueDate: null,
    });
    await client.set("todos", JSON.stringify(todos));
};

export const updateTask = async (id, payload) => {
    const todos = await listTodos();
    const newTodos = todos.map((item) => {
        if (item.id === id) {
            return {
                ...item,
                ...payload,
                updated: Date.now(),
            };
        }
        return item;
    });

    await client.set("todos", JSON.stringify(newTodos));
};

export const deleteTodo = async (id) => {
    const todos = await listTodos();
    const newTodos = todos.filter((item) => item.id !== id);

    await client.set("todos", JSON.stringify(newTodos));
};
