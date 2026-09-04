const express = require('express')

const {users} = require('../data/users.json');
const { getAllUsers, getSingleUserById, addNewUser, updateUserById, deleteUserById, getSubscriptionDetails } = require('../controllers/user_controller');

const routes = express.Router();



/** 
*route: /
*method: GET
*discription: to get all the users
*access: public
*parameters: none
*/

// routes.get('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: users
//     });
// })

routes.get('/', getAllUsers)


// route: //:id
// method: GET
// discription: to get user by its id
// access: public
// parameters: id

// routes.get('/:id', (req, res)=> {
//     const {id} = req.params;
//     const user = users.find((each)=> each.id === id);

//     //if user not found then send error response
//     if(!user){
//        return res.status(404).json({
//             success: false,
//             message: `user not found ${id}`
//         })

//     }

//     //if user found then send success response
//     res.status(200).json({
//         success: true,
//         data: user
//     })
// })

routes.get('/:id', getSingleUserById )

/** 
*route: /
*method: POSt
*discription: create/add new user
*access: public
*parameters: none
*/
// routes.post('/', (req, res) =>{
   
//     //request required data from body
//    const {id, name, age, email, city, country} = req.body;

//    //check if all the required data is present or not
//    if(!id || !name || !age || !email || !city || !country){

//     return res.status(400).json({
//         success: false,
//         message: "please insert required information"
//      });
//    }

//    //check if user already exists or not
//    const user =  users.find((each)=> each.id === id)

//    //if user already exists then send error response
//    if(user){

//     return res.status(409).json({
//         success: false,
//         message: `user already exists with ${id}`
//     });
// }


// //if user does not exists then add user to the users array
//   users.push({id, name, age, email, city, country})


// //send success response
//   res.status(200).json({
//     success: true,
//     message: `user added successfully ${id}`,
//     data: users
//   });
// })

routes.post('/', addNewUser)


/** 
*route: /:id
*method: pUT
*discription: to update user by its id
*access: public
*parameters: id
*/
// routes.put('/:id', (req, res)=> {
//     const {id} = req.params;
//     const data = req.body;

//     const user = users.find((each)=> each.id === id);

//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `user not found ${id}`
//         })
//     }


// //update user with spread operator
//     const updateUser = users.map((each)=> {
//         if(each.id === id){
//             return{
//                 ...each,
//                 ...data,
//             }
//         }
//         return each;
//     })

//     //send success response
//     res.status(200).json({
//         success: true,
//         message: `user updated successfully ${id}`,
//         data: updateUser
//     })
// })

routes.put('/:id', updateUserById)

/** 
*route: /:id
*method: DELETE
*discription: to delete user by its id
*access: public
*parameters: id
*/
// routes.delete('/:id', (req, res)=> {
//     const {id} = req.params;

//     const user = users.find((each)=> each.id === id);

//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `user not found ${id}`
//         })
//     }

//     //remove user from the users array
//     const updatedUsers = users.filter((each)=> each.id !== id);

//     //send success response
//     res.status(200).json({
//         success: true,
//         message: `user deleted successfully ${id}`,
//         data: updatedUsers
//     })
// })

routes.delete('/:id', deleteUserById)


/**
 * route: /subscription-details/:id
 * method: GET
 * description: to get subscription details of a specific user
 * access: public
 * parameters: id
 */
// routes.get('/subscription-details/:id', (req, res) => {
//     const { id } = req.params;

//     const user = users.find((each) => each.id === id);

//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: `user not found ${id}`
//         });
//     }

//     //extract subscription deteils from user object
//     const getDateInDays = (data = "") => {
//         let date;
//         if(data){
//             date=new Date(data);
//         }else{
//             date=new Date();
//         }
//        let days= Math.floor(date.getTime()/(1000*60*60*24));
//        return days;
//     }

//     const subscriptionType = (date) => {
//         if(user.subscriptionType === "Basic"){
//             date= date + 90;
//         }else if(user.subscriptionType === "Standard"){
//             date= date + 180;
//         }else if(user.subscriptionType === "Premium"){
//             date= date + 365;
//         }
//         return date;
//     }

//     //subscriotion expiration date
//     //date jan 1, 1970 UTC
//     const returnDate = getDateInDays(user.returnDate);
//     const currentDate = getDateInDays();
//     const subscriptionDate = getDateInDays(user.subscriptionDate);
//     const subscriptionExpiration = subscriptionType(subscriptionDate);

//     const data = {
//         ...user,
//         subscriptionExpired: subscriptionExpiration < currentDate,
//         subscriptionDaysLeft: subscriptionExpiration-currentDate,
//         daysLeftFOrExpiration: returnDate-currentDate,
//         returnDate: returnDate < currentDate ? "book is overDue" :returnDate,
//         fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
    
//     }



//     res.status(200).json({
//         success: true,
//         message: "subscription details found",
//         data: data
//     })
// })

routes.get('/subscription-details/:id', getSubscriptionDetails)


module.exports = routes;