import { DataTypes, Model } from 'sequelize';
import base from '../config/database.ts';

class SolicitudCambio extends Model {
  id_sol!: number;
  tit_sol!: string;
  fec_sol!: Date;
  proy_sol!: string;
  solicitante!: string;
  dep_sol!: string;
  ema_sol!: string;
  tel_sol?: string;
  ger_sol?: string;
  tip_sol?: string;
  des_sol!: string;
  arc_sol?: string;
}

SolicitudCambio.init(
  {
    id_sol: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tit_sol: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fec_sol: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    proy_sol: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    solicitante: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dep_sol: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ema_sol: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tel_sol: {
      type: DataTypes.STRING(20),
    },
    ger_sol: {
      type: DataTypes.STRING(255),
    },
    tip_sol: {
      type: DataTypes.TEXT,
    },
    des_sol: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    arc_sol: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: base,
    tableName: 'SOLICITUDES_CAMBIO',
    schema: 'public',
    timestamps: false,
  }
);

export default SolicitudCambio;


