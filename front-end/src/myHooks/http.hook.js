import { useCallback } from "react";

export const useHttp = () => {
  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-type"] = "application/json";
        }
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        return data;
      } catch (e) {
        throw e;
      }
    },
    []
  );

  return { request };
};