const axios = require("axios");

export default async function callApi(params) {
  let url = "";
  if (process.env.NODE_ENV === "development") {
    url = "http://localhost:5000/" + params;
    console.log("in dev");
  } else {
    url = "/api/" + params;
    console.log("in prod");
  }

  let response = [];
  let error = "";
  await axios
    .get(url)
    .then((res) => {
      if (res.status !== 200) {
        throw Error("Data currently not available");
      }
      response = res.data;
    })
    .catch((err) => {
      console.log("error");
      error = err.message;
    });

  if (error) {
    return [false, error];
  } else {
    return [true, response];
  }
}
