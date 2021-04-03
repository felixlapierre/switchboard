import axios from "axios";
import LogInfo from "../model/LogInfo";
import { getAuthorizationHeader } from "./AuthenticationUtil";
import * as SampleData from "./SampleData";

async function getLogs(endpoint) {
  return axios
    .get(endpoint, getAuthorizationHeader())
    .then((response) => {
      return Promise.resolve(
        response.data.map((log) => {
          return new LogInfo(log.id, log.dateTime, log.level, log.message);
        })
      );
    })
    .catch(() => {
      return new Promise((resolve) => {
        SampleData.getAllLogs(resolve);
      });
    });
}

export async function getAllLogs() {
  return getLogs(process.env.REACT_APP_LOG);
}

export async function getDeviceLogs(deviceSerialNumber) {
  return getLogs(`${process.env.REACT_APP_LOG}/${deviceSerialNumber}`);
}

export async function getStreamLogs(streamId) {
  return getLogs(`${process.env.REACT_APP_STREAMLOGS}/${streamId}`);
}
