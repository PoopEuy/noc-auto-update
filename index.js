import dotenv from "dotenv";
const env = dotenv.config().parsed;

import express from "express";
import cors from "cors";
import axios from "axios";
import Queue_raspis from "./routes/RaspiRouteApt1.js";

import * as cron from "node-cron";
import { execute } from "@getvim/execute";
const PORT = process.env.PORT || 3012;
//dbapt1
const DBUSERNAME = process.env.USER_APT1;
const DBPASSWORD = process.env.PASSWORD_APT1;
const DBNAME = process.env.DATABASE_APT1;
const DBHOST = process.env.DB_HOST_APT1;
const DB_PORT = process.env.DB_PORT_EXPOSE_APT1;

//dbapt2
const DBUSERNAME_APT2 = process.env.USER_APT2;
const DBPASSWORD_APT2 = process.env.PASSWORD_APT2;
const DBNAME_APT2 = process.env.DATABASE_APT2;
const DBHOST_APT2 = process.env.DB_HOST_APT2;
const DB_PORT_APT2 = process.env.DB_PORT_EXPOSE_APT2;

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

  //site_1 0,6,12,18
  cron.schedule("00 00 00,06,12,18 * * *", () => {
    date_ob = new Date();
    console.log("running a task pada setiap jam 0,6,12,18");
    cek_status_site1_apt1();
  });

  // site_2 1,7,13,19
  cron.schedule("00 00 01,07,13,19 * * *", () => {
    date_ob = new Date();
    console.log("running a task pada setiap jam 1,7,13,19");
    cek_status_site2_apt1();
  });

  // site_3 2,8,14,20
  cron.schedule("00 00 02,08,14,20 * * *", () => {
    date_ob = new Date();
    console.log("running a task pada setiap jam 2,8,14,20");
    cek_status_site3_apt1();
  });

  // site_4 3,9,15,21
  cron.schedule("00 00 03,09,15,21 * * *", () => {
    date_ob = new Date();
    console.log("running a task pada setiap menit detikke 15");
    cek_status_site4_apt1();
  });
}

