


const resolvers = {
    Query:{
        teachers: async (parent, {args}, { q }) =>
                    await q.getAllTeachers(), 
        resultForStudent : async (parent, {student_id}, { q }) =>
                    await q.allResultForStudent(student_id),
        quizForTeacher : async (parent, {teacher_id}, { q }) =>
                    await q.allQuizForTeacher(teacher_id),
        resultByQuiz: async (parent, {quiz_id}, { q }) =>
                    await q.resultByQuiz(quiz_id),
        getQuiz: async (parent, {code}, { q }) =>
                await q.getQuiz(code),
        takeTest: async (parent, {quiz_code}, { q }) =>
                await q.takeTest(quiz_code),
    },
    
    Result:{
        student:async ({student_id}, args, { q }) => await q.getStudent(student_id),
        quiz: async ({quiz_id}, args, { q }) => await q.getQuizByResult(quiz_id),
    },

    

    
   
    Mutation:{
        addTeacher: async (parent, args, { q }) =>
                await q.newTeacher(args), 
        addStudent: async (parent, args, { q }) =>
                await q.newStudent(args),   
        creQuiz: async (parent, args, { q }) =>
                await q.creQuiz(args),  
        insertQuestion : async (parent, args, { q }) =>
                await q.insertQuestion(args),
        creResult : async (parent, args, { q }) =>
                await q.creResult(args),
        teacherLogin:  async (parent, args, { q }) => await q.teacherLogin(args), 
        studentLogin:  async (parent, args, { q }) => await q.studentLogin(args),                
    }
   

}

module.exports = resolvers