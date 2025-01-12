// src/redux/reducers/studentReducer.js
import { FETCH_STUDENTS, FETCH_STUDENT, ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT, APPROVE_STUDENT } from '../actions/studentActions';

const initialState = {
  students: [],
  student: null,
};
// const initialState = [];
const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS:
      return { ...state, students: action.payload };
    case FETCH_STUDENT:
      return { ...state, student: action.payload };
    case ADD_STUDENT:
      return { ...state, students: [...state.students, action.payload] };
    case UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map((student) => student.id === action.payload.id ? action.payload : student)
      };
    case DELETE_STUDENT:
      return { ...state, students: state.students.filter((student) => student.id !== action.payload) };
    case APPROVE_STUDENT:
      return { ...state, student: action.payload };
    default:
      return state;
  }
  // switch (action.type) {
  //   case FETCH_STUDENTS:
  //     return action.payload;
  //   case ADD_STUDENT:
  //     return [...state, action.payload];
  //   case UPDATE_STUDENT:
  //     return state.map(student => student.id === action.payload.id ? action.payload : student);
  //   case DELETE_STUDENT:
  //     return state.filter(student => student.id !== action.payload);
  //   default:
  //     return state;
  // }
};

export default studentReducer;
