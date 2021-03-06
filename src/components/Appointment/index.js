import React from "react";
import "./styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Form from "./Form.js";
import Status from "./Status.js";
import Confirm from "./Confirm.js";
import Error from "./Error.js";
import useVisualMode from "hooks/useVisualMode";

// TRANSITION CONSTANTS ************************************* //
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING;";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  // INITIALIZE transition, mode and back
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Delete the currently selected appointment
  const deleteInterview = function () {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then((res) => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  };

  // Track the transition for the confirm delete action
  const setConfirmTransition = function () {
    transition(CONFIRM);
  };

  // Save the appointment and book an interview
  const save = function (name, interviewer) {
    transition(SAVING, true);
    const interview = {
      student: name,
      interviewer,
    };

    props
      .bookInterview(props.id, interview, mode)
      .then((res) => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE);
      });
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === CREATE && (
        <Form onCancel={back} onSave={save} interviewers={props.interviewers} />
      )}

      {mode === SHOW && (
        <Show
          onEdit={() => transition(EDIT)}
          confirm={setConfirmTransition}
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

      {mode === SAVING && <Status message={"Saving"} />}

      {mode === DELETING && <Status message={"Deleting"} />}

      {mode === EDIT && (
        <Form
          onCancel={back}
          onSave={save}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          id={props.id}
          onDelete={deleteInterview}
          onCancel={back}
          message={"Are you sure you want to delete?"}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error message={"Error when saving appointment"} onCancel={back} />
      )}

      {mode === ERROR_DELETE && (
        <Error message={"Error when deleting appointment"} onCancel={back} />
      )}
    </article>
  );
}
