export const HttpService = {
  async httpGet(path) {
    try {
      const response = await fetch(path, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
      });

      const contentType = response.headers.get("Content-Type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      return {
        data,
        statusCode: response.status,
        statusMessage: response.statusText,
      };
    } catch (error) {
      throw error || new Error("An unexpected error occurred.");
    }
  },

  async httpPost(path, body) {
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
        body: JSON.stringify(body),
      });

      console.log(response, 'response we are getting ---- >',path);

      const contentType = response.headers.get("Content-Type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = null;
      }

      return {
        data,
        statusCode: response.status,
        statusMessage: response.statusText,
      };
    } catch (error) {
      throw error || new Error("An unexpected error occurred.");
    }
  },

  async httpPut(path, body) {
    try {
      const response = await fetch(path, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
        body: JSON.stringify(body),
      });

      const contentType = response.headers.get("Content-Type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = null;
      }

      return {
        data,
        statusCode: response.status,
        statusMessage: response.statusText,
      };
    } catch (error) {
      throw error || new Error("An unexpected error occurred.");
    }
  },

  async httpDelete(path) {
    try {
      const response = await fetch(path, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
      });

      const contentType = response.headers.get("Content-Type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = null;
      }

      return {
        data,
        statusCode: response.status,
        statusMessage: response.statusText,
      };
    } catch (error) {
      throw error || new Error("An unexpected error occurred.");
    }
  },
};
