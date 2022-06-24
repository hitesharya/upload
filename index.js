const express = require('express');
let user_data = require('./MOCK_DATA.json');
let author = require('./author.json');


const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  buildSchema
} = require('graphql');
const {graphqlHTTP,getGraphQLParams} = require('express-graphql')

// const UserType = new GraphQLObjectType({
//   name:'users',
//   fields:()=>( {
//     id:{type: GraphQLInt},
//     first_name:{type:GraphQLString},
//     last_name:{type:GraphQLString},
//     freinds:{type:GraphQLList(UserType)},
//   })
 
// })

// const authorType = new GraphQLObjectType({
//   name:'author',
//   fields:()=>( {
//     id:{type: GraphQLInt},
//    name:{type:GraphQLString},
//    users:{type:GraphQLList(UserType)}
//   })
 
// })

// const RootQuery = new GraphQLObjectType({
//     name:'User',
//     fields:{
//       "get_user":{
//         type:GraphQLList(UserType),
      
//         resolve(parent,args,rootValue){
// //console.log(rootValue)
         
//           return(user_data)
         
//       },
//       },
//       "all_user":{
//         type:GraphQLList(UserType),
       
//         resolve(parent,args,rootValue){
// //console.log(rootValue)
         
//           return user_data;
         
//       },
//       },

//       "author":{
//         type:GraphQLList(authorType),
       
       
//         resolve(parent,args,rootValue){
// //console.log(rootValue)
// //return user_data.filter((post) => post.id === args.id);
//          return author;
         
//       },
//       "auth":{
//         type:GraphQLList(UserType),
//         args:{id:{type:GraphQLID}},
//         resolve(parent,args,rootValue){
// //return user_data.filter((post) => post.id === args.id);
// return user_data;

//         }


//       }
//       },
      
//        },
      
    
    
// })

// const schema = new GraphQLSchema({
//  'query':RootQuery
// });
//new apsrt in buildschema 
let schema = new buildSchema(
  
 `type Hello{
  id:ID,
  first_name: String,
  last_name: String,
  email: String,
  plan:plan
  
 }

 type plan{
  id:ID,
  first_name: String,
  last_name: String,
  email: String,
  
  
 }


 type Query{
  hello(first:Int) : [Hello]
 }
 
 
 `
)

var root = {hello :({first},context)=> {
  console.log(first);
  return user_data.slice(0,first);
},
Hello:{
plan :()=> {
 

  return user_data[0]
},
}

}

const app = express();

app.use(express.json());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue:root
    // context: ({request})=>{
    //   console.log("fhfhfh")
    //   console.log(request.body);
    //   return {};
    // }

  }));

app.listen(4000, () =>{
  console.log('Now browse to http://localhost:4000/graphql');}
)  