import { testNoisesInstance } from "../config/config";

//one of axios clients
class ApiClient {
  constructor() {
    //
  }

  getSound = (soundId: string) => {
    testNoisesInstance
      .get(`${soundId}.ogg`, {
        responseType: "blob",
        withCredentials: true,
        headers: {},
      })
      .then((result) => {
        console.log("BLOB DOWNLOADED");
        console.log(result);
      })
      .catch((er) => {
        console.error(er);
      });
  };
}

export const apiClient = new ApiClient();
