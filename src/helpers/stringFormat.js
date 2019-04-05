import moment from "moment";

const taskDateFormat = function({ windowStart, duration }) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  let durationString = "";
  if (hours) {
    durationString += ` ${hours} hour`;
    if (hours > 1) {
      durationString += "s";
    }
  }
  if (minutes) {
    durationString += ` ${minutes} minutes`;
  }
  if (!minutes && !hours) {
    durationString = "0 minutes";
  }
  return `${moment
    .unix(windowStart / 1000)
    .format("ddd, MMM Do, YYYY")} - ${durationString}`;
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
  return `${moment.unix(updatedAt / 1000).format("ddd, MMM Do, YYYY h:mmA")}`;
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
  switch (status) {
    case "f":
      return "Finished";
    case "c":
      return "Cancelled";
    case "o":
      return "Ongoing";
    case "s":
      return "Started";
    default:
      return "Not Completed"
  }
};

const durationToString = function(duration) {
  let hoursStr, minutesStr;
  const hours = Math.floor(duration / 60);
  if (hours >= 10) {
    hoursStr = `${hours}`;
  } else {
    hoursStr = `0${hours}`;
  }
  const minutes = duration % 60;
  if (minutes >= 10) {
    minutesStr = `${minutes}`;
  } else {
    minutesStr = `0${minutes}`;
  }
  return `${hoursStr}:${minutesStr}`;
};

export {
  taskDateFormat,
  taskTimeFormat,
  updatedFormat,
  technicianListFormat,
  addressFormat,
  statusFormat,
  durationToString
};
