import React, { useEffect, useState } from "react";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import { useNavigate } from "react-router-dom";

import { supabase } from "./supabaseClient";

const HomeTodo = () => {

    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const loggedInUserId = localStorage.getItem("loggedInUserId");

    // GET TODOS
    const getTodos = async () => {
        const { data, error } = await supabase
            .from("todos")
            .select("*")
            .eq("user_id", loggedInUserId);

        console.log("SUPABASE DATA:", data);
        console.log("SUPABASE ERROR:", error);

        if (error) {
            console.log("TODO Error", error);
            return;
        }
        setTodos(data);
    };

    // LOAD TODOS WHEN PAGE OPENS
    useEffect(() => {
        getTodos();
    }, []);

    // ADD TODO
    const addTodo = async (title, description, image) => {
        const newTodo = {
            // id: Date.now(),
            user_id: loggedInUserId,
            title: title,
            description: description,
            image: image,
            completed: false
        };

        const { data, error } = await supabase
            .from("todos")
            .insert([newTodo])
            .select()  //ask supabase to return the newly created todo/row
            .single();

        if (error) {
            console.log("TODO Error", error);
            return;
        }

        setTodos([  //Add that Todo to my current React list so it appears immediately.
            ...todos,
            data //give me first returned todo
        ]);
    };

    // COMPLETE / INCOMPLETE
    const toggleComplete = async (id) => {
        const todo = todos.find(
            (todo) => todo.id === id
        );

        if (!todo) return;

        const { error } = await supabase
            .from("todos")
            .update({
                completed: !todo.completed,
                updated_at: new Date().toISOString()  //converts it into a standard timestamp format
            })
            .eq("id", id);

        if (error) {
            console.log(error);
            return;
        }

        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // DELETE TODO
    const deleteTodo = async (id) => {
        const { error } = await supabase
            .from("todos")
            .delete()
            .eq("id", id);

        if (error) {
            console.log(error);
            return;
        }

        setTodos(
            todos.filter((todo) => todo.id !== id)
        );
    };

    // EDIT TODO
    const editTodo = async (id, newTitle, newDescription, newImage) => {
        const { error } = await supabase
            .from("todos")
            .update({
                title: newTitle,
                description: newDescription,
                image: newImage,
                updated_at: new Date().toISOString()
            })
            .eq("id", id);

        if (error) {
            console.log(error);
            return;
        }

        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        title: newTitle,
                        description: newDescription,
                        image: newImage,
                        updated_at: new Date().toISOString()
                    }
                    : todo
            )
        );
    };

    // LOGOUT
    const logoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem("loggedInUserId");

        navigate("/");
    };


    return (
        <div className="app-container">
            <div className="todo-app">
                <header className="app-header">
                    <div className="task-header">
                        <h1>Task Manager</h1>
                        <button className="logout-btn" onClick={logoutHandler}>
                            Log out
                        </button>
                    </div>
                    <p className="app-subtitle">
                        Keep track of what needs doing,
                        with a picture if it helps.
                    </p>
                </header>
                <TodoForm addTodo={addTodo} />

                <TodoList
                    todos={todos}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                />
            </div>
        </div>
    );
};

export default HomeTodo;