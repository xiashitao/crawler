const download = require("download");
const axios = require("axios");

const path = require("path");

const TOTAL = 100;
const PAGE_NUMBER = 10;

const targetUrl =
  "http://service.picasso.adesk.com/v1/vertical/category/4e4d610cdf714d2966000000/vertical";

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
};

function getListParams(skip = 0) {
  return {
    limit: PAGE_NUMBER,
    skip: skip,
    first: 0,
    order: "hot",
  };
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function getImgList(target_url, headers, params = {}) {
  return new Promise(async (resolve, reject) => {
    const data = await axios
      .get(targetUrl, {
        headers,
        params,
      })
      .then((res) => {
        resolve(res.data.res.vertical);
      })
      .catch((err) => reject(err));
  });
}

async function downloadFile(data) {
  for (let index = 0; index < data.length; index++) {
    const item = data[index];

    const filePath = path.join(__dirname, "..", "/static", "美女");

    await download(item.wp, filePath, {
      filename: item.id + ".jpg",
      headers,
    })
      .then(() => {
        console.log(`Download ${item.id} Completed`);
        return;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

async function load(skip = 0) {
  const data = await getImgList(targetUrl, headers, getListParams(skip));
  await downloadFile(data);

  await sleep(1500);
  if (skip < TOTAL) {
    load(skip + PAGE_NUMBER);
  } else {
    console.log("下载完成");
  }
}

load();
