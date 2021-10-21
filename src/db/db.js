const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Teacher = require('../models/Teacher')
const Student = require('../models/Student')
const Quiz = require('../models/Quiz')
const Question = require('../models/Question')
const Result = require('../models/Result')
const {UserInputError} = require('apollo-server')

function hashFnv32a(str, asString, ) {
    /*jshint bitwise:false */
    var i, l,
        hval =  0x811c9dc5 ;

    for (i = 0, l = str.length; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    if( asString ){
        // Convert to 8 digit hex string
        return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
    }
    return hval >>> 0;
}


function generateToken(res){
    return jwt.sign({
        id:res.id,
        name:res.name,
        account:res.account,
        type:res.type
    },"lamgicokey",{expiresIn:'1h'});
}

const queryDB ={
    getQuiz: async args => await Quiz.findOne({"code":args}),
    takeTest: async quiz_code => await Question.find({"quiz_code":quiz_code}),
    // getProductById: async id => await Product.findById(id),
    // searhProduct: async name => await Product.find({$text: {$search : name}}),
    
    getAllTeachers: async (condition=null)=>
        condition===null? await Teacher.find() : await Teacher.find(condition),
    teacherLogin : async args => {
         const user=await Teacher.findOne({"account":args.account,"password":args.password});
        if(!user){
            throw new UserInputError('Sai thông tin tài khoản')
        }
        const token = generateToken(user)

        return {
            ...user._doc,
            id:user._id,
            token

        }


        },
    studentLogin : async args =>  {
        const user=await Student.findOne({"account":args.account,"password":args.password});
       if(!user){
           throw new UserInputError('Sai thông tin tài khoản')
       }
       const token = generateToken(user)

       return {
           ...user._doc,
           id:user._id,
           token

       }


       },

    newTeacher: async args => {
        args.createdAt=new Date().toISOString();
        args.type=0;
        const newTeacher = new Teacher(args)
        const res= await newTeacher.save() 
        const token = generateToken(res)

        return {
            ...res._doc,
            id:res._id,
            token

        }
		
    },
    newStudent: async args => {
        args.createdAt=new Date().toISOString();
        args.type=1;
        const newStudent = new Student(args)
        const res= await newStudent.save() 
        const token = generateToken(res)

        return {
            ...res._doc,
            id:res._id,
            token

        }
    },
    creQuiz: async args => {
        let time= new Date().toISOString();
        args.code=hashFnv32a(args.teacher_id+args.teacher_id+args.teacher_id+time,1);
        
        const newQuiz = new Quiz(args)
		return await newQuiz.save() 
    },
    insertQuestion :async args => {
        const newQuestion = new Question(args)
		return await newQuestion.save() 
    },
    creResult:async args => {
        const rs=await Result.find({"student_id":args.student_id,"quiz_id":args.quiz_id});
        if(rs.length==0){
            const newResult = new Result(args)
		    return await newResult.save()
        }else{
            return "error"
        }
         
    },
    allResultForStudent: async student_id =>  await Result.find({"student_id":student_id})  ,
    allQuizForTeacher: async teacher_id =>  await Quiz.find({"teacher_id":teacher_id}),
    getQuizByResult: async id => await Quiz.findById(id),
    getStudent: async id => await Student.findById(id),
    resultByQuiz: async id => await Result.find({"quiz_id":id}),
}

module.exports = queryDB;

