
import URLs from "src/utils/constants";
import { HttpService } from "../http.service";

export class GeneralService {
  static pingBackend = async () => {
    return new Promise((resolve, reject) => {
      HttpService.httpGet(URLs.pingBackend())
        .then((response) => {
          if (response.statusCode === 200) {
            resolve(response.data);
          } else {
            reject(new Error("Failed to ping the backend."));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
