import {user} from './models/user'
import 'reflect-metadata'
import {DataSource} from 'typeorm'
import { view } from './models/view';

export const AppDataSource = new DataSource(
    {
        type: "sqlite",
        database:'database.sqlite',
        synchronize: true,
        logging: true,
        entities: {user, view},
        migrations: [],
        subscribers: [],

    }
);



