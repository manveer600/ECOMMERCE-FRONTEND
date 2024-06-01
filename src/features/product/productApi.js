export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}products`, {
      credentials: "include",
      mode:'cors',
    })
    const data = await response.json();
    resolve({ data })
  });
}

export function fetchProductsByFilter(filter, sort, pagination) {
  // filter = {"category":'smartphone', "brand":"apple"}
  let queryString = '';
  for (let key in filter) {
    const value = filter[key];
    queryString += `${key}=${value}&`
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }


  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}products?${queryString}`, {
      method:'GET',
      credentials: "include",
      mode: 'cors'
    })
    const data = await response.json();
    resolve({ data: data });
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}brands`, {
      method: 'GET',
      credentials: "include",
      mode: 'cors'
    })
    const data = await response.json();
    resolve({ data })
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}categories`, {
      method: 'GET',
      credentials: "include",
      mode: 'cors'
    })
    const data = await response.json();
    resolve({ data })
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}products/${id}`, {
      credentials: "include",
      mode: 'cors'
    })
    const data = await response.json();
    resolve({ data })
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}products`, {
      method: 'POST',
      body: JSON.stringify(product),
      credentials: "include",
      mode: 'cors',
      headers: { 'content-type': 'application/json' }

    })
    const data = await response.json();
    resolve({ data })
  });
}

export function updateProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}products/${product.id}`, {
      method: "PATCH",
      body: JSON.stringify(product),
      credentials: "include",
      mode: 'cors',
      headers: { 'content-type': 'application/json' }
    })

    const data = await response.json();
    resolve({ id: product.id, data });
  })
}

export function deleteProduct(id){
  return new Promise(async (resolve,reject)=>{
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}products/deleteProduct`,{
      method:'DELETE',
      body:JSON.stringify({id}),
      credentials:'include',
      mode:'cors',
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json();
    resolve({id,data});
  })
}