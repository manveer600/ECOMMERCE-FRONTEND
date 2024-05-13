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

export function loginUser(loginData) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`http://localhost:8080/users/login`, {
                method: 'POST',
                credentials:'include',
                mode:'cors',
                body: JSON.stringify(loginData),
                headers: { 'content-type': "application/json" },
            });
            if (response.ok) {
                const data = await response.json();
                resolve({ data });
            } else {
                const error = await response.json();
                console.log('error while logging', error);
                reject(error);
            }
        } catch (e) {
            console.log('Unable to login at this time. Please try again later',e);
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

export function checkAuth(){
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/users/check-auth', {
            mode: "cors",
            credentials: 'include',
        });
        const data = await response.json();
        resolve({ data });
    })
}