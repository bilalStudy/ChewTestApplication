// export const userApi = {

//     getLoggedInUser: async () => {
//         const res = await fetch("http://localhost:3000/api/users/logged-in");

//         return res.ok ? await res.json() : null;
//     },
//     registerNewUser:async (user) => {
//         const res = await fetch('http://localhost:3000/api/users/register', {
//             method : "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(user),
//         })

//         return res.ok;
//     },

//     userLogin : async (username, password) => {
//         const res = await fetch("http://localhost:3000/api/users/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 username,
//                 password,
//             }),
//         })

//         return res.ok ? await res.json() : null
//     },
// }
