import { ConnectionOptions } from 'typeorm';
import { OkWoman } from './model';

function getEnv(key: string): string {
    const value = process.env[key];

    if (typeof value === 'undefined') {
        throw new Error(`Environment variable \`${key}\` not set`);
    } else {
        return value;
    }
}

export const config: ConnectionOptions = {
    type: 'mysql',
    charset: 'utf8mb4',
    host: getEnv('MYSQL_HOST'),
    port: Number.parseInt(getEnv('MYSQL_PORT') || '', 10),
    username: getEnv('MYSQL_USER'),
    password: getEnv('MYSQL_PASSWORD'),
    database: getEnv('MYSQL_DATABASE'),
    entities: [
        OkWoman
    ],
    synchronize: true,
    logging: process.env.NODE_ENV === 'development' ? 'all' : ['error', 'warn', 'schema'],
}
