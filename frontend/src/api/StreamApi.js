import axios from "axios";
import { convertToDataObject } from "../model/ConvertDataFormat";
import StreamInfo from "../model/StreamInfo";
import * as SampleData from "./SampleData";
import { getAuthorizationHeader } from "./AuthenticationUtil";

export async function getStream(streamId) {
  return axios
    .get(`${process.env.REACT_APP_STREAM}/${streamId}`, getAuthorizationHeader())
    .then((response) => {
      const stream = response.data;
      return new StreamInfo(
        stream.id,
        convertToDataObject(stream.outputChannel.encoder),
        convertToDataObject(stream.inputChannel.decoder),
        stream.outputChannel.channel.port,
        stream.inputChannel.channel.port
      );
    });
}

export async function getAllStreams() {
  return axios.get(process.env.REACT_APP_STREAM, getAuthorizationHeader()).then((streams) => {
    return Promise.all(
      streams.data.map((streamId) => {
        return getStream(streamId);
      })
    );
  });
}

export async function deleteStream(streamId) {
  return axios.delete(`${process.env.REACT_APP_STREAM}/${streamId}`, getAuthorizationHeader());
}

export function createStream(selectedReceiverID, selectedSenderID) {
  return axios.post(
    process.env.REACT_APP_STREAM,
    {
      inputChannelId: selectedReceiverID,
      outputChannelId: selectedSenderID
    },
    getAuthorizationHeader()
  );
}
