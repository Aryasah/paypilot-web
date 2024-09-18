import URLs from "src/utils/constants";
import { HttpService } from "../http.service";

export class SchedulePaymentService {
  static getScheduledPayments = async (userId) => {
    return new Promise((resolve, reject) => {
      HttpService.httpGet(URLs.getScheduledPayments(userId))
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

  static schedulePayment = async (scheduledPayment) => {
    try {
      const response = await HttpService.httpPost(
        URLs.schedulePayment(),
        scheduledPayment
      );

      if (response.statusCode === 201) {
        return response.data;
      } else {
        throw new Error(
          `Failed to schedule payment. Status Code: ${response.statusCode}`
        );
      }
    } catch (error) {
      console.error("Error scheduling payment:", error);
      throw error;
    }
  };

  static updateScheduledPayment = async (scheduledPayment, newDate) => {
    return new Promise((resolve, reject) => {
      if (scheduledPayment.scheduledPaymentId == null) {
        return reject(new Error("Scheduled payment ID is missing."));
      }

      const url = `${URLs.updateScheduledPayment(
        scheduledPayment.scheduledPaymentId
      )}?newDate=${encodeURIComponent(newDate)}&scheduledPaymentId=${
        scheduledPayment.scheduledPaymentId
      }`;

      HttpService.httpGet(url)
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

  static getBills = async (filters) => {
    return new Promise((resolve, reject) => {
      HttpService.httpPost(URLs.getBills(), filters)
        .then((response) => {
          if (response.statusCode === 200) {
            resolve(response.data);
          } else {
            reject(new Error("Failed to fetch bills."));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  static cancelScheduledPayment = async (scheduledPaymentId) => {
    return new Promise((resolve, reject) => {
      HttpService.httpGet(`${URLs.cancelScheduledPayment(scheduledPaymentId)}`)
        .then((response) => {
          console.log("Response object:", response);
          if (response.statusCode === 204) {
            resolve(response.data);
          } else {
            reject(
              new Error(
                `Failed to cancel scheduled payment for ID: ${scheduledPaymentId}`
              )
            );
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  static getBillsByCategory = async (
    userId,
    billCategory,
    fromDate,
    toDate
  ) => {
    return new Promise((resolve, reject) => {
      HttpService.httpGet(
        URLs.getBillsByCategories(userId, billCategory, fromDate, toDate)
      )
        .then((response) => {
          console.log("Response object:", response,URLs.getBillsByCategories(userId, billCategory, fromDate, toDate));
          if (response.statusCode === 200) {
            resolve(response.data);
          } 
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
