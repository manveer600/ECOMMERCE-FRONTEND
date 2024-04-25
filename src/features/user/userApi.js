
  
  


  export function fetchLoggedInUser(){
    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8080/users/own`);
        const data = await response.json();
        resolve({data});
    })
  }
  
  

  export function updateUser(updatedData){
    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8080/users/${updatedData.id}`, {
            method:"PATCH",
            body:JSON.stringify(updatedData),
            headers:{'content-type':'application/json'}
        })
        const data = await response.json();
        console.log('data from backend', data);
        resolve({data});
    })
}


