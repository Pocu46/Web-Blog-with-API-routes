import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    // required: [true, 'Email is required!'],
    // match: [/\S+@\S+\.\S+/, "Email should have '@' symbol"]
  },
  username: {
    type: String,
    unique: [true, 'Username already exists!'],
    required: [true, 'Username is required!'],
    match: [/^.{3,}$/, "Username invalid, it should contain at least 3 letters and be unique!"]
  },
  password: {
    type: String,
    // required: [true, 'Password is required!'],
  },
  image: {
    type: String
  }
});

const User = models.User || model("User", userSchema)

export default User;