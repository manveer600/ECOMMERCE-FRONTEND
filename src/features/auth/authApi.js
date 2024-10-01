import toast from "react-hot-toast";

export function createUser(userData) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/signup`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { 'content-type': 'application/json' },
            credentials: 'include',
            mode: 'cors'
        })
        if (response.ok) {
            const data = await response.json();
            resolve({ data });
        }
        else {
            const error = await response.json();
            reject(error);
        }

    })
}

// export function loginUser(loginData) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/login`, {
//                 method: 'POST',
//                 credentials: 'include',
//                 mode: 'cors',
//                 body: JSON.stringify(loginData),
//                 headers: { 'content-type': "application/json" },
//             });

//             console.log('response from the backend', response);
//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('data is this', data);
//                 resolve({ data });
//                 return;
//             } else {
//                 const error = await response.json();
//                 reject(error);
//             }
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// export function signOut() {
//     return new Promise(async (resolve) => {
//         const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/logout`, {
//             mode: "cors",
//             credentials: 'include',
//         });
//         const data = await response.json();
//         resolve({ data: 'success' });
//     })
// }

// export function checkAuth() {
//     return new Promise(async (resolve) => {
//         const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/check-auth`, {
//             mode: "cors",
//             credentials: 'include',
//         });
//         const data = await response.json();
//         resolve({ data });
//     })
// }

export async function forgotPassword(email) {

    try {
        const response = await toast.promise(
            fetch(`${process.env.REACT_APP_BACKEND_URL}users/forgotPassword`, {
                method: 'POST',
                body: JSON.stringify(email),
                headers: { 'Content-Type': 'application/json' }
            }),
            {
                loading: 'Sending verification code...',
                success: (data) => {
                    return 'Verification code sent successfully!'
                },
                error: 'Failed to send forgot password request'
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to send forgot password request: ${await response.text()}`);
        }


        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error sending forgot password request:", error);
        toast.error(error?.response?.data?.message || "Failed to send forgot password request");
    }
}


export function resetPassword(data) {
    const resetPasswordToken = data.resetToken;
    const newPassword = data.password;
    return new Promise(async (resolve) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/resetPassword/${resetPasswordToken}`, {
            method: 'POST',
            body: JSON.stringify({ password: newPassword }),
            headers: { 'content-type': "application/json" },
        });
        const data1 = await response.json();
        resolve({ data1 });
    })
}


export function updateUser(updatedData) {
    return new Promise(async (resolve) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/${updatedData.id}`, {
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