import { Sequelize } from "sequelize";
import db from "../config/dataBase_Apt1.js";

const { DataTypes } = Sequelize;

const Queue_raspis = db.define(
  "queue_raspis",
  {
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
    status: {
      type: Sequelize.BOOLEAN,
      unique: false,
    },
    created_at: {
      type: Sequelize.DATE(3),
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE(3),
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Queue_raspis;

// (async () => {
//   await db.sync({ alter: true });
// })();

(async () => {
  await db.sync();
})();
