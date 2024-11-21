import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getTodoList, postTodo, deleteTodo, patchTodo } from "../apis/todo";
import { queryClient } from "../main"; 

function TodoList() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const { data:todos, isLoading } = useQuery({
        queryFn: getTodoList,
        queryKey: ["todos"],
    });

    const { mutate: postTodoMutation } = useMutation({
        mutationFn: postTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });
        },
    });

    const { mutate: deleteTodoMutation } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryey: ["todos"],
            });
        },
    }) 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title, content);
        mutate({title, content});
        setTitle("");
        setContent("");
    };

    return (
    <>
    
    <TodoConTainer>
        <h1>할 일 목록</h1>
        <InputTitle
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <InputContent
            type="text"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
        <AddItemButton
            type='button'
            onClick={handleSubmit}>
            추가</AddItemButton>
    </TodoConTainer>

    {isLoading ? (
        <div>로딩중입니다.</div> 
    ) : (
        todos[0]?.map((todo) => {
            return (
            <TodoListItem key={todo.id}>
            <div>
                <input type="checkbox" defaultChecked={todo.checked} />
                <ContentGroup>
                <p>{todo.title}</p>
                <p>{todo.content}</p>
                </ContentGroup>
                <ActionButton onClick={() => deleteTodoMutation({id: todo.id})}>삭제</ActionButton>
            </div>
            </TodoListItem>
            )
        })
    ) }

    </>
    );
}

export default TodoList;

export const ActionButton = styled.button`
    padding: 6px 12px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover {
        background-color: #0056b3;
    }
`;
export const TodoListItem = styled.li`
    width: 500px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    position: relative;
`;
export const ContentGroup = styled.div`
    margin: 7px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;




export const TodoConTainer = styled.div`
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const InputTitle = styled.input`
    width: 100%;
    max-width: 400px;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 8px;
    border: 1px solid gray;
    font-size: 16px;
    outline: none;
    box-sizing: border-box;
    
    &:focus {
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;
export const InputContent = styled.input`
    width: 100%;
    max-width: 400px;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 8px;
    border: 1px solid gray;
    font-size: 16px;
    outline: none;
    box-sizing: border-box;
    
    &:focus {
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;
export const AddItemButton = styled.button`
        width: 100%;
    max-width: 400px;
    padding: 12px;
    background-color: #007bff;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    box-sizing: border-box;
    
    &:hover {
        background-color: #0056b3;
    }
`;
