import moment from "moment";

const mergeDateTime = function(date, time) {
  time = moment(time);
  const temp = moment(date);
  temp.hours(time.hours());
  temp.minutes(time.minutes());
  temp.seconds(0);
  temp.milliseconds(0);
  return temp;
};

export { mergeDateTime };
