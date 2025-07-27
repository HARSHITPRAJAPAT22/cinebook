import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI || 'mongodb://localhost:27017/';
export const DB_NAME = process.env.NEXT_PUBLIC_DB_NAME || 'cinebook';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Extend the global object to include _mongoClientPromise
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(MONGODB_URI);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise!;

export { clientPromise };