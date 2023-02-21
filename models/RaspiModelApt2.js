import { Sequelize } from "sequelize";
import db2 from "../config/dataBase_Apt2.js";

const { DataTypes } = Sequelize;

const Queue_raspis = db2.define(
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
//   await db2.sync({ alter: true });
// })();

(async () => {
  await db2.sync();
})();
