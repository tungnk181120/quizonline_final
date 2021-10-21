const { model, Schema } = require('mongoose');

const Student = new Schema ({
    
    account:String,
    type:Number,
    password:String,
    name:String,
    createdAt:String,
    

})

module.exports = model('students',Student)