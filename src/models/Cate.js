const db= require('mongoose');
const schema= db.Schema

const AuthorSchema = new schema({
    catId:{
        type: Number
    },
    catName:{
        type: String
    }
    
})

module.exports = db.model('cates',AuthorSchema)