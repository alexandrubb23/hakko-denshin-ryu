interface Props {
  start: string;
  end: string;
  separator?: string;
}

/** "18:00–19:30", each end machine-readable */
const TimeRange = ({ start, end, separator = "–" }: Props) => (
  <>
    <time dateTime={start}>{start}</time>
    {separator}
    <time dateTime={end}>{end}</time>
  </>
);

export default TimeRange;
