import Koa from "koa";
import KoaRouter from "koa-router";
import koaBody from "koa-body";

import {
  checkDBTable,
  deleteTodo,
  updateTask,
  listTodos,
  addTodo,
} from "./db.js";

await checkDBTable();
const app = new Koa();
const router = new KoaRouter();

app.use(koaBody());

// Routes
router.get(`/list`, async (ctx) => {
  const todos = await listTodos();
  ctx.response.type = "application/json";
  ctx.response.body = {
    data: todos,
  };
});

router.post("/add", async (ctx) => {
  const { message } = ctx.request.body;
  await addTodo(message);
  ctx.response.body = {
    result: 1,
  };
});

router.post("/update", async (ctx) => {
  const { payload, id } = ctx.request.body;
  await updateTask(id, payload);
  ctx.response.body = {
    result: 1,
  };
});

router.post("/delete", async (ctx) => {
  const { id } = ctx.request.body;
  await deleteTodo(id);
  ctx.response.body = {
    result: 1,
  };
});

app.use(router.allowedMethods()).use(router.routes());

app.listen(9000, () => {
  console.log(`Server start on http://localhost:9000`);
});
