const { ApolloServer } = require("apollo-server");
require('dotenv').config()
const typeDefs =require('./schema/schema')
const resolvers = require('./resolver/resolver')
const mongoose = require('mongoose')
const q = require('./db/db')
var fs = require('fs')
let cert=  fs.readFileSync(__dirname + "/cert.pem")
const connectDB= async ()=>{
  try { 
      await mongoose.connect("mongodb://admin:Quizonline12345@dbaas253.hyperp-dbaas.cloud.ibm.com:30540,dbaas254.hyperp-dbaas.cloud.ibm.com:30472,dbaas255.hyperp-dbaas.cloud.ibm.com:30315/quizonlineDB?authSource=admin&replicaSet=qui",{
          
          ssl:true,
          sslCert: cert
      })
      
      console.log('Ok')
  } catch (error) {
      console.log(error.message)
      process.exit()
  }
}

connectDB()

const server = new ApolloServer({ 
  typeDefs,
    resolvers,
    context: () => ({ q })
});

server.listen({ port: process.env.PORT || 8080 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
