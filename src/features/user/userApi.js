// export function fetchLoggedInUser() {
//   return new Promise(async (resolve) => {
//     const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/own`, {
//       credentials: "include",
//       mode: 'cors'
//     });
//     const data = await response.json();
//     resolve({ data });
//   })
// }


// export function updateUser(updatedData) {
//   return new Promise(async (resolve) => {
//     const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/${updatedData.id}`, {
//       method: "PATCH",
//       body: JSON.stringify(updatedData),
//       credentials: "include",
//       mode: 'cors',
//       headers: { 'content-type': 'application/json' }
//     })
//     const data = await response.json();
//     resolve({ data });
//   })
// }


