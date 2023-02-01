import dotenv from "dotenv";
const env = dotenv.config().parsed;

import express from "express";
import cors from "cors";
import axios from "axios";
import Queue_raspis from "./routes/RaspiRouteApt1.js";

import * as cron from "node-cron";
const PORT = process.env.PORT || 3012;

const app = express();
app.use(cors());

app.use(express.json());
app.use(Queue_raspis);

let date_ob;

// app.listen(PORT, () => console.log(`SERVER UP AND RUNNING ${PORT}`));
app.listen(PORT, async function () {
  try {
    console.log("Connection has been established successfully.");
    cron_filter();

    return console.log(`Server Berjalan pada 1port ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

// site1_check
async function cron_filter() {
  console.log("masuk cron filter");
  // site_1
  cron.schedule("* * 0,6,12,18 * * *", () => {
    date_ob = new Date();
    console.log("running a task pada setiap jam 0,6,12,18");
    cek_status_site1();
  });

  // site_2
  cron.schedule("* * 1,7,13,19 * * *", () => {
    date_ob = new Date();
    console.log("running a task pada setiap jam 1,7,13,19");
    cek_status_site2();
  });

  // site_3
  cron.schedule("* * 2,8,14,20 * * *", () => {
    date_ob = new Date();
    console.log("running a task pada setiap jam 2,8,14,20");
    cek_status_site3();
  });

  // site_4
  cron.schedule("* * 3,9,15,21 * * *", () => {
    date_ob = new Date();
    console.log("running a task pada setiap menit detikke 15");
    cek_status_site4();
  });
}

// === site1 ===
async function cek_status_site1() {
  console.log("masuk fungsi");

  try {
    const payload = {
      name: "site1",
    };
    const response = await axios.post(
      `http://localhost:3012/getSiteQueue`,
      payload
    );

    const data_name = await response.data.data.name;
    const data_status = await response.data.data.status;
    console.log("data_name =  " + data_name);
    console.log("data_status =  " + data_status);

    if (data_status === true) {
      update_site1(data_name);
    } else {
      console.log("skip update_site1, next step");
    }
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

async function update_site1(data_name) {
  try {
    const payload = {
      name: data_name,
      status: false,
      updated_at: date_ob,
    };
    const response = await axios.patch(
      `http://localhost:3012/updateStatusRaspis`,
      payload
    );

    const site1_status = await response.data.msg;
    console.log("update status_site : " + data_name + " : " + site1_status);
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

// === site2 ===
async function cek_status_site2() {
  console.log("cek site2");

  try {
    const payload = {
      name: "site2",
    };
    const response = await axios.post(
      `http://localhost:3012/getSiteQueue`,
      payload
    );

    const data_name = await response.data.data.name;
    const data_status = await response.data.data.status;
    console.log("data_name2 =  " + data_name);
    console.log("data_status2 =  " + data_status);

    if (data_status === true) {
      update_site2(data_name);
    } else {
      console.log("skip update_site2, next step");
    }
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

async function update_site2(data_name) {
  try {
    const payload = {
      name: data_name,
      status: false,
      updated_at: date_ob,
    };
    const response = await axios.patch(
      `http://localhost:3012/updateStatusRaspis`,
      payload
    );

    const site2_status = await response.data.msg;
    console.log("update status_site2 : " + data_name + " : " + site2_status);
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

// === site3 ===
async function cek_status_site3() {
  console.log("cek site3");

  try {
    const payload = {
      name: "site3",
    };
    const response = await axios.post(
      `http://localhost:3012/getSiteQueue`,
      payload
    );

    const data_name = await response.data.data.name;
    const data_status = await response.data.data.status;
    console.log("data_name3 =  " + data_name);
    console.log("data_status3 =  " + data_status);

    if (data_status === true) {
      update_site3(data_name);
    } else {
      console.log("skip update_site3, next step");
    }
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

async function update_site3(data_name) {
  try {
    const payload = {
      name: data_name,
      status: false,
      updated_at: date_ob,
    };
    const response = await axios.patch(
      `http://localhost:3012/updateStatusRaspis`,
      payload
    );

    const site3_status = await response.data.msg;
    console.log("update status_site3 : " + data_name + " : " + site3_status);
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

// === site3 ===
async function cek_status_site4() {
  console.log("cek site4");

  try {
    const payload = {
      name: "site4",
    };
    const response = await axios.post(
      `http://localhost:3012/getSiteQueue`,
      payload
    );

    const data_name = await response.data.data.name;
    const data_status = await response.data.data.status;
    console.log("data_name4 =  " + data_name);
    console.log("data_status4 =  " + data_status);

    if (data_status === true) {
      update_site4(data_name);
    } else {
      console.log("skip update_site4, next step, kembali ke site1");
    }
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

async function update_site4(data_name) {
  try {
    const payload = {
      name: data_name,
      status: false,
      updated_at: date_ob,
    };
    const response = await axios.patch(
      `http://localhost:3012/updateStatusRaspis`,
      payload
    );

    const site4_status = await response.data.msg;
    console.log("update status_site4 : " + data_name + " : " + site4_status);
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}
