import axios from "axios";
import LogInfo from "../model/LogInfo";
import StreamLogInfo from "../model/StreamLogInfo";
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

async function getLogsOfStream(endpoint) {
  return axios
    .get(endpoint, getAuthorizationHeader())
    .then((response) => {
      return Promise.resolve(
        response.data.map((log) => {
          const logEntity = log.logEntity;
          // log.serialNumber = sender, logEntity.serialNumber = receiver
          return new StreamLogInfo(logEntity.dateTime, logEntity.level, log.serialNumber, logEntity.serialNumber, logEntity.message);
        })
      );
    })
    .catch(() => {
      return new Promise((resolve) => {
        SampleData.getAllStreamLogs(resolve);
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
  return getLogsOfStream(`${process.env.REACT_APP_STREAMLOGS}/${streamId}`);
}
