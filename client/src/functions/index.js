import * as api from '../api';

export const readTodos = async () => {
    try{
        const { data } = await api.readTodos()
        return data
    } catch (error) {
        console.log(error);
    }
}

export const createTodo = async (todo) => {
    try {
        console.log('createTodo at client side')
        const {data} = await api.createTodo(todo);
        console.log('functions', data);
        return data
    } catch (error) {
        console.log(error);
    }
}

export const updateTodo = async (id, todo) => {
    try {
        const { data } = await api.updateTodo(id, todo);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteTodo = async (id) => {
    console.log('delete todo', id);
    try {
        await api.deleteTodo(id);
    } catch (error) {
        console.log(error);
    }
}