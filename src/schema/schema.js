const {gql} = require('apollo-server-express')

const typeDefs =  gql`
type Teacher {
    id: ID
    account: String
    password: String 
    name: String
   token:String
   type:Int
    quizs: [Quiz]
    createdAt:String
}

type Student {
    id: ID
    type:Int
    account: String
    password: String 
    name: String
    token:String
    createdAt:String
}


type Quiz {
    id: ID
    teacher_id: String
    quiz_name: String 
    noq: Int
    time:Int
    code:String
    
}

type Question {
    id: ID
    quiz_code: String
    text: String 
    ans0:String
    ans1:String
    ans2:String
    ans3:String
    right: Int
}

type Result {
    id:ID
    student_id:String
    quiz_id:String
    score:Float
    quiz: Quiz
    student: Student
}



# ROOT TYPE
	type Query {
		teachers: [Teacher]
        getQuiz(code:String!):Quiz
        takeTest(quiz_code:String!):[Question]
        resultForStudent(student_id:String!): [Result]
        quizForTeacher(teacher_id:String!):[Quiz]
        resultByQuiz(quiz_id:String!): [Result]
        
		
	}

    type Mutation{
        addTeacher(account:String!,password:String!,name:String!): Teacher
        addStudent(account:String!,password:String!,name:String!):Student
        creQuiz(teacher_id:String!,quiz_name:String!,noq:Int!,time:Int!): Quiz
        insertQuestion(quiz_code:String!,text:String!,ans0:String!,ans1:String!,ans2:String!,ans3:String!,right:Int!):Question
        creResult(student_id:String!,quiz_id:String!,score:Float!):Result
        teacherLogin(account:String!,password:String!) : Teacher!
        studentLogin(account:String!,password:String!) : Student!
    }

   

`

module.exports = typeDefs