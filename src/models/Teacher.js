const { model, Schema } = require('mongoose');

const Teacher = new Schema ({
    
    account:String,
   type:Number,
    password:String,
    name:String,
    createdAt:String,
    
   

})

module.exports = model('teachers',Teacher)