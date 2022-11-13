import { MONGODB_HOST } from '../../config';

export function getMongoConnectionOptions() {
  const host = MONGODB_HOST || '127.0.0.1:27017';
  const uri = `mongodb://${host}/raptors`;

  return { host, uri };
}
