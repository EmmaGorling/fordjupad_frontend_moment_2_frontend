import { useState, useEffect } from "react";
import { TodoInterface } from '../interfaces/todoInterface';
import StatusButton from "./buttons/StatusButton";


const Todo = ({todo, getTodos} : {todo: TodoInterface, getTodos: Function}) => {

    

    return (
        <>
            <section key={todo._id}>
                <h3>{todo.title}</h3>
                <div>
                    {todo.description && <p>{todo.description}</p>}
                </div>
                <div>
                    <span>Status:<br />{todo.status}</span>
                    <StatusButton id ={todo._id as string} status={todo.status} getTodos={getTodos} />
                </div>
            </section>
        </>
    )
}

export default Todo