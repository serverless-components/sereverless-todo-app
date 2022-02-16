import { useMemo, useEffect, useState } from "react";
import { List } from "antd";
import "./App.css";

import { getAllTodosApi } from "./apis";
import Filters from "./Components/Filters";
import Todo from "./Components/Todo";
import AddTodo from "./Components/AddTodo";

function App() {
  const [listLoading, setListLoading] = useState(false);
  const [filter, setFilter] = useState(0);
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    setListLoading(true);
    const res = await getAllTodosApi();
    setTodos(res);
    setListLoading(false);
  }

  useEffect(() => {
    getTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    if (filter === 0) {
      return todos;
    } else if (filter === 1) {
      return todos.filter((item) => item.completed);
    } else if (filter === 2) {
      return todos.filter((item) => !item.completed);
    }
  }, [filter, todos]);

  return (
    <div className="app">
      <h1>
        使用 Serverless + Tencent Cloud 构建的
        <a href="https://github.com/serverless-components/tencent-todo-app">
          待办事项
        </a>
      </h1>
      <Filters filter={filter} setFilter={setFilter} />
      <div className="todos">
        <List
          locale={{ emptyText: "当前没有Todo数据，请新建" }}
          loading={listLoading}
          dataSource={filteredTodos}
          renderItem={(todo) => (
            <Todo key={todo.id} todo={todo} getTodos={getTodos} />
          )}
        />
      </div>
      <AddTodo getTodos={getTodos} />
    </div>
  );
}

export default App;
