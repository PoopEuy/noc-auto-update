import { where } from "sequelize";
import Queue_raspis from "../models/RaspiModelApt1.js";
import Queue_raspis2 from "../models/RaspiModelApt2.js";

//APT1
export const getSiteQueue_apt1 = async (req, res) => {
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

export const updateStatusRaspis_apt1 = async (req, res) => {
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

//APT2
export const getSiteQueue_apt2 = async (req, res) => {
  try {
    const response = await Queue_raspis2.findOne({
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

export const updateStatusRaspis_apt2 = async (req, res) => {
  try {
    const response = await Queue_raspis2.update(req.body, {
      where: {
        name: req.body.name,
      },
    });

    res.status(200).json({ msg: "site_updated", data: response });
  } catch (error) {
    console.log(error.message);
  }
};
