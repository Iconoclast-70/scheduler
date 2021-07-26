export function getAppointmentsForDay(state, day) {
  let dayArr = [];
  for (const d of state.days) {
    if (d.name === day) {
      dayArr = [...d.appointments];
    }
  }
  const appointmentArr = [];
  for (const appointment in state.appointments) {
    if (dayArr.includes(state.appointments[appointment].id)) {
      appointmentArr.push(state.appointments[appointment]);
    }
  }

  return appointmentArr;
}

export function getInterview(state, interview) {
  if (interview) {
    const interviewer = state.interviewers[interview.interviewer];
    const currentInterview = { student: interview.student, interviewer };
    return currentInterview;
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  let interviewDayArr = [];
  for (const d of state.days) {
    if (d.name === day) {
      interviewDayArr = [...d.interviewers];
    }
  }

  const interviewArr = [];
  for (const interviewer in state.interviewers) {
    if (interviewDayArr.includes(state.interviewers[interviewer].id)) {
      interviewArr.push(state.interviewers[interviewer]);
    }
  }

  return interviewArr;
}
