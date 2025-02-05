import { useState, useEffect } from "react";
import { TodoInterface } from '../interfaces/todoInterface';


const Todo = ({todo} : {todo: TodoInterface}) => {

    // Update status
    const updateStatus = async (id: string, currentStatus: string) => {
        // Set next status
        let newStatus = "Ej påbörjad";
        if(currentStatus === "Ej påbörjad") newStatus = "Pågående";
        if(currentStatus === "Pågående") newStatus = "Avklarad";

        try {
            // Send update to API
            const response = await fetch(`https://fordjupad-frontend-moment-2-backend.onrender.com/todos/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: newStatus })
            });

            if(!response.ok) {
                throw new Error('Kunde inte uppdatera status');
            }

            /*
            setTodos((prevTodos) =>
                prevTodos.map(todo =>
                    todo._id === id ? {...todo, status: newStatus } : todo
                )
            );*/
        } catch (error) {
            console.log(error);
        }
    }

    // Button labels
    const buttonLabel = (status: string) => {
        switch (status) {
            case "Ej påbörjad":
                return <>Starta <i className="fa-solid fa-play"></i></>;
            case "Pågående":
                return <>Avsluta <i className="fa-solid fa-flag-checkered"></i></>;
            case "Avklarad":
                return <>Klar <i className='fa-solid fa-check'></i></>;
            default:
                return status;
        }
    }

    return (
        <>
            <section key={todo._id}>
                <h3>{todo.title}</h3>
                <div>
                    {todo.description && <p>{todo.description}</p>}
                </div>
                <div>
                    <span>Status:<br />{todo.status}</span>
                    <button onClick={() => updateStatus(todo._id as string, todo.status)} disabled={todo.status === "Avklarad"}>
                        {buttonLabel(todo.status)}
                    </button>
                </div>
            </section>
        </>
    )
}

export default Todo