export function addToCart(item) {
    return new Promise(async (resolve) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}carts`, {
            method: "POST",
            body: JSON.stringify(item),
            credentials: "include",
            headers: { 'content-type': 'application/json' }
        })
        const data = await response.json();
        resolve({ data });
    })
}


export function fetchItemsByUserId() {
    return new Promise(async (resolve) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}carts`, {
            mode: "cors",
            credentials: 'include',
            method: 'GET'
        });
        const data = await response.json();
        resolve({ data });
    })
}



export function updateItem(data) {
    const dataToBeUpdated = data.dataToBeUpdated;
    const productId = data.productId;
    return new Promise(async (resolve) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}carts/${productId}`, {
            method: "PATCH",
            mode: "cors",
            credentials: 'include',
            body: JSON.stringify(dataToBeUpdated),
            headers: { 'content-type': 'application/json' }
        })

        const data = await response.json();
        resolve({ data });
    })
}




export function deleteItemFromCart(itemId) {
    return new Promise(async (resolve) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}carts/${itemId}`, {
            method: "DELETE",
            mode: "cors",
            credentials: 'include',
        })
        const data = await response.json();
        resolve({ data });
    })
}

export async function resetCart() {
    return new Promise(async (resolve) => {
        const response = await fetchItemsByUserId();
        const items = await response.data;
        console.log('items are these', items);
        const cartItems = items.data;

        for (let item of cartItems) {
            await deleteItemFromCart(item.id);
        }

        resolve({ state: 'success' })
    })
}