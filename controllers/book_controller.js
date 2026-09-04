const {userModel, bookModel} = require('../model/index')

const DTO = require('../DTO/book_DTO.js')

exports.getAllBooks = async(req, res) => {
    const books = await bookModel.find();

    if(books.length === 0) {
      return  res.status(404).json({
            success: false,
            message: "book not found"
        })
    }

    res.status(200).json({
        success: true,
        data: books

    })
}

exports.getSingleBookById = async(req, res) => {
    const {id} = req.params;
    const book = await bookModel.findById(id);

    if(!book) {
        res.status(404).json({
            success: false,
            message: `book with id ${id} does not exist`
        })
    }

    res.status(200).json({
        success: true,
        data: book
    })
}


exports.getIssuedBooks = async(req, res) => {
    const user = await userModel.find({
        issuedBook: {$exists: true}
    }).populate('issuedBook');

    const issuedBook = user.map((each) => {
        return new DTO.IssuedBook(each);
    });
    
    if(issuedBook.length === 0) {
        return res.status(404).json({
            success: false,
            message: "no issued books found"
        })
    }

    res.status(200).json({
        success: true,
        data: issuedBook
    });
}


exports.addNewBook = async(req, res) => {
    const {data} = req.body;

    if(!data) {
        return res.status(400).json({
            success: false,
            message: "please insert required information"
        })
    }

    await bookModel.create(data)

    const allBooks = await bookModel.find();

    res.status(200).json({
        success: true,
        message: "book added successfully",
        data: allBooks
    })
}

exports.updateBookById = async(req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    const book = await bookModel.findById(id);

    if(!book) {
        return res.status(404).json({
            success: false,
            messagge: `book not exist with id:${id}`
        })
    }

    await bookModel.findByIdAndUpdate(id, data, { new: true });

    const allBooks = await bookModel.find();

    res.status(200).json({
        success: true,
        data: allBooks
    })
}

exports.deleteBookById = async(req, res) => {
    const {id} = req.params;
    const book = await bookModel.findById(id);

    if(!book) {
        return res.status(404).json({
            success: false,
            message: `book not exist with id:${id}`
        })
    }

    await bookModel.findByIdAndDelete(id);

    const allBooks = await bookModel.find();

    res.status(200).json({
        success: true,
        data: allBooks
    })
}

