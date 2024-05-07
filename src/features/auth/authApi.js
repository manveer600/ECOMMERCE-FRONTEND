export function createUser(userData) {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/users/signup', {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { 'content-type': 'application/json' },
            credentials:'include',
            mode:'cors'
        })
        const data = await response.json();
        resolve({ data });
    })
}




export function checkUser(loginData) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`http://localhost:8080/users/login`, {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: { 'content-type': "application/json" },
                credentials:'include',
                mode:'cors',
            });
            if (response.ok) {
                const data = await response.json();
                resolve({ data });
            } else {
                const error = await response.json();
                reject(error);
            }
        } catch (e) {
            reject(e);
        }
    })
}





export function signOut() {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/users/logout', {
            mode: "cors",
            credentials: 'include',
        });
        const data = await response.json();
        resolve({ data: 'success' });
    })
}
