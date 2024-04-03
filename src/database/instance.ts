import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define("User", {
  employe_id: DataTypes.STRING,
  fcm_token: DataTypes.STRING,
});

const Notification = sequelize.define("Notification", {
  topic: DataTypes.STRING,
  employe_id: DataTypes.STRING,
  fcm_token: DataTypes.STRING,
  title: DataTypes.STRING,
  body: DataTypes.STRING,
});

async function init() {
  sequelize.sync();
}

init();

export { User, Notification };
