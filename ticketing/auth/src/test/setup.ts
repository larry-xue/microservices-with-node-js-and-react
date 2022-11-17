import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { mongo } from 'mongoose';
import { app } from '../app';

let mongo: any;
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  collections.forEach(async (c) => await c.deleteMany({}));
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
