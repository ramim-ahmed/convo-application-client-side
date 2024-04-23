import moment from "moment";

export default function TimeAgo({ date }) {
  const timeAgo = moment(date).fromNow();
  return `${timeAgo}`;
}
