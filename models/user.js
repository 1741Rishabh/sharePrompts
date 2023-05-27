import { Schema,model,models } from "mongoose";

const UserSchema = new Schema({
    email:{
        type:String,
        unique :[true,'Email already exists!'],
        required:[true,'Email is required! '],
    },
    Image:{
        type:String,
    },
    username:{
        type:String,
        required:[true,'Email is required! '],
    }
})

const User = models.User ||  model("User",UserSchema);

export default User 
// The "models" object is provided by the Mongoose Library and stores all the registered models.
//  If a model named "User" already exists in the "models" object, it assigns that existing model to the "User" variable.
//  This prevents redefining the model and ensures that the existing model is reused.
//  If a model named "User' does not exist in the "models" object, the "model" function from Mongoose is called to create a new model
// The newly created model is then assigned to the "User" variable.