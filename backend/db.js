import knex from "knex";
import { v4 as uuidv4 } from "uuid";

const client = knex({
    client: "pg",
    connection: process.env.dbConnUrl,
    searchPath: ["public"],
});

const TABLE_NAME = "todos";

export const checkDBTable = async () => {
    if (!(await client.schema.hasTable(TABLE_NAME))) {
        await client.schema.createTable(TABLE_NAME, (table) => {
            table.text("message").notNullable();
            table.timestamp("created").defaultTo(client.fn.now()).notNullable();
            table.timestamp("updated").defaultTo(client.fn.now()).notNullable();
            table.boolean("completed").defaultTo(false).notNullable();
            table.text("id").notNullable();
            table.string("dueDate"); // default limit 255 length
        });
        console.log(`create table ${TABLE_NAME} successfully!!`);
    }
};

export const listTodos = async (sort = {}) => {
    const { index = "created", order = "desc" } = sort;

    const res = await client.select().from(TABLE_NAME).orderBy(index, order);
    return res;
};

export const addTodo = async (message) => {
    await client(TABLE_NAME).insert({
        message,
        id: uuidv4(),
    });
};

export const updateTask = async (id, payload) => {
    await client(TABLE_NAME)
        .where("id", id)
        .update({
            ...payload,
            updated: new Date().toISOString(),
        });
};

export const deleteTodo = async (id) => {
    await client(TABLE_NAME).where("id", id).del();
};
