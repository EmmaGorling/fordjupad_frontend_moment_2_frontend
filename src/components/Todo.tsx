import { useState, useEffect } from "react";
import { TodoInterface } from '../interfaces/todoInterface';
import StatusButton from "./buttons/StatusButton";
import DeleteButton from "./buttons/DeleteButton";


const Todo = ({todo, getTodos} : {todo: TodoInterface, getTodos: Function}) => {

    

    return (
        <>
            <section key={todo._id}>
                <h3>{todo.title}</h3>
                <span>{todo.status}</span>
                <div>
                    {todo.description && <p>{todo.description}</p>}
                </div>
                <div>
                    <DeleteButton id = {todo._id as string } getTodos={getTodos} />
                    <StatusButton id ={todo._id as string} status={todo.status} getTodos={getTodos} />
                </div>
            </section>
        </>
    )
}

export default Todo