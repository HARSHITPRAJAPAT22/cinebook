import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const options = { tls: true };

let client: MongoClient;
let clientPromise: Promise<MongoClient>;


// Extend the global object to include _mongoClientPromise
declare global {
   
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(MONGODB_URI, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise!;

export { clientPromise };