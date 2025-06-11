import axios from "axios";
import joi from "joi";

const addLog = async (message) => {
  const schema = joi.object({
    message: joi.string().trim().required(),
  });

  const logData = {
    message: message,
  };

  const { error, value: newLogObject } = schema.validate(logData);
  if (error) {
    console.log("Validation failed:", error.details[0].message);
    return;
  }

  try {
    const resp = await axios.post("http://localhost:3000/log", newLogObject);
    console.log(resp);
  } catch (e) {
    console.error(e);
  }
};

export default addLog;
