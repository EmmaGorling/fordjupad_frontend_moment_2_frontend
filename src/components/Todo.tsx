
import './Todo.css';
import { TodoInterface } from '../interfaces/todoInterface';
import StatusButton from "./buttons/StatusButton";
import DeleteButton from "./buttons/DeleteButton";


const Todo = ({todo, getTodos} : {todo: TodoInterface, getTodos: Function}) => {

    const statusColor = todo.status === "Ej påbörjad" ? "#ae2d2d" : todo.status === "Pågående" ? "#FFC045" : "#1d7f47";

    return (
        <>
            <section key={todo._id} className="todoItem">
                <div className="heading">
                    <h3>{todo.title}</h3>
                    <span className="divider"></span>
                    <span className="status" style={{color: statusColor}}>{todo.status}</span>
                </div>
                <div className="description">
                    {todo.description && <p>{todo.description}</p>}
                </div>
                <div className="buttons">
                    <DeleteButton id = {todo._id as string } getTodos={getTodos} />
                    <StatusButton id ={todo._id as string} status={todo.status} getTodos={getTodos} />
                </div>
            </section>
        </>
    )
}

export default Todo