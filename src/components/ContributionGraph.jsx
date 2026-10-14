import { useEffect, useMemo, useRef } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Groups daily entries into week columns (Sunday-first), padding the first week. */
function toWeeks(days) {
  if (days.length === 0) return [];
  const firstWeekday = new Date(`${days[0].date}T00:00:00`).getDay();
  const padded = [...Array(firstWeekday).fill(null), ...days];
  const weeks = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  return weeks;
}

function monthLabels(weeks) {
  let lastMonth = -1;
  return weeks.map((week) => {
    const firstDay = week.find(Boolean);
    const month = firstDay ? new Date(`${firstDay.date}T00:00:00`).getMonth() : lastMonth;
    if (month === lastMonth) return "";
    lastMonth = month;
    return MONTHS[month];
  });
}

export default function ContributionGraph({ days, total }) {
  const scrollRef = useRef(null);
  const weeks = useMemo(() => toWeeks(days), [days]);
  const labels = useMemo(() => monthLabels(weeks), [weeks]);

  // On narrow screens, start scrolled to the most recent weeks.
  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollLeft = node.scrollWidth;
  }, [weeks]);

  return (
    <div className="contrib">
      <div className="contrib__scroll" ref={scrollRef} tabIndex={0} aria-label="Contribution calendar, scrollable">
        <div
          className="contrib__graph"
          role="img"
          aria-label={`${total} contributions on GitHub in the last year`}
          style={{ "--weeks": weeks.length }}
        >
          <div className="contrib__months" aria-hidden="true">
            {labels.map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
          <div className="contrib__cells" aria-hidden="true">
            {weeks.flatMap((week, w) =>
              week.map((day, d) =>
                day ? (
                  <span
                    key={day.date}
                    className="contrib__cell"
                    data-level={day.level}
                    title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                  />
                ) : (
                  <span key={`pad-${w}-${d}`} className="contrib__cell contrib__cell--empty" />
                )
              )
            )}
          </div>
        </div>
      </div>

      <div className="contrib__legend" aria-hidden="true">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span key={level} className="contrib__cell" data-level={level} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
