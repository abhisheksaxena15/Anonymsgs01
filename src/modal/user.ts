import mongoose,{Schema, Document} from "mongoose";

export interface message extends Document {
    content : string;
    createdAt: Date;
}

const MessageSchema : Schema<message>  = new Schema({
    content : {
        type : String,
        required : true
    },

    createdAt : {
        type : Date,
        required : true,
        default : Date.now
    }
})

export interface User extends Document {
    username : string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry:Date;
    isVerified: boolean;
    isAccepingMessages: boolean;
    messages: message[];
}


const UserSchema : Schema<User>  = new Schema({
    username : {
        type : String,
        required : true,
        trim: true,
        unique: true
    },

    email: {
        type : String,
        required : true,
        unique: true,
        match : [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character' ],
   
    password: {
        type : String,
        required : [true , " Password is required"],
    },
    verifyCode: {
        type : String,
        required : [true , " Verify Code is required"],
    },
    verifyCodeExpiry: {
        type : Date,
        required : [true , " Verify CodeExpiry is required"],
    },
    isVerified: {
        type : Boolean,
        default : false
    },
    isAccepingMessages: {
        type : Boolean,
        default : true
    },
    messages:[MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>('User', UserSchema));

export default UserModel;