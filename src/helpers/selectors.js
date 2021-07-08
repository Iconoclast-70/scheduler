  export function getAppointmentsForDay(state, day) {
    
  let dayArr = [];
  for (const d of state.days) {
    if (d.name === day) {
      dayArr = d.appointments
    }
  }
  const appointmentArr = [];
  for (const appointment in state.appointments) {
    if (dayArr.includes( state.appointments[appointment].id) ) {
      
      appointmentArr.push(state.appointments[appointment]);
    }
  }
  
  return appointmentArr;

}