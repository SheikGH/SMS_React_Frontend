// src/redux/selectors/studentSelectors.js
export const selectStudents = (state) => state.students.students;
export const selectStudent = (state) => state.students.student;
// export const selectStudents = (state) => state.students.data;
// export const selectStudentById = (state, id) => {
//   console.log('studentSelectors:', id, state, state.students, state.students.students, state.students.student); 
//   return state.students.student ? state.students.student : state.students.students.find((student) => student.ID === id); }
  export const selectStudentById = (state, id) =>
  state.students.student ? state.students.student : 
  state.students.students.find((student) => student.id === id);
// export const selectStudentById = (state, studentId) => 
// { console.log('studentSelectors:', state, studentId); return state.students.students };
// export const selectStudentById = (state, studentId) => {
//    console.log('studentSelectors:', state, state.students, 
//    [state.students], studentId,state.students.filter((student) => student.ID === 1));  
//    var arrStudents = [state.students]
//    return arrStudents.students.filter((student) => student.ID === studentId);
// }  