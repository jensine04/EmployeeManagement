import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy} from "typeorm-naming-strategies";
import Employee from "../entities/employee.entity";
import Address from "../entities/address.entity";
import 'dotenv/config'
import Department from "../entities/department.entity";

const datasource= new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5437,
    database: 'training',
    username: 'postgres',
    password: process.env.DB_PASSWORD,
    extra: {max: 5, min: 2},
    synchronize: false,
    logging: true,
    namingStrategy: new SnakeNamingStrategy,
    entities: [Employee, Address, Department],
    migrations: ["dist/db/migrations/*.js"]
})

export default datasource;