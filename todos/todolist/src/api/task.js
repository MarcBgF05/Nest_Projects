const API = 'http://localhost:3000/'

export const getTasksRequest = async () => {
    try {
        const response = await fetch(`${API}tasks/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log('Error en la petición del getTasksRequest')
    }
    }

export const getTaskRequest = async (id) => {
    try {
        const response = await fetch(`${API}tasks/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log('Error en la petición')
    }
    }

export const createTaskRequest = async (values) => {
    try {
        const response = await fetch(`${API}tasks/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log('Error en la petición')
    }
    }   

export const updateTaskRequest = async (id,values) => {

    console.log('Values recibidos en la función de updateTaskRequest', values)

    try {
        const response = await fetch(`${API}tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include', // Para enviar las cookies al servidor y mantener la sesión activa 
        })
        const result = await response.json()
        console.log('ACTUALIZACIÓN', result)
        return result
    } catch (error) {
        console.log('Error en la petición',error)
    }
    }

export const deleteTaskRequest = async (id) => {

    try {
        const response = await fetch(`${API}tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        })
        const result = await response.json()
        console.log('result del delete', result)
        return result
        
    } catch (error) {
        console.log('Error en la petición')
    }
    }
