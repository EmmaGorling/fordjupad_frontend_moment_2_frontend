import React, { useState } from 'react'

const TodoForm = () => {

    // Interface
    interface FormData {
        title: string, 
        description: string,
        status: string
    }

    // State
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        status: "Ej påbörjad"
    });


    return (
        <div>
            <form action="">
                <label htmlFor="title">Titel</label>
                <input 
                    type="text" 
                    name='title' 
                    id='title' 
                    value={formData.title} 
                    onChange={(event) => {setFormData({...formData, title: event.target.value})}}
                />
                <br />
                <label htmlFor="description">Beskrivning</label>
                <textarea 
                    name="description" 
                    id="description" 
                    value={formData.description}
                    onChange={(event) => {setFormData({...formData, description: event.target.value})}}>
                </textarea>
                <br />
                <button type='submit'>Lägg till uppgift</button>
            </form>
        </div>
    )
}

export default TodoForm