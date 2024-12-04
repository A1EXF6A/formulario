import { DataTypes, Model } from 'sequelize';
import base from '../config/database.ts';

class RespuestaCambio extends Model {
    id_dec!: number;
    solicitud_id!: number;
    decision!: string;
    fecha_decision!: Date;
}

RespuestaCambio.init(
    {
        id_dec: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        solicitud_id: {
            type: DataTypes.INTEGER
        },
        decision: {
            type: DataTypes.ENUM('aceptar', 'rechazar'),
            allowNull: false,
        },
        fecha_decision: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize: base,
        tableName: 'SOLICITUDES_DECISION',
        schema: 'public',
        timestamps: false,
    }
);

export default RespuestaCambio;


