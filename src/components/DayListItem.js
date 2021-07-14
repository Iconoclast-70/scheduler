import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

const formatSpots = function (spot) {
  if (spot === 0) {
    return "no spots remaining";
  }
  if (spot === 1) {
    return "1 spot remaining";
  }
  if (spot > 1) {
    return `${spot} spots remaining`;
  }
};

export default function DayListItem(props) {
  const liClass = classNames("li", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
    "day-list__item": props.name,
  });

  return (
    <li className={liClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
