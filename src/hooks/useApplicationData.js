import { useState, useEffect } from "react";
import axios from 'axios';


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

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(response => {
        setState({...state, appointments});
        return response;
    })
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

    return axios.delete(`/api/appointments/${id}`, null)
    .then(response => {
        setState({...state, appointments}); 
        return response;
    })
    .catch(error => {
      return error;
    });
  };
  
  return { state, setDay, bookInterview, cancelInterview };

}