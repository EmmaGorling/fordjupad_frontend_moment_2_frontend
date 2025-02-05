import React, { useState } from 'react'
import './StatusButton.css';

const StatusButton = ({ id, status, getTodos }: {
    id: string,
    status: string,
    getTodos: Function
}) => {

    const [error, setError] = useState<string | null>(null);

    // Update status
    const updateStatus = async () => {
        // Set next status
        let newStatus = "Ej påbörjad";
        if(status === "Ej påbörjad") newStatus = "Pågående";
        if(status === "Pågående") newStatus = "Avklarad";

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
                setError("Kunde inte uppdatera statusen");
            }

            setError(null);
            getTodos();
        } catch (error) {
            setError("Något gick fel vid uppdateringen");
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
            {error && <p>{error}</p>}
            <button className='statusBtn' onClick={updateStatus} disabled={ status==="Avklarad" }>
                {buttonLabel(status)}
            </button>
        </>
    )
}

export default StatusButton