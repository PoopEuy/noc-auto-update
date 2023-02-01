import dotenv from "dotenv";
const env = dotenv.config().parsed;

import express from "express";
import cors from "cors";
import axios from "axios";
import Queue_raspis from "./routes/RaspiRouteApt1.js";
let date_ob = new Date();

const PORT = process.env.PORT || 3012;

const app = express();
app.use(cors());

app.use(express.json());
app.use(Queue_raspis);

// app.listen(PORT, () => console.log(`SERVER UP AND RUNNING ${PORT}`));
app.listen(PORT, async function () {
  try {
    console.log("Connection has been established successfully.");
    cek_status_site1();

    return console.log(`Server Berjalan pada 1port ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

// site1_check
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
      setTimeout(
        await function () {
          cek_status_site2();
        },
        3000
      );
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

    setTimeout(
      await function () {
        cek_status_site2();
      },
      3000
    );
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

// site2_check
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
      setTimeout(
        await function () {
          cek_status_site3();
        },
        3000
      );
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

    setTimeout(
      await function () {
        cek_status_site3();
      },
      3000
    );
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

// site3_check
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
      setTimeout(
        await function () {
          cek_status_site4();
        },
        3000
      );
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

    setTimeout(
      await function () {
        cek_status_site4();
      },
      3000
    );
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

// site4_check
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
      setTimeout(
        await function () {
          cek_status_site1();
        },
        3000
      );
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

    console.log("selesai, next step, kembali ke site1");
    setTimeout(
      await function () {
        cek_status_site1();
      },
      3000
    );
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}
