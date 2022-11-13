export const PORT = process.env.PORT || 8080;
export const STATIC_PATH = './client/views';

export const MONGODB_HOST = process.env.MONGODB_HOST || '127.0.0.1:27017';

const POSTGRES_HOST = process.env.POSTGRES_HOST || '127.0.0.1:5432';
const POSTGRES_DB = process.env.POSTGRES_DB || 'raptors';
const POSTGRES_USER = process.env.POSTGRES_USER || 'raptor';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'infrastructureCourse';

export const POSTGRESQL_CONNSTRING = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}/${POSTGRES_DB}`;
