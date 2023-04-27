//In this file, I will going to perform all the http requests
import axios from 'axios';

export const baseUrl = "http://localhost:5000/api"

export const postRequest = async (url, body) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    let message;

    if (error.response.data?.message) {
      message = error.response.data.message;
    } else {
      message = error.message;
    }

    return { error: true, message };
  }
}
