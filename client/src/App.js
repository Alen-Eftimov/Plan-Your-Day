import Preloader from "./components/Preloader";
import { useState, useEffect } from "react";
import { createTodo, readTodos } from "./functions";
import { deleteTodo, updateTodo } from "./functions";
import DateHeader  from "./DateHeader";

const initialValues = {
    title: "",
    content: "",
};
const App = () => {
    const [todos, setTodos] = useState(null);
    const [todo, setTodo] = useState(initialValues);
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        let currentTodo = currentId !== 0 ? todos.find(todo => todo._id === currentId) : {title: '', content: ''}

        setTodo(currentTodo)
    }, [currentId])

    useEffect(() => {
        // console.log('todos');
        const fetchData = async () => {
            const result = await readTodos();
            // console.log(result);
            setTodos(result)
        }
        fetchData()
        //console.log(readTodos());
    }, [currentId, todos])

    const clear = () => {
        setCurrentId(0);
        setTodo({title: '', content: ''})
    }

    useEffect(() => {
        const clearField = (e) => {
            if(e.keyCode === 27) {
                clear();
            }
        }
        window.addEventListener('keydown', clearField)
        return () => window.removeEventListener('keydown', clearField)
    }, [])


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (currentId === 0) {
            // console.log('submit');
            const result = await createTodo(todo)
            // console.log('createTodo result', result)
            setTodos([...todos, result])
            clear()
        } else {
            await updateTodo(currentId, todo)
            clear()
        }
        
    }

    const removeTodo = async (id) => {
        await deleteTodo(id);
        // this down remove before deploy
        // const todosCopy = [...todos];
        // todosCopy.filter(todo => todo._id !== id);
        // setTodos(todosCopy);
        // clear() 
        // this down add when you deploy
        const result = await readTodos();
        setTodos(result)
    }    

    return (
        <div className="container">            
            <ul className="collection with-header">                       
                <li className="collection-header center-align blue white-text">                                                    
                    <h4>  
                        Plan Your Day
                        <br />
                        <i className="material-icons blue-text text-darken-4 small">create</i>
                        <i className="material-icons blue-text text-darken-4 prefix small">description</i>                                               
                        <span className="blue-text text-darken-4">
                            <DateHeader />
                        </span>
                    </h4>                    
                </li>
            </ul>                       
            <div className="row">
                {/* <pre>{JSON.stringify(todo)}</pre>
                <p>id: {currentId}</p>
                <p>id: {JSON.stringify(todo)}</p> */}
                <form className="col s12" onSubmit={onSubmitHandler}>
                    <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons blue-text text-darken-4 prefix">title</i>
                            <input 
                                id="icon_title"
                                key="title" 
                                name="title"
                                type="text" 
                                className="validate" 
                                value={todo.title}
                                onChange={(e) => setTodo({ ...todo, title: e.target.value})}
                                maxLength="100"
                                required 
                                />
                            <label htmlFor="icon_title">Title</label>
                        </div>
                        <div className="input-field col s6">
                            <i className="material-icons blue-text text-darken-4 prefix">description</i>
                            <input 
                                id="icon_description"
                                key="content" 
                                name="content" 
                                type="text" 
                                className="validate"
                                value={todo.content}
                                onChange={(e) => setTodo({ ...todo, content: e.target.value })}
                                maxLength="500"
                                required 
                                />
                            <label htmlFor="icon_description">Content</label>
                        </div>
                        <div className="row center-align">
                        <button className="btn waves-effect waves-light white-text blue darken-4" type="submit" name="action">
                            Submit
                        <i className="material-icons right">send</i>
                        </button>                        
                        </div>
                    </div>
                </form>
                {
                !todos ? <Preloader /> : todos.length > 0 ? 
                <ul className="collection"  style={{wordBreak: "break-word"}}>
                    {todos.map(todo => (
                        <li key={todo._id} onClick={() => setCurrentId(todo._id)}
                            className="collection-item blue z-depth-1 hoverable">
                            <h5>
                                {todo.title}
                            </h5>
                            <p>
                                {todo.content}                                                               
                                <a href="#!" onClick={() => removeTodo(todo._id)} className="secondary-content">
                                    <i className="material-icons red-text text-darken-4 small">delete</i>
                                </a>
                                <a href="#!" className="secondary-content">
                                    <i className="material-icons white-text small">create</i>                                    
                                </a> 
                            </p>
                        </li>
                    ))}
                </ul> 
                : 
                <div className="blue-text text-darken-4">
                    <h5>Nothing to do...</h5>
                </div>
                }
            </div>
        </div>
    );
}

export default App