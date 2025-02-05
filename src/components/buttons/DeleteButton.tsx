import React, { useState } from 'react'

const DeleteButton = ({ id, getTodos } : { id: string, getTodos: Function }) => {

    const [error, setError] = useState<string | null>(null);

    const deleteTodo = async () => {
        try {
            const response = await fetch(`https://fordjupad-frontend-moment-2-backend.onrender.com/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if(!response.ok) {
                setError("Kunde inte ta bort uppgiften");
            }

            setError(null);
            getTodos();
        } catch (error) {
            setError("Något gick fel");
        }
    }
    return (
        <button className='deleteBtn'  onClick={deleteTodo}>
            <i className="fa-solid fa-xmark"></i>
        </button>
    )
}

export default DeleteButton