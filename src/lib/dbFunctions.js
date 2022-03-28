import clientPromise from "$lib/mongodb-client";
import { ObjectId } from "mongodb";

async function connectDB() {
  const dbConnection = await clientPromise;
  const db = await dbConnection.db("Clamour");
  return db;
}

function toMongoObject(array) {
  let objects = [];

  array.forEach((string) => {
    objects.push(ObjectId(string));
  });

  return objects;
}

export async function addPlay(playData) {
  let db = await connectDB();
  const playColl = await db.collection("plays");
  return await playColl.insertOne(playData);
}

export async function getPlays() {
  let db = await connectDB();
  const playColl = await db.collection("plays");
  return await playColl.find({}).toArray();
}

export async function addAuthor(authorData) {
  let db = await connectDB();
  const authorColl = await db.collection("authors");
  return await authorColl.insertOne(authorData);
}

export async function getAuthorFromEmail(email) {
  let db = await connectDB();
  const authorColl = await db.collection("authors");
  return await authorColl.findOne({ homeEmail: email });
}

export async function getAuthorFromID(id) {
  let db = await connectDB();
  const authorColl = await db.collection("authors");
  return await authorColl.findOne({ _id: ObjectId(id) });
}

export async function addEvaluator(evaluator) {
  let db = await connectDB();
  const evalColl = await db.collection("evaluators");
  return await evalColl.insertOne(evaluator);
}
/*
Evaluators:

evalData: {
  id: "",
  lname: "",
  fname: "",
  phone: "",
  email: "",
  username: "",
  password: "",
}
*/

export async function updateEvaluator(evalData) {
  let db = await connectDB();
  const evalColl = await db.collection("evaluators");
  let data = {
    id: evalData.id,
    lastName: evalData.lastName,
    firstName: evalData.firstName,
    phone: evalData.phone,
    email: evalData.email,
    username: evalData.username,
    password: evalData.password,
  };
  console.log("dubfunc", evalData);
  return await evalColl.updateOne({ _id: ObjectId(data.id) }, { $set: data });
}

export async function getPlayLocation(id) {
  let db = await connectDB();
  const playColl = await db.collection('plays');
  return await playColl.findOne({ _id: ObjectId(id) }, { projection: { gDrive: 1 }})
}

export async function getEvaluators() {
  let db = await connectDB();
  const evalColl = await db.collection("evaluators");
  return await evalColl.find({}).toArray();
}

export async function getEvaluatorId(username, password) {
  let db = await connectDB();
  const evalColl = await db.collection("evaluators");
  return await evalColl.findOne({ username, password });
}

export async function getAdmin(username, password) {
  let db = await connectDB();
  const adminColl = await db.collection("admin");
  let data = await adminColl.findOne({ username, password });
  if (data == null) {
    if ((await adminColl.findOne({ username, password })) == null) {
      await adminColl.insertOne({ username: "admin", password: "pass" });
    }
  }
  return data;
}

export async function getEvaluatorsSanitized() {
  let db = await connectDB();
  const evalColl = await db.collection("evaluators");
  return await evalColl
    .find({}, { projection: { _id: 1, firstName: 1, lastName: 1, email: 1, plays: 1 } })
    .toArray();
}

export async function assignPlays(array) {
  let db = await connectDB();
  const evalColl = await db.collection("evaluators");
  const evalid = toMongoObject(array.evaluators);

  let evals = await evalColl.find({ _id: { $in: evalid } }, { projection: { _id: 1, plays: 1 } }).toArray();

  evals.forEach(async (evaluator) => {
    array.plays.forEach((id) => {
      evaluator.plays[id] = "unf";
    });

    await evalColl.updateOne({ _id: evaluator._id }, { $set: { plays: evaluator.plays } }, { upsert: true });
  });
  return;
}



export async function insertEvaluation(evaluation) {

  let db = await connectDB();
  // console.log(db);
  let insertEvaluation = await db.collection("evaluations").insertOne(evaluation);
  
  return;
};

export async function getEvaluations() {

  let db = await connectDB();
  let evaluations = await db.collection("evaluations").find({}).toArray();
  // console.log(evaluations);

  return evaluations;
};

export async function getPlaysAssigned(username) {
  
  let db = await connectDB();
  let playsAssigned = await db.collection("evaluators").find({username: username} , {projection: {plays: 1, _id: 0} }).toArray();


  // console.log(`obj keys is outputting --> ${Object.keys(playsAssigned[0].plays)}`);

  const keyIDs = JSON.stringify( Object.keys(playsAssigned[0].plays) );

  const keysArray = keyIDs.split(',');
  
  // console.log(`The values in the keysArray is: ${keysArray}`);
  

  let gettingPlaysByID = await findPlaysByID(Object.keys(playsAssigned[0].plays));

  return gettingPlaysByID;
}

export async function findPlaysByID(playIDs) {

  let db = await connectDB();

  let mongoObjIDs = toMongoObject(playIDs);
  
  
  // console.log(`The playIDS in the func being called is -----> ${playIDs}`);
  let plays = await db.collection("plays").find({_id: { $in: mongoObjIDs } } ).toArray(); //remove toArray?  

  return plays;
}

// export async function findPlaysByAuthorID(authorID) {

//   let db = await connectDB();

//   let plays = await db.collection("plays").find({authorID: ObjectId(authorID)}).toArray();

//   console.log(`This is findPlaysByAuthorID ,and this is the result of query --> ${plays}`);

//   return plays;
// }

export async function getPlayByID(playID) {

  console.log(`playID in getPlayID is ---> ${playID}`);
  if (playID && playID != 'null' && playID != null && playID != undefined && playID != 'undefined') {
    // console.log('My ID: ', id);
    let db = await connectDB();
    //you have to get the evaluator logged in, in order to get the plays assigned to them
    const playColl = await db.collection('plays').findOne({ _id: ObjectId(playID) } , {projection: {title: 1 , _id: 0} });
   
    console.log(`getPlayByID is returning this ---> ${JSON.stringify(playColl.title)}`);
    const playTitle = JSON.stringify(playColl.title);
    console.log(`Trying to remove quotes it so it looks like ---> ${playTitle.replace(/['"]+/g, '')}`);
    // return playTitle; 
    return playTitle.replace(/['"]+/g, '');
  }
}

export async function deletePlayAssigned(req) {

  // const id = req.query.get('id');    //this is getting the url and extracting the url's id
  if (id && id != 'null' && id != null && id != undefined && id != 'undefined') {

  let db = await connectDB();
  let assignPlaysColl = await db.collection('plays-assigned').deleteOne({ _id: ObjectId(id)});;

  console.log('HEY IM IN dbFunctions with an ID of: ' + id);

  return;
  }
}

export async function updatePlayAssigned(req) {

  // const id = req.query.get('id');    //this is getting the url and extracting the url's id
  if (id && id != 'null' && id != null && id != undefined && id != 'undefined') {

  let db = await connectDB();
  // This will be change so it could query in evaluator/plays and change them from unf to f after EVALUATION is submitted. Wrote this on 3/26/22.
  let playAssigned = await db.collection('plays-assigned').updateOne({_id: ObjectId(id)} , {$set: {status:'completed'} });

  return;
  }

}
