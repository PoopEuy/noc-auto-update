import { where } from "sequelize";
import Queue_raspis from "../models/RaspiModelApt1.js";

export const getSiteQueue = async (req, res) => {
  try {
    const response = await Queue_raspis.findOne({
      where: {
        name: req.body.name,
      },
    });

    res.status(200).json({ msg: "sucess", data: response });
    // res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStatusRaspis = async (req, res) => {
  try {
    const response = await Queue_raspis.update(req.body, {
      where: {
        name: req.body.name,
      },
    });

    res.status(200).json({ msg: "site_updated", data: response });
  } catch (error) {
    console.log(error.message);
  }
};
