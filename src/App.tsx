import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  

  return (
    <>
      <Header />
      <main>
        <div>
          <TodoList />
        </div>
        <div>
          <TodoForm />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
