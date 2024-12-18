export function addOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}orders`, {
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
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}orders/${order.id}`, {
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

  let queryString = '';

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }
  console.log('query string is this', `${process.env.REACT_APP_BACKEND_URL}orders?${queryString}`);
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}orders?${queryString}`, {
      method:'GET',
      mode: "cors",
      credentials: 'include',
    })
    const data = await response.json();
    resolve({data});
  });
}


export function fetchOrdersByUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}orders/own`, {
      mode: "cors",
      credentials: 'include',
    });
    const data = await response.json();
    resolve({ data });
  })
}
