const axios = require("axios");

const runRequest = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    console.log(res.data);
  } catch (err) {
    console.error("Error fetching data:", err.message);
  }
};

runRequest();
