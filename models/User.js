const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {Schema}= mongoose;

const userSchema = new Schema({

    userName: {
        type: String,
        lowercase: true,
        required: true,        
    },
    email: {
        type: String,
        lowercase: true,
        required: true, 
        unique: true,
        index: {unique:true}       
    },
    password: {
        type: String,        
        required: true,        
    },
    tokenConfirm: {
        type: String,        
        default: null,        
    },
    cuentaConfirmada: {
        type: Boolean,        
        default: false,        
    },  
    rol: {
        type: String,        
                
    },  
    imagen:{
        type: String, 
        default: null,       
                
    }, 
    
});

userSchema.pre("save", async function(next){
    const user = this;
    if(!user.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
        next();

    } catch (error) {
        
        
        
        console.log(error);
        throw new Error ("Error al validar la contrasena");
        //validar si es que falla la encriptacion de la contrasena
        
        //console.log(error);
        next();
    }
        
        
});

userSchema.methods.comparePassword = async function(canditePassword){
    return await bcrypt.compare(canditePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);