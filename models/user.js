import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});


//the Models object provided by mongoose library and stores all the models registered. 
// if it exists the it assigns that existing model to the user varialble .

//this prevernt redefining the model and ensures that existing is resued.


//if user does not exist it will call 'model' function from Mongoose to create a new model.


const User = models.User || model("User", UserSchema);

export default User;

    