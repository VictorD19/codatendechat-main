import moment from "moment-timezone";

export function useDate() {
  function dateToClient(strDate) {
    if (moment(strDate).isValid()) {
      return moment(strDate).format("DD/MM/YYYY");
    }
    return strDate;
  }

  function datetimeToClient(strDate) {

    if (moment(strDate).isValid()) {
      return moment(strDate).format("DD/MM/YYYY HH:mm");
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
