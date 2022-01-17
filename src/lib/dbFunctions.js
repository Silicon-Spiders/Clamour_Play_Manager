import clientPromise from '$lib/mongodb-client';
import { ObjectID } from 'mongodb';
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

export async function getPlays() {
  let db = await connectDB();
  const playColl = await db.collection('plays');
  return await playColl.find({}).toArray();
}

export async function getEvaluators() {
  let db = await connectDB();
  const evalColl = await db.collection('evaluators');
  return await evalColl.find({}).toArray();
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