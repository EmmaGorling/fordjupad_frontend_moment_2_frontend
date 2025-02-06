import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import TodoForm from './components/TodoForm';
import { useState, useEffect } from 'react';
import { TodoInterface } from './interfaces/todoInterface';
import Todo from './components/Todo';

function App() {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
          getTodos();
      }, []);

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

  return (
    <>
      <Header />
      <main>
        <h1>Att göra</h1>
        <div className='mw70ch'>
          {loading && <p>Laddar...</p>}
          {error && <p className='error'>{error}</p>}
          {
            todos.map((todo) => 
              <Todo todo={todo} getTodos={getTodos}/>
            )
          }
        </div>

        <div className='mw70ch'>
          <TodoForm getTodos={getTodos} />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
