export const Authorization = async (login, password) => {
    const data = {
        username: login,
        password: password,
    }
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/api-token-auth/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Ошибка:", error)
        throw error;
    }
}

export const getWorkOrders = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/workorders/`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            ; if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Ошибка:", error)
        throw error;
    }
}

export const getProductsByOrder = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/workorders/${id}/products/`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            ; if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Ошибка:", error)
        throw error;
    }
}