import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
  } = process.env;

const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

let client;
let clientPromise;

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local')
}

if (!global._mongoClientPromise) {
    client = await new MongoClient(uri, options)
    global._mongoClientPromise = await client.connect();
}
clientPromise = global._mongoClientPromise

// client = new MongoClient(uri, options);
// clientPromise = async function() {client.connect()};

export default clientPromise