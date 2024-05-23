export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch('https://ecommerce-backend-gj2h.onrender.com/products', {
      credentials: "include"
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
    const response = await fetch(`https://ecommerce-backend-gj2h.onrender.com/products?${queryString}`, {
      credentials: "include",
      mode: 'cors'
    })
    const data = await response.json();
    resolve({ data: data });
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://ecommerce-backend-gj2h.onrender.com/brands`, {
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
    const response = await fetch(`https://ecommerce-backend-gj2h.onrender.com/categories`, {
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
    const response = await fetch(`https://ecommerce-backend-gj2h.onrender.com/products/${id}`, {
      credentials: "include",
      mode: 'cors'
    })
    const data = await response.json();
    resolve({ data })
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://ecommerce-backend-gj2h.onrender.com/products`, {
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
    const response = await fetch(`https://ecommerce-backend-gj2h.onrender.com/products/${product.id}`, {
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