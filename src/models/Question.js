const { model, Schema } = require('mongoose');

const Question = new Schema ({
    
    quiz_code:String,
    text:String,
    ans0:String,
    ans1:String,
    ans2:String,
    ans3:String,
    right:Number,

})

module.exports = model('questions',Question)