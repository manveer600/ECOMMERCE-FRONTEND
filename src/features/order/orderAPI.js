export function addOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://ecommerce-backend-gj2h.onrender.com/orders', {
      method: "POST",
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
      mode: "cors",
      credentials: 'include',
    })
    const data = await response.json();
    resolve({ data });
  })
}



export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://ecommerce-backend-gj2h.onrender.com/orders/${order.id}`, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
      mode: "cors",
      credentials: 'include',
    })
    const data = await response.json();
    resolve({ data });
  })
}



export function fetchAllOrders(sort, pagination) {

  // filter = {"category":'smartphone'}
  // filter={category:["smartphones", "laptops", "skincare", "etc"]}
  let queryString = '';

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }



  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }


  return new Promise(async (resolve) => {
    const response = await fetch(`https://ecommerce-backend-gj2h.onrender.com/orders?${queryString}`, {
      mode: "cors",
      credentials: 'include',
    })
    const data = await response.json();
    const totalOrders = await response.headers.get('X-Total-Count');
    resolve({ data: { orders: data, totalOrders: +totalOrders } })
  });
}


export function fetchOrdersByUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://ecommerce-backend-gj2h.onrender.com/orders/own`, {
      mode: "cors",
      credentials: 'include',
    });
    const data = await response.json();
    resolve({ data });
  })
}
