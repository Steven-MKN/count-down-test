import moment from "moment";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Constents from "expo-constants";

const { manifest } = Constents;
const api = manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
  : `api.example.com`;

const url = `http://${api}/events`;
// use json-server --host 192.168.43.161 db.json to run the server

export function getEvents() {
  return axios
    .get(url)
    .then((response) => response.data)
    .then((events) =>
      events.map((evt) => ({ ...evt, date: new Date(evt.date) }))
    )
    .catch((err) => console.log(err));
}

export function saveEvent({ title, date }) {
  return axios
    .post(url, { title, date, id: uuidv4() })
    .then((res) => res)
    .catch((err) => console.log(err));
}

export function formatDate(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format("D MMM YYYY");
}

export function formatDateTime(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format("H A on D MMM YYYY");
}

export function getCountdownParts(eventDate) {
  const duration = moment.duration(
    moment(new Date(eventDate)).diff(new Date())
  );
  return {
    days: parseInt(duration.as("days")),
    hours: duration.get("hours"),
    minutes: duration.get("minutes"),
    seconds: duration.get("seconds"),
  };
}