// === site1 ===
//apt1
async function cek_status_site1_apt1() {
  console.log("masuk fungsi");

  try {
    const payload = {
      name: "site1",
    };
    const response = await axios.post(
      `http://localhost:3012/getSiteQueue_apt1`,
      payload
    );

    const data_name = await response.data.data.name;
    const data_status = await response.data.data.status;
    console.log("data_name =  " + data_name);
    console.log("data_status =  " + data_status);

    if (data_status === true) {
      update_site1_apt1(data_name);
    } else {
      console.log("skip update_site1_apt1, next step");
    }
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

async function update_site1_apt1(data_name) {
  try {
    const payload = {
      name: data_name,
      status: false,
      updated_at: date_ob,
    };
    const response = await axios.patch(
      `http://localhost:3012/updateStatusRaspis_apt1`,
      payload
    );

    const site1_status = await response.data.msg;
    console.log("update status_site : " + data_name + " : " + site1_status);
    cek_status_site1_apt2();
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

//apt2
async function cek_status_site1_apt2() {
  console.log("masuk fungsi");
  const name_site = "site1";
  try {
    const payload = {
      name: name_site,
    };
    const response = await axios.post(
      `http://localhost:3012/getSiteQueue_apt2`,
      payload
    );

    const data_name2 = await response.data.data.name;
    const data_status2 = await response.data.data.status;
    console.log("data_name_apt2 =  " + data_name2);
    console.log("data_status_apt2 =  " + data_status2);

    if (data_status2 === true) {
      update_site1_apt2(data_name2);
    } else {
      console.log("skip update_site1_apt2, next step");
    }
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

async function update_site1_apt2(data_name2) {
  try {
    const payload = {
      name: data_name2,
      status: false,
      updated_at: date_ob,
    };
    const response = await axios.patch(
      `http://localhost:3012/updateStatusRaspis_apt2`,
      payload
    );

    const site1_status2 = await response.data.msg;
    console.log(
      "update status_site1_apt2 : " + data_name2 + " : " + site1_status2
    );
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

// === site2 ===
//apt1
async function cek_status_site2_apt1() {
  console.log("cek site2");

  try {
    const payload = {
      name: "site2",
    };
    const response = await axios.post(
      `http://localhost:3012/getSiteQueue_apt1`,
      payload
    );

    const data_name = await response.data.data.name;
    const data_status = await response.data.data.status;
    console.log("data_name2 =  " + data_name);
    console.log("data_status2 =  " + data_status);

    if (data_status === true) {
      update_site2_apt1(data_name);
    } else {
      console.log("skip update_site2_apt1, next step");
    }
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

async function update_site2_apt1(data_name) {
  try {
    const payload = {
      name: data_name,
      status: false,
      updated_at: date_ob,
    };
    const response = await axios.patch(
      `http://localhost:3012/updateStatusRaspis_apt1`,
      payload
    );

    const site2_status = await response.data.msg;
    console.log("update status_site2 : " + data_name + " : " + site2_status);
    cek_status_site2_apt2();
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

//apt2
async function cek_status_site2_apt2() {
  console.log("masuk fungsi");
  const name_site = "site2";
  try {
    const payload = {
      name: name_site,
    };
    const response = await axios.post(
      `http://localhost:3012/getSiteQueue_apt2`,
      payload
    );

    const data_name2 = await response.data.data.name;
    const data_status2 = await response.data.data.status;
    console.log("data_name_apt2 =  " + data_name2);
    console.log("data_status_apt2 =  " + data_status2);

    if (data_status2 === true) {
      update_site2_apt2(data_name2);
    } else {
      console.log("skip update_site2_apt2, next step");
    }
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

async function update_site2_apt2(data_name2) {
  try {
    const payload = {
      name: data_name2,
      status: false,
      updated_at: date_ob,
    };
    const response = await axios.patch(
      `http://localhost:3012/updateStatusRaspis_apt2`,
      payload
    );

    const site2_status2 = await response.data.msg;
    console.log(
      "update status_site2_apt2 : " + data_name2 + " : " + site2_status2
    );
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

// === site3 ===
async function cek_status_site3_apt1() {
  console.log("cek site3");

  try {
    const payload = {
      name: "site3",
    };
    const response = await axios.post(
      `http://localhost:3012/getSiteQueue_apt1`,
      payload
    );

    const data_name = await response.data.data.name;
    const data_status = await response.data.data.status;
    console.log("data_name3 =  " + data_name);
    console.log("data_status3 =  " + data_status);

    if (data_status === true) {
      update_site3_apt1(data_name);
    } else {
      console.log("skip update_site3_apt1, next step");
    }
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

async function update_site3_apt1(data_name) {
  try {
    const payload = {
      name: data_name,
      status: false,
      updated_at: date_ob,
    };
    const response = await axios.patch(
      `http://localhost:3012/updateStatusRaspis_apt1`,
      payload
    );

    const site3_status = await response.data.msg;
    console.log("update status_site3 : " + data_name + " : " + site3_status);
    cek_status_site3_apt2();
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

//apt2
async function cek_status_site3_apt2() {
  console.log("masuk fungsi");
  const name_site = "site3";
  try {
    const payload = {
      name: name_site,
    };
    const response = await axios.post(
      `http://localhost:3012/getSiteQueue_apt2`,
      payload
    );

    const data_name2 = await response.data.data.name;
    const data_status2 = await response.data.data.status;
    console.log("data_name_apt2 =  " + data_name2);
    console.log("data_status_apt2 =  " + data_status2);

    if (data_status2 === true) {
      update_site3_apt2(data_name2);
    } else {
      console.log("skip update_site3_apt2, next step");
    }
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

async function update_site3_apt2(data_name2) {
  try {
    const payload = {
      name: data_name2,
      status: false,
      updated_at: date_ob,
    };
    const response = await axios.patch(
      `http://localhost:3012/updateStatusRaspis_apt2`,
      payload
    );

    const site2_status = await response.data.msg;
    console.log(
      "update status_site3_apt2 : " + data_name2 + " : " + site2_status
    );
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

// === site4 ===
//apt1
async function cek_status_site4_apt1() {
  console.log("cek site4");

  try {
    const payload = {
      name: "site4",
    };
    const response = await axios.post(
      `http://localhost:3012/getSiteQueue_apt1`,
      payload
    );

    const data_name = await response.data.data.name;
    const data_status = await response.data.data.status;
    console.log("data_name4 =  " + data_name);
    console.log("data_status4 =  " + data_status);

    if (data_status === true) {
      update_site4_apt1(data_name);
    } else {
      console.log("skip update_site4_apt1, next step, kembali ke site1");
    }
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

async function update_site4_apt1(data_name) {
  try {
    const payload = {
      name: data_name,
      status: false,
      updated_at: date_ob,
    };
    const response = await axios.patch(
      `http://localhost:3012/updateStatusRaspis_apt1`,
      payload
    );

    const site4_status = await response.data.msg;
    console.log("update status_site4 : " + data_name + " : " + site4_status);
    cek_status_site4_apt2();
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

//apt2
async function cek_status_site4_apt2() {
  console.log("masuk fungsi");
  const name_site = "site4";
  try {
    const payload = {
      name: name_site,
    };
    const response = await axios.post(
      `http://localhost:3012/getSiteQueue_apt2`,
      payload
    );

    const data_name2 = await response.data.data.name;
    const data_status2 = await response.data.data.status;
    console.log("data_name_apt2 =  " + data_name2);
    console.log("data_status_apt2 =  " + data_status2);

    if (data_status2 === true) {
      update_site4_apt2(data_name2);
    } else {
      console.log("skip update_site4_apt2, next step");
    }
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

async function update_site4_apt2(data_name2) {
  try {
    const payload = {
      name: data_name2,
      status: false,
      updated_at: date_ob,
    };
    const response = await axios.patch(
      `http://localhost:3012/updateStatusRaspis_apt2`,
      payload
    );

    const site2_status = await response.data.msg;
    console.log(
      "update status_site4_apt2 : " + data_name2 + " : " + site2_status
    );
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

// backup-db
// function backup() {
//   const date = new Date();
//   const currentDate = `${date.getFullYear()}.${
//     date.getMonth() + 1
//   }.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
//   execute(
//     `PGPASSWORD="${DBPASSWORD}" pg_dump -U ${DBUSERNAME} -d ${DBNAME} -f database-backup-${currentDate}.tar`
//   )
//     .then(async () => {
//       console.log("Finito");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
