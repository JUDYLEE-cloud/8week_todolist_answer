import axiosInstance from "./axiosInstance";

// 1. todo 생성
const postTodo = async ({ title, content, checked = false }) => {
    const { data } = await axiosInstance.post("/todo", {
        title,
        content,
        checked,
    });
    return data;
};

// 2. todo 목록 가져오기
const getTodoList = async ({ title }) => {
    let url = "/todo";
    if (title) {
        url += `?title=${title}`;
    }
    const { data } = await axiosInstance.get(url);
    return data;
};

// 3. todo detailpage 가져오기
const getTodo = async ({ id }) => {
    const { data } = await axiosInstance.get(`/todo/${id}`);
    return data;
};

// 4. todo 수정하기
const patchTodo = async ({ id, title, content, checked }) => {
    const { data } = await axiosInstance.patch(`/todo/${id}`, {
        title,
        content,
        checked,
    });
    return data;
};

// 5. todo 삭제하기
const deleteTodo = async ({ id }) => {
    const { data } = await axiosInstance.delete(`/todo/${id}`);
    return data;
};

export { postTodo, getTodoList, getTodo, patchTodo, deleteTodo };
