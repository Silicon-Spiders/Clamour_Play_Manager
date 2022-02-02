import clientPromise from '$lib/mongodb-client';
import { ObjectId } from 'mongodb';

async function connectDB() {
  const dbConnection = await clientPromise;
  const db = await dbConnection.db("Clamour");
  return db;
}

function toMongoObject(array) {
  let objects = [];

  array.forEach(string => {
    objects.push(ObjectId(string));
  });

  return objects;
}

export async function addPlay(playData) {
  let db = await connectDB();
  const playColl = await db.collection('plays');
  return await playColl.insertOne(playData);
}

export async function getPlays() {
  let db = await connectDB();
  const playColl = await db.collection('plays');
  return await playColl.find({}).toArray();
}

export async function addAuthor(authorData) {
  let db = await connectDB();
  const authorColl = await db.collection('authors');
  return await authorColl.insertOne(authorData);
}

export async function getAuthorFromEmail(email) {
  let db = await connectDB();
  const authorColl = await db.collection('authors');
  return await authorColl.findOne({ homeEmail: email });
}

export async function getAuthorFromID(id) {
  let db = await connectDB();
  const authorColl = await db.collection('authors');
  return await authorColl.findOne({ _id: ObjectId(id) });
}

export async function addEvaluator(evaluator) {
  let db = await connectDB();
  const evalColl = await db.collection('evaluators');
  return await evalColl.insertOne({evaluator});
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
  const evalColl = await db.collection('evaluators');
  let data = {
    lname: evalData.lname,
    fname: evalData.fname,
    phone: evalData.phone,
    email: evalData.email,
    username: evalData.username,
    password: evalData.password,
  }
  return await evalColl.updateOne({ _id: ObjectID(evaluatorData.id) }, { $set: { data }});
}

export async function getPlayLocation(id) {
  let db = await connectDB();
  const playColl = await db.collection('plays');
  return await playColl.findOne({ _id: ObjectId(id) }, { projection: { filename: 1 }})
}

export async function getEvaluators() {
  let db = await connectDB();
  const evalColl = await db.collection('evaluators');
  return await evalColl.find({}).toArray();
}

export async function getEvaluatorId(username, password) {
  let db = await connectDB();
  const evalColl = await db.collection('evaluators');
  return await evalColl.findOne({ username, password });
}

export async function getAdmin(username, password) {
  let db = await connectDB();
  const adminColl = await db.collection('admin');
  let data = await adminColl.findOne({ username, password });
  if (data == null) {
    if (await adminColl.findOne({ username, password }) == null) {
      await adminColl.insertOne({ username: "admin", password: "pass"});
    }
  }
  return data;
}

export async function getEvaluatorsSanitized() {
  let db = await connectDB();
  const evalColl = await db.collection('evaluators');
  return await evalColl.find({}, { projection: { _id: 1, firstName: 1, lastName: 1, email: 1, plays:1}}).toArray();
}

export async function assignPlays(array) {
  let db = await connectDB();
  const evalColl = await db.collection('evaluators');
  const evalid = toMongoObject(array.evaluators);

  let evals = await evalColl.find({ _id:{ $in:evalid } }, { projection: { _id: 1, plays:1}}).toArray();

  evals.forEach(async evaluator => {
    array.plays.forEach(id => {
      evaluator.plays[id] = "unf";
    });

    await evalColl.updateOne({ _id: evaluator._id }, { $set: { plays: evaluator.plays }}, { upsert: true });
  });
  return;
}