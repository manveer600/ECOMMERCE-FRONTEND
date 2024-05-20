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

export function forgotPassword(email){
    return new Promise(async (resolve,reject) => {
        const response = await fetch('http://localhost:8080/users/forgotPassword', {
            method:'POST',
            body:JSON.stringify(email),
            headers: { 'content-type': "application/json" },
        });
        console.log("response from forgotpassword",response);
        const data = await response.json();
        resolve({data});
    })
}

export function resetPassword(data){
    console.log('data in auth api', data);
    const resetPasswordToken = data.resetToken;
    const newPassword = data.password;
    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8080/users/resetPassword/${resetPasswordToken}`, {
            method:'POST',
            body:JSON.stringify({password:newPassword}),
            headers: { 'content-type': "application/json" },
        });
        console.log("response from resetPassword",response);
        const data1 = await response.json();
        resolve({data1});
    })
}


export function updateUser(updatedData) {
    return new Promise(async (resolve) => {
      const response = await fetch(`http://localhost:8080/users/${updatedData.id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedData),
        credentials: "include",
        mode: 'cors',
        headers: { 'content-type': 'application/json' }
      })
      const data = await response.json();
      resolve({ data });
    })
  }