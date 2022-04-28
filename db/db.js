import 'dotenv/config'
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME,      //Название БД
    process.env.DB_USER,      //Имя пользователя
    process.env.DB_PASSWORD,  //Пароль пользователя
    {
        dialect: "postgres",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
);

export default sequelize;