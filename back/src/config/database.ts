import { Sequelize } from 'sequelize';

const base = new Sequelize('Formulario', 'postgres', 'admin', {
    dialect: 'postgres',
    host: 'localhost',
    logging: false
});

export default base;
