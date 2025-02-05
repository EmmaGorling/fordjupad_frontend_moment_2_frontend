import React from 'react'

const StatusButton = ({ id, status, getTodos }: {
    id: string,
    status: string,
    getTodos: Function
}) => {

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
                throw new Error('Kunde inte uppdatera status');
            }

            getTodos();
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
        <button onClick={updateStatus} disabled={ status==="Avklarad" }>
            {buttonLabel(status)}
        </button>
    )
}

export default StatusButton