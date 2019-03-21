import moment from "moment";

const taskDateFormat = function({ windowStart, duration, isAllDay }) {
  return `${moment
    .unix(windowStart / 1000)
    .format("ddd, MMM Do YYYY")} - ${duration} minutes`;
};

const taskTimeFormat = function({ windowStart, windowEnd, isAllDay }) {
  if (isAllDay) {
    return "all day";
  } else {
    return `${moment.unix(windowStart / 1000).format("h:mmA")} - ${moment
      .unix(windowEnd / 1000)
      .format("h:mmA")}`;
  }
};

const updatedFormat = function(updatedAt) {
  return `${moment.unix(updatedAt / 1000).format("ddd, MMM, Do YYYY h:mmA")}`;
};

const technicianListFormat = function(technicians) {
  if (!technicians || !technicians[0]) {
    return "No Technicians Assigned";
  } else {
    let technicianString = `Assigned to ${
      technicians[0].name ? technicians[0].name : technicians[0].email
    }`;
    for (let i = 1; i < technicians.length; i++) {
      technicianString += `, ${
        technicians[i].name ? technicians[i].name : technicians[i].email
      }`;
    }
    return technicianString;
  }
};

const addressFormat = function({ address, city, province }) {
  return `${address}, ${city}, ${province}`;
};

const statusFormat = function(status) {
  if (status === "f") {
    return "Finished";
  } else if (status === "c") {
    return "Cancelled";
  } else {
    return "Not completed";
  }
};

export {
  taskDateFormat,
  taskTimeFormat,
  updatedFormat,
  technicianListFormat,
  addressFormat,
  statusFormat
};
