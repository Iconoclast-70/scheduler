import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const liClass = classNames("li", {
    "interviewers__item--selected": props.selected,
    "interviewers__item--selected-image": props.avatar,
    "interviewers__item-image": props.avatar,
  });

  return (
    <li className={liClass} data-testid="interviewer-selector" onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
