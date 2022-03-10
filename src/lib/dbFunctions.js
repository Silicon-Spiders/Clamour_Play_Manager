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

  try {
    let db = await connectDB();
    let insertEvaluation = await db.collection("evaluations").insertOne(evaluation);
    
    return 1;

  }catch {

    return 0;
  }
};

export async function getEvaluations(username) {

  let db = await connectDB();
  let evaluations = await db.collection("evaluations").find({evaluatorUsername : username}).toArray();

  return evaluations;
};

export async function getPlaysAssigned(username) {
  
  let db = await connectDB();
  let playsAssigned = await db.collection("evaluators").find({username} , {projection: {plays: 1, _id: 0} }).toArray();
  
  let playsAry = playsAssigned[0].plays;
  let unFinishedPlays = [];

  Object.keys(playsAry).forEach(play => {
    if (playsAry[play] == "unf") {
      //play variable is what you NEED!
      unFinishedPlays.push(play);
    }
  });
  

  const keyIDs = JSON.stringify( Object.keys(playsAssigned[0].plays) );
  
  const keysArray = keyIDs.split(',');
  const Ids = Object.keys(playsAssigned[0].plays);
  
  let gettingPlaysByID = await findPlaysByID(unFinishedPlays);

  return gettingPlaysByID;
}

export async function findPlaysByID(playIDs) {

  let db = await connectDB();

  let mongoObjIDs = toMongoObject(playIDs);
  
  
  let plays = await db.collection("plays").find({_id: { $in: mongoObjIDs } } ).toArray(); //remove toArray?  

  return plays;
}



export async function getPlayByID(playID) {

  if (playID && playID != 'null' && playID != null && playID != undefined && playID != 'undefined') {
    let db = await connectDB();
    //you have to get the evaluator logged in, in order to get the plays assigned to them
    const playColl = await db.collection('plays').findOne({ _id: ObjectId(playID) } , {projection: {title: 1 , _id: 0} });
   
    const playTitle = JSON.stringify(playColl.title);
    return playTitle.replace(/['"]+/g, '');
  }
}

export async function deletePlayAssigned(req) {

  // const id = req.query.get('id');    //this is getting the url and extracting the url's id
  if (id && id != 'null' && id != null && id != undefined && id != 'undefined') {

  let db = await connectDB();
  let assignPlaysColl = await db.collection('plays-assigned').deleteOne({ _id: ObjectId(id)});;


  return;
  }
}

export async function updatePlayAssigned(playID , username) {

  // const id = req.query.get('id');    //this is getting the url and extracting the url's id
  if (playID && playID != 'null' && playID != null && playID != undefined && playID != 'undefined') {

  let db = await connectDB();
  // This will be change so it could query in evaluator/plays and change them from unf to f after EVALUATION is submitted. Wrote this on 3/26/22.
  //To update, you first need the evaluatorID
  let path = 'plays.' + playID;
  let playAssigned = await db.collection('evaluators').updateOne({username: username} , {$set: {[path]:'f'} });

  return;
  }
}
