const { model, Schema } = require('mongoose');

const Quiz = new Schema ({
    
    teacher_id: String,
    code:String,
    quiz_name:String,
    noq:Number,
    time:Number,
    

})

module.exports = model('quizs',Quiz)