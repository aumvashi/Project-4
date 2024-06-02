const { UserModel, BookModel } = require("../models");

exports.getAllUser = async(res,req) => {
    const users = await UserModel.find();

    if(users.length === 0){
        return res.status(404).json({
            success: false,
            message: "No Users Found :(",
        });
    }
    res.status(200).json({
        success: true,
        message: "Users Are As Follows:",
        data: users,
    });
};

exports.getSingleUserById = async(res,req) =>{
    const {id} = req.params;
    const user = await UserModel.findById({_id:id});
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found :(",
        });
    }
    return res.status(200).json({
        success: true,
        message: "User FOund",
        data: user,
    });
};

exports.deleteUser = async(res,req) =>{
    const {id} = req.params;
    const user = await UserModel.deleteOne({ _id: id });
    if (!user) {
        return res.status(404).json({
        success: false,
        message: "User Doesn't Exist !!",
     });
    }
    return res.status(200).json({ 
        success: true, 
        message: "Deleted User..", 
        data: users,
    });
};

exports.updateUserData = async(res,req) =>{
    const { id } = req.params;
    const { data } = req.body;
    const updatedUserDate = await UserModel.findOneAndUpdate({ _id: id },
      {
        $set: {
          ...data,
        },
      },
      { 
        new: true 
      }
    );
    return res.status(200).json({
      success: true,
      message: "User Updated !!",
      data: updatedUserDate,
    });
};