const { model, Schema } = require('mongoose');

const HotelSchema = new Schema ({
    
    name:String,
    catId:Number,
    price:String,
    img:String,
   

})

module.exports = model('products',HotelSchema)