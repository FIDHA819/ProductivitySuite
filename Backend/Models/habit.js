const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
{
  name:{
    type:String,
    required:true
  },

  description:{
    type:String
  },

  category:{
    type:String,
    default:"General"
  },

  completedDates:[
    {
      type:String
    }
  ]
},
{
  timestamps:true
}
);

module.exports = mongoose.model("Habit",habitSchema);