const { model, Schema } = require('mongoose');

const Result = new Schema ({
    
    student_id: String,
   
    quiz_id:String,
    score:Number,
    

})

module.exports = model('results',Result)