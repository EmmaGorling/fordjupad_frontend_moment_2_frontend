import { useState, useEffect } from "react";
import { Todo } from '../interfaces/todoInterface';


const TodoList = () => {

    // States
    const [todos, setTodos] = useState<Todo[] | []>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        getTodos();
    }, []);


    // Get all Todo´s
    const getTodos = async () => {
        try {
            
            setLoading(true);

            const response = await fetch("https://fordjupad-frontend-moment-2-backend.onrender.com/todos");

            if(!response.ok) {
                throw Error;
            } else {
                const data = await response.json();

                setTodos(data);
                setError(null);
            }
        } catch (error) {
            setError("Något gick fel vi hämtningen");
        } finally {
            setLoading(false);
        }
    }

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

            setTodos((prevTodos) =>
                prevTodos.map(todo =>
                    todo._id === id ? {...todo, status: newStatus } : todo
                )
            );
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
        <div>
            <h1>Saker som behöver göras</h1>

            {
                error && <p>{error}</p>
            }

            {
                loading && <p>Laddar uppgifter...</p>
            }

            <div>
                {
                    todos.map((todo) => (
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
                    ))
                }
            </div>
        </div>
    )
}

export default TodoList