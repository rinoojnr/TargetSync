
const PersonaltodosModel = require('../Models/personalTodos');
const PersonalSubtodosModel = require('../Models/personalSubTodos');
const User = require('../Models/user');

exports.home = (req,res) =>{
    res.json({success:true,page:'home'})
}


exports.getTodo = async(req,res) =>{
    try{
        let todoHeader = await PersonaltodosModel.find({userId: req.user._id}).select('title subtitle isCompleted expiredAt _id');
        res.json({todoHeader: todoHeader})
    }catch(err){
        res.status(400).json({sucess: false,status: "Todo fetching failed",message: err.message});
    }
}


exports.forPerson = async(req,res,next) =>{
    try{
        const {title,subtitle,expiredAt} = req.body;
        if(!title || !subtitle){
            throw new Error("Plese fill the detailes");
        }
        if(new Date(expiredAt)<new Date()){
            throw new Error("Plese provide proper date,Expired date must grater than currend date");
        }
        PersonaltodosModel.create({userId: req.user._id,title: title,subtitle: subtitle,isCompleted: false,createdAt: new Date(),expiredAt: new Date(expiredAt)})
        .then(()=>{
            User.findOne({_id: req.user._id})
            .then((userData)=>{
                userData.totaltasks+=1;
                return userData.save();
            })
            .then(()=>{
                res.status(200).json({sucess: true,status: "Created",message: "New todo created"});
            });
        })
        
    }catch(err){
        res.status(400).json({sucess: false,status: "Todo creation failed",message: err.message});
    }
    
}


exports.forPersonSubtodos = async(req,res) =>{
    try{
        const {personalId,todos} = req.body;
        PersonalSubtodosModel.create({personalId: personalId,isCompleted: false,todos: todos})
        .then(()=>{
            res.status(200).json({sucess: true,status: "Created",message: "New subtodo created"});
        })
    }catch(err){
        res.status(400).json({success: false,status: "Subtodo creation failed",message: err.message});
    }
}

exports.deleteTodos = async(req,res) =>{
    try{
        PersonaltodosModel.findOneAndDelete({_id: req.params.id})
        .then((deleteStatus)=>{
            if(deleteStatus.isCompleted){
                User.findById(req.user._id)
                .then((result)=>{
                    result.completed-=1;
                    result.totaltasks-=1;
                    return result.save();
                })
                .then(()=>{
                    res.status(200).json({success: true,status: "deleted",message: "The item is deleted"});
                })
            }else{
                User.findById(req.user._id)
                .then((result)=>{
                    result.totaltasks-=1;
                    return result.save();
                })
                .then(()=>{
                    res.status(200).json({success: true,status: "deleted",message: "The item is deleted"});
                })
            }
            
        })
        .catch((err)=>{
            res.status(401).json({success: false,staus: "not deleted",message: err.message})
        });
    }catch(err){
        res.status(401).json({success: false,staus: "not deleted",message: err.messagee})
    }      
}

exports.isCompleted =  (req,res) =>{
    try{
        PersonaltodosModel.updateOne({_id: req.params.id},{$set: {isCompleted: true}})
        .then(async(result)=>{
            if(result.modifiedCount === 0){
                throw new Error("The item already completed");
            }
            User.findOne({_id: req.user._id})
            .then((userData)=>{
                userData.completed+=1;
                return userData.save();
            })
            .then(()=>{
                res.status(200).json({success: true,staus: "updated", message: "Task is completed"});
            });
        })
        .catch((err)=>{
            res.status(400).json({success: false,status: "not updated",message: err.message});
        })
    }catch(err){
        res.status(400).json({success: false,status: "not updated",message: err.message});
    }
}


exports.buyPremium = (req,res) =>{
    User.findById({_id: req.user._id})
    .then((result)=>{
        if(!result.isPremium){
            result.isPremium = true;
            result.save();
        }else{
            throw new Error ("You are already a premium member");
        }
    })
    .catch((err)=>{
        res.status(401).json({success: false,message: err.message})
    })
}


