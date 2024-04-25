export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products',{
      credentials:"include"
    })
    const data = await response.json();
    resolve({ data })
  });
}


export function fetchProductsByFilter(filter, sort, pagination) {
  // filter = {"category":'smartphone'}
  // filter={category:["smartphones", "laptops", "skincare", "etc"]}
  let queryString = '';
  for (let key in filter) {
    const array = filter[key]; //array milega ["smartphones", "laptops", "skincare", "etc"]
    if (array.length) {
      const lastFilter = array[array.length - 1];
      queryString += `${key}=${lastFilter}&`
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }


  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products?${queryString}`,{
      credentials:"include",
      mode: 'cors'
    })
    const data = await response.json();
    resolve({ data:data });
  });
}


export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/brands`, {
      method:'GET',
      credentials:"include",
      mode: 'cors'
    })
    const data = await response.json();
    resolve({ data })
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/categories`, {
      method:'GET',
      credentials:'include'
    })
    const data = await response.json();
    resolve({ data })
  });
}


export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products/${id}`, {
      credentials:"include"
    })
    const data = await response.json();
    resolve({ data })
  });
}


export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products`, {
      method: 'POST',
      body: JSON.stringify(product),
      credentials:"include",
      headers: { 'content-type': 'application/json' }

    })
    const data = await response.json();
    resolve({ data })
  });
}




export function updateProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products/${product.id}`, {
      method: "PATCH",
      body: JSON.stringify(product),
      credentials:"include",
      headers: { 'content-type': 'application/json' }
    })

    const data = await response.json();
    resolve({ id: product.id, data });
  })
}