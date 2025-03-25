import moment from "moment-timezone";

export function useDate() {
  function dateToClient(strDate, timeZone) {
    if (timeZone) {
      if (moment.utc(strDate).isValid()) {
        return moment.utc(strDate).tz(timeZone).format("DD/MM/YYYY HH:mm");
      }
      return strDate
    }

    if (moment(strDate).isValid()) {
      return moment(strDate).format("DD/MM/YYYY");
    }
    return strDate;
  }

  function datetimeToClient(strDate, timeZone) {
    if (timeZone) {
      debugger;
      if (moment.utc(strDate).isValid()) {
        return moment.utc(strDate).tz(timeZone).format("DD/MM/YYYY HH:mm");
      }
      return strDate;
    }

    if (moment(strDate).isValid()) {
      return moment.format("DD/MM/YYYY HH:mm");
    }
    return strDate;
  }

  function dateToDatabase(strDate) {
    if (moment(strDate, "DD/MM/YYYY").isValid()) {
      return moment().utc(strDate).format("YYYY-MM-DD HH:mm:ss");
    }
    return strDate;
  }

  return {
    dateToClient,
    datetimeToClient,
    dateToDatabase,
  };
}
