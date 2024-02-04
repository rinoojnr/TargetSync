const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../Models/user');

const authentication = (userId) =>{
    return jwt.sign({userId: userId},"strongpassword");
}

exports.signUp = async(req,res,next) =>{
    try{
        const {username,useremail,userphone,userpassword,confirmpassword} = req.body;

        if(userpassword != confirmpassword){
            throw new Error("Password miss match");
        }

        if(!username || !userpassword || !userphone){
            throw new Error("Please enter all the credentials");
        }
        if(JSON.stringify(userphone).length != 10){
            throw new Error("Incorrect phone number");
        }
        if(userpassword.length<8){
            throw new Error("Password must contain 8 characters");
        }

        // const saltRounds = 10;
        // bcrypt.genSalt(saltRounds,(err,salt) =>{
        //     let hash;
        //     bcrypt.hash(userpassword,salt,(err,hashPassword) =>{
        //         hash = hashPassword;
        //     })
        // });

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(userpassword,saltRounds);
        
        userModel.create({username: username,useremail: useremail,userphone: userphone,userpassword: hashPassword})
        .then(()=>{
            res.status(200).json({success: true,status: "User singed successfully"}); 
        })
        .catch((err)=>{
            res.status(500).json({ success: false, status: "User creation failed", message: "User already exist" });
        })
        
        
    }catch(err){
        res.status(400).json({success: false,status: "user signup failed",message: err.message});
    }
}

exports.login = (req,res) =>{
    try{
        const {useremail,userpassword} = req.body;
        if(!useremail || !userpassword){
            throw new Error("Please provide all credentials");
        }
        userModel.findOne({useremail: useremail})
        .then((userData)=>{
            if(userData === null){
                res.status(401).json({success: false,message: "User not found"});
            }else{
               bcrypt.compare(userpassword,userData.userpassword)
               .then((result)=>{
                    if(result == false){
                        res.status(401).json({success: false,message: "User password incorrect"});
                    }else{
                        res.status(200).json({success: true,message: "User loggedIn successfully",token: authentication(userData._id)});
                    }
               })

            }
        })
    }catch(err){
        res.status(400).json({success: false,status: "User loging failed", message: err.message});
    }
    
}