export function addToCart(item){
    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8080/carts`, {
            method:"POST",
            body:JSON.stringify(item),
            credentials:"include",
            headers:{'content-type':'application/json'}
        })
        const data = await response.json();
        console.log('data got from backend while adding an item to the cart', data);
        resolve({data});
    })
}


export function fetchItemsByUserId(){
    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8080/carts`,{
            mode:"cors",
            credentials:'include',
        });
        const data = await response.json();
        resolve({data});
    })
}



export function updateItem(data){
    console.log('updating data in api', data);
    const dataToBeUpdated = data.dataToBeUpdated;
    const productId = data.productId;
    console.log(dataToBeUpdated);
    console.log(productId);
    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8080/carts/${productId}`, {
            method:"PATCH",
            mode:"cors",
            credentials:'include',
            body:JSON.stringify(dataToBeUpdated),
            headers:{'content-type':'application/json'}
        })

        const data = await response.json();
        resolve({data});
    })
}




export function deleteItemFromCart(itemId){
    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8080/carts/${itemId}`, {
            method:"DELETE",
            mode:"cors",
            credentials:'include',
        })
        const data = await response.json();
        resolve({data});
    })
}

export async function resetCart(){
    return new Promise(async(resolve)=> {
        const response = await fetchItemsByUserId();
        const items = await response.data;
        const cartItems = items.cart;
    
        for(let item of cartItems){
            await deleteItemFromCart(item.id);
        }
    
        resolve({state:'success'})  
    })
}