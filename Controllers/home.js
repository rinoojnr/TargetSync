
const PersonaltodosModel = require('../Models/personalTodos');
const PersonalSubtodosModel = require('../Models/personalSubTodos');

exports.home = (req,res) =>{
    res.json({success:true,page:'home'})
}
exports.getTodo = async(req,res) =>{
    try{
        console.log(req.user)
        const todoHeader = await PersonaltodosModel.find({userId: req.user._id}).select('title subtitle expiredAt -_id');
        console.log(todoHeader)
        res.json(todoHeader)
    }catch(err){
        res.status(400).json({sucess: false,status: "Todo fetching failed",message: err.message});
    }
}
exports.forPerson = async(req,res,next) =>{
    try{
        const {title,subtitle,expiredAt} = req.body;
        if(!title || !subtitle){
            throw new Error("Plese fill the detailes")
        }
        PersonaltodosModel.create({userId: req.user._id,title: title,subtitle: subtitle,createdAt: new Date(),expiredAt: new Date(expiredAt)})
        .then(()=>{
            res.status(200).json({sucess: true,status: "Created",message: "New todo created"});
        })
        
    }catch(err){
        res.status(400).json({sucess: false,status: "Todo creation failed",message: err.message});
    }
    
}

exports.forPersonSubtodos = async(req,res) =>{
    try{
        const {personalId,todos} = req.body;
        PersonalSubtodosModel.create({personalId: personalId,todos: todos})
        .then(()=>{
            res.status(200).json({sucess: true,status: "Created",message: "New subtodo created"});
        })
    }catch(err){
        res.status(400).json({success: false,status: "Subtodo creation failed",message: err.message});
    }
}
