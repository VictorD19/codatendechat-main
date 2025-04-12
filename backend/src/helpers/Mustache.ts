import Mustache from "mustache";
import Contact from "../models/Contact";
import moment from "moment-timezone";
import { salvarLog } from "../queues";

export const greeting = (): string => {
  const greetings = ["Boa madrugada", "Bom dia", "Boa tarde", "Boa noite"];
  const h = new Date().getHours();
  // eslint-disable-next-line no-bitwise
  return greetings[(h / 6) >> 0];
};

export const firstName = (contact?: Contact): string => {
  if (contact && contact?.name) {
    const nameArr = contact?.name.split(' ');
    return nameArr[0];
  }
  return '';
};

export default (body: string, contact: Contact, timeZone?: ""): string => {
  let ms = "";
  salvarLog("iNCIAO MONTAGEM HORA")
  const m = timeZone ? moment.tz(timeZone) : moment();
  const dd = m.format("DD");
  const mm = m.format("MM");
  const yy = m.format("YYYY");
  const hh = m.format("HH");
  const min = m.format("mm");
  const ss = m.format("ss");
  let horaNumerica = parseInt(hh)
  if (horaNumerica >= 6) {
    ms = "Bom dia";
  }
  if (horaNumerica > 11) {
    ms = "Boa tarde";
  }
  if (horaNumerica > 17) {
    ms = "Boa noite";
  }
  if (horaNumerica > 23 || horaNumerica < 6) {
    ms = "Boa madrugada";
  }

  const protocol = yy + mm + dd + String(hh) + min + ss;

  const hora = `${hh}:${min}:${ss}`;
  const view = {
    firstName: firstName(contact),
    name: contact ? contact.name : "",
    gretting: greeting(),
    ms,
    protocol,
    hora
  };
  salvarLog("FIM" + JSON.stringify(view))
  return Mustache.render(body, view);
};