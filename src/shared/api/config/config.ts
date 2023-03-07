import axios from "axios";

//axios config
//
export const testNoisesInstance = axios.create({
  baseURL: "https://cdn.noises.online/NoisesOnline/Audio/",
  timeout: 10000,
  // headers: {'X-Custom-Header': 'foobar'}
});
