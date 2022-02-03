import ky from "ky";

const rq = ky.extend({
    prefixUrl: window.env.apiUrl,
});

export const getAllTodosApi = async () => {
    const { data } = await rq.get("list").json();
    return data;
};

export const updateTodoApi = async (id, payload) => {
    const { data } = await rq
        .post("update", {
            json: { id, payload },
        })
        .json();

    return data;
};

export const delTodoApi = async (id) => {
    const { data } = await rq
        .post("delete", {
            json: { id },
        })
        .json();

    return data;
};

export const addTodoApi = async (message) => {
    const { data } = await rq
        .post("add", {
            json: { message },
        })
        .json();

    return data;
};
