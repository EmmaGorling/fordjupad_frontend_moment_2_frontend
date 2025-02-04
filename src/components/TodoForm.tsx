import React, { useState } from 'react';

const TodoForm = () => {

    // Interface
    interface FormData {
        title: string, 
        description: string,
        status: string
    }

    // Interface errors
    interface ErrorData {
        title?: string,
        description?: string
        main?: string
    }

    // State for form
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        status: "Ej påbörjad"
    });

    // State for errors
    const [errors, setErrors] = useState<ErrorData>({});

    // Validate data
    const validateForm = ((data: FormData) => {

        const validationErrors: ErrorData = {};

        // Title shorter than 4 chars
        if(data.title.length < 4) {
            validationErrors.title = "Uppgiftens titel behöver vara minst 3 tecken";
        }

        // Description longer than 200 chars
        if(data.description.length > 200) {
            validationErrors.description = "Beskrivningen av uppgiften får max vara 200 tecken"
        }
        // Return created errors
        return validationErrors;
    });

    // On submit
    const submitForm = async (event: any) => {
        // Prevent default actions
        event.preventDefault();

        // Validate the form data
        const validationErrors = validateForm(formData);

        // Add errors with setErrors
        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Send data to API
            try {
                const response = await fetch("https://fordjupad-frontend-moment-2-backend.onrender.com/todos", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if(!response.ok) {
                    setErrors({ main: "Ett fel uppstod när formuläret skickades, vänligen försök igen" });
                } else {
                    // Reset errors
                    setErrors({});

                    // Reset form
                    setFormData({...formData, title: "", description: ""});
                }
            } catch (error) {
                setErrors({ main: "Ett fel uppstod vid kontakt med servern, vänligen försök igen" });
            }
        }
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <label htmlFor="title">Titel</label>
                <input 
                    type="text" 
                    name='title' 
                    id='title' 
                    value={formData.title} 
                    onChange={(event) => {setFormData({...formData, title: event.target.value})}}
                />
                {errors.title && <span className='formError'>{errors.title}</span>}
                <br />
                <label htmlFor="description">Beskrivning</label>
                <textarea 
                    name="description" 
                    id="description" 
                    value={formData.description}
                    onChange={(event) => {setFormData({...formData, description: event.target.value})}}>
                </textarea>
                {errors.description && <span className='formError'>{errors.description}</span>}
                <br />
                {errors.main && <span className='formError'>{errors.main}</span>}
                <button type='submit'>Lägg till uppgift</button>
            </form>
        </div>
    )
}

export default TodoForm