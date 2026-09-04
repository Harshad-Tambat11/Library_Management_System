const {userModel, bookModel} = require('../model/index')

exports.getAllUsers = async(req, res) => {
    const allUsers = await userModel.find();

    if(!allUsers || allUsers.length === 0) {
        return res.status(404).json({
            success: false,
            message: "no users found"
        })
    }

     res.status(200).json({
        success: true,
        data: allUsers
    })
}

exports.getSingleUserById = async(req, res) => {
    const {id} = req.params;
    const user = await userModel.findById(id);

    if(!user) {
        return res.status(404).json({
            success: false,
            message: "user not found"
        })
    }

    res.status(200).json({
        success: true,
        data: user
    })
}

exports.addNewUser = async(req, res) => {
    const {data} = req.body;
    if(!data) {
        return res.status(400).json({
            success: false,
            message: "data is required"
        })
    }

    const newUser = await userModel.create(data);

    res.status(201).json({
        success: true,
        data: newUser
    })
}

exports.updateUserById = async(req,res) => {
    const {id} = req.params;
    const {data} = req.body;
    const user = await userModel.findById(id);

    if(!user) {
        return res.status(404).json({
            success: false,
            message: `user with id ${id} does not exist`
        })
    }

    if(!data) {
        return res.status(400).json({
            success: false,
            message: "data is required"
        })
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, data, {new: true});

    

    res.status(200).json({
        success: true,
        data: updatedUser,
        message: "user updated successfully"
    })
}

exports.deleteUserById = async(req, res) => {
    const {id} = req.params;
    const user = await userModel.findById(id);

    if(!user) {
        return res.status(404).json({
            success: false,
            message:`user not found with id:${id}`
        })
    }

    await userModel.findByIdAndDelete(id);

    const allUsers = await userModel.find();

    res.status(200).json({
        success: true,
        message: "user deleted successfully",
        data: allUsers
    })
}

exports.getSubscriptionDetails = async(req, res) => {
    const {id} = req.params;
    const user = await userModel.findById(id);  
    
    if(!user) {
        return res.status(404).json({
            success: false,
            message: `user not found with id:${id}`
        })
    }

    const getDateInDays = (data = "") => {
        let date;
        if(data) {
            date = new Date(data);
        } else {
            date = new Date();
        }
        return Math.floor((date - new Date(0)) / (1000 * 60 * 60 * 24));
    }

    const subscriptionType = (date) => {
        if(user.subscriptionType === "Basic") {
            return 90 + date;
        } else if(user.subscriptionType === "Standard") {
            return 180 + date;
        } else if(user.subscriptionType === "Premium") {
            return 365 + date;
        }
        return date;
    }

    const currentDate = getDateInDays();
    const subscriptionDate = getDateInDays(user.subscriptionDate);
    const subscriptionExpiration = subscriptionType(subscriptionDate);
    const returnDate = getDateInDays(user.returnDate);

    const data = {
        ...user.toObject(),
        subscriptionExpired: subscriptionExpiration < currentDate,
        subscriptionDaysLeft: subscriptionExpiration - currentDate,
        daysLeftForExpiration: returnDate - currentDate,
        returnDate: returnDate < currentDate ? "book is overdue" : returnDate,
        fine: returnDate < currentDate ? (subscriptionExpiration <= currentDate ? 200 : 100) : 0
    }
    res.status(200).json({
        success: true,
        data: data
    });
}
