import { useState, useEffect } from "react";
import axios from 'axios';
import { getAppointmentsForDay } from "helpers/selectors";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }
  );

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')])
      .then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      });
  }, []) ;
      
  const bookInterview = function(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = state.days.map(day => {
      if (day.name === state.day) {
        return { ...day, spots: day.spots - 1}
      }
      return day;
    }); 

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(response => {
        setState({...state, appointments, days});
        return response.data;
    })
    // .then(() => {

    //   const spots = getAppointmentsForDay(state, state.day).filter(spot => spot.interview === null).length;
    //   const dayID = days[state.day].id;

    //   return axios.put(`/api/days/${dayID}`, spots)
    //   .then(res => {
    //     setState({...state, days});
    //     return res;
    //   })

    // })
    .catch(error => {
      return error;
    });
    
  }

  const cancelInterview = function(id) {
  
    const appointment = {
      ...state.appointments[id]
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    console.log("BEFORE ", state.days);
    const days = state.days.map(day => {
      if (day.name === state.day) {
        return { ...day, spots: day.spots + 1}
      }
      return day;
    }); 

    return axios.delete(`/api/appointments/${id}`, null)
    .then(response => {
        setState({...state, appointments, days}); 
        console.log("AFTER ", state.days);
        return response.data;
    })
    // .then(() => {

    //   const spots = getAppointmentsForDay(state, state.day).filter(spot => spot.interview === null).length;
    //   const dayID = days[state.day].id;

    //   return axios.put(`/api/days/${dayID}`, spots)
    //   .then(res => {
    //     setState({...state, days});
    //     return res;
    //   })

    // })
    .catch(error => {
      return error;
    });

  };
  
  return { state, setDay, bookInterview, cancelInterview };

}

