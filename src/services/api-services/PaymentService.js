
import URLs from "src/utils/constants";
import { HttpService } from "../http.service";

export class PaymentService {
  static getPaymentHistory = async (category, fromDate, toDate, userId) => {
    const url = `${URLs.getPaymentHistory()}?category=${encodeURIComponent(category)}&fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(toDate)}&userId=${encodeURIComponent(userId)}`;
    console.log(url);
    return new Promise((resolve, reject) => {
      HttpService.httpGet(url)
        .then((response) => {
          if (response.statusCode === 200) {
            resolve(response.data);
          } else {
            reject(new Error("Failed to get payment history."));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  static getPaymentOverview = async (category, fromDate, toDate, userId) => {
    const url = `${URLs.getPaymentOverview()}?billCategory=${encodeURIComponent(category)}&fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(toDate)}&userId=${encodeURIComponent(userId)}`;
    return new Promise((resolve, reject) => {
      HttpService.httpGet(url)
        .then((response) => {
          if (response.statusCode === 200) {
            resolve(response.data);
          } else {
            reject(new Error("Failed to get payment overview."));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  static getPaymentProgress = async (userId) => {
    const url = `${URLs.getPaymentProgress(userId)}`;
    console.log('url we are fetching ---- >', url);
    return new Promise((resolve, reject) => {
      HttpService.httpGet(url)
        .then((response) => {
          if (response.statusCode === 200) {
            console.log('response we are getting ---- >', response.data);
            resolve(response.data);
          } else {
            reject(new Error("Failed to get payment progress."));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  static addPayment = async (payment) => {
    return new Promise((resolve, reject) => {
      HttpService.httpPost(URLs.addPayment(), payment)
        .then((response) => {
          if (response.statusCode === 201) {
            resolve(response.data);
          } else {
            reject(new Error("Failed to add payment."));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
