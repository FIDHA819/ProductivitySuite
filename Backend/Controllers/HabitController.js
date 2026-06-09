const Habit = require("../models/Habit");

exports.createHabit = async(req,res)=>{
  try{

    const habit = await Habit.create(req.body);

    res.status(201).json(habit);

  }catch(error){
    res.status(500).json({message:error.message});
  }
};

exports.getHabits = async(req,res)=>{
  try{

    const habits = await Habit.find();

    res.json(habits);

  }catch(error){
    res.status(500).json({message:error.message});
  }
};

exports.deleteHabit = async(req,res)=>{
  try{

    await Habit.findByIdAndDelete(req.params.id);

    res.json({message:"Habit Deleted"});

  }catch(error){
    res.status(500).json({message:error.message});
  }
};

exports.updateHabit = async(req,res)=>{
  try{

    const updated = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );

    res.json(updated);

  }catch(error){
    res.status(500).json({message:error.message});
  }
};
exports.completeHabit = async(req,res)=>{
  try{

    const today = new Date().toISOString().split("T")[0];

    const habit = await Habit.findById(req.params.id);

    if(!habit.completedDates.includes(today)){
      habit.completedDates.push(today);
      await habit.save();
    }

    res.json(habit);

  }catch(error){
    res.status(500).json({message:error.message});
  }
};