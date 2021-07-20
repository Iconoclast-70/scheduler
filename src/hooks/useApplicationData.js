import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // Initialize day, days, appointments and interviewers state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // Initialize useEffect for axios operations and set the state with the returned data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // Set the state and update the interview object for the current appointment
  const bookInterview = function (id, interview, mode) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((day) => {
      if (day.name === state.day) {
        if (mode === "CREATE") {
          return { ...day, spots: day.spots - 1 };
        }
        return { ...day };
      }
      return day;
    });

    // Update the current appointment with the new interview object
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({ ...state, appointments, days });
        return response;
      });
  };

  // Set the state and delete the interview object for the current appointment
  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: {},
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Map the state of days and return a new array with the updated spots value
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return { ...day, spots: day.spots + 1 };
      }
      return day;
    });

    // Update the number of spots for the day
    return axios.delete(`/api/appointments/${id}`, null).then((response) => {
      setState({ ...state, appointments, days });
      return response;
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
