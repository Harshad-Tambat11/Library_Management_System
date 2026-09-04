const express = require('express')

const {books} = require('../data/books.json')

const {users} = require('../data/users.json')

const {userModel, bookModel} = require('../model/index.js');
const { getAllBooks, getSingleBookById, getIssuedBooks, addNewBook, updateBookById, deleteBookById} = require('../controllers/book_controller.js');

const routes = express.Router();


/** 
*route: /
*method: GET
*discription: to get all the books
*access: public
*parameters: none
*/
// routes.get('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: books
//     });
// })

routes.get('/', getAllBooks )

/** 
*route: /:id
*method: GET
*discription: to get a specific book by its ID
*access: public
*parameters: id
*/
// routes.get('/:id', (req, res) => {
//     const {id} = req.params;
//     const book = books.find((each) => each.id === id);

//     if (!book) {
//         return res.status(404).json({
//             success: false,
//             message: `book not found ${id}`
//         });
//     }

//     res.status(200).json({
//         success: true,
//         data: book
//     });
// });

routes.get('/:id', getSingleBookById )

/** 
*route: /
*method: POST
*discription: to add a new book
*access: public
*parameters: none
*/

//     const {id, title, author, genre, price, publisher} = req.body;

//     if (!id || !title || !author || !genre || !price || !publisher) {
//         return res.status(400).json({
//             success: false,
//             message: "please insert required information"
//         });
//     }

//     const book = books.find((each) => each.id === id);

//     if (book) {
//         return res.status(409).json({
//             success: false,
//             message: `book already exists with ${id}`
//         });
//     }

//     books.push({id, title, author, genre, price, publisher});

//     res.status(200).json({
//         success: true,
//         message: `book added successfully ${id}`,
//         data: books
//     });// routes.post('/', (req, res) => {
// });
routes.post('/', addNewBook )


/** 
*route: /
*method: PUT
*discription: to update a specific book
*access: public
*parameters: id
*/
// routes.put('/:id', (req, res) => {
//     const {id} = req.params;
//     const data = req.body;

//     const book = books.find((each) => each.id === id);

//     if (!book) {
//         return res.status(404).json({
//             success: false,
//             message: `book not found ${id}`
//         });
//     }

//     const updatedBook = {...book, ...data};

//     // Update the book in the books array
//     const updatedBooks = books.map((each) => (each.id === id ? updatedBook : each));

//     res.status(200).json({
//         success: true,
//         message: `book updated successfully ${id}`,
//         data: updatedBooks
//     });
// });


routes.put('/:id', updateBookById)

/** 
*route: /
*method: DELETE
*discription: to delete a specific book
*access: public
*parameters: id
*/
// routes.delete('/:id', (req, res) => {
//     const {id} = req.params;

//     const book = books.find((each) => each.id === id);

//     if (!book) {
//         return res.status(404).json({
//             success: false,
//             message: `book not found ${id}`
//         });
//     }

//     const updatedBooks = books.filter((each) => each.id !== id);

//     res.status(200).json({
//         success: true,
//         message: `book deleted successfully ${id}`,
//         data: updatedBooks
//     });
// });

routes.delete('/:id', deleteBookById)

/** 
*route: /issuedBooks/for-user
*method: GET
*discription: to get all the issued books for a specific user
*access: public
*parameters: none
*/
// routes.get('/issuedBooks/for-user', (req, res) => {
//     const userWithIssuedBook = users.filter((each)=> {
//         if(each.issuedBook){
//             return each;
//         }
//     })

//     const issuedBook = [];

//     userWithIssuedBook.forEach((each)=>{
//         const book = books.find((book)=> book.id === each.issuedBook);

//         book.issuedBy = each.name;
//         book.issuedDate = each.issuedDate;
//         book.returnDate = each.returnDate;

//         issuedBook.push(book);
//     })

//     if(!issuedBook.length === 0){
//         return res.status(404).json({
//             success: false,
//             message: "no issued books found"
//         })
//     }

//     res.status(200).json({
//         success: true,
//         message: "list of issued books",
//         data: issuedBook
//     })
// })

routes.get('/issuedBooks/for-user', getIssuedBooks )

 


module.exports = routes;



    