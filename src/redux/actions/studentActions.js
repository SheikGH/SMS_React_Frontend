// src/redux/actions/studentActions.js
import * as api from '../../services/student/apiStudentService';

export const FETCH_STUDENTS = 'FETCH_STUDENTS';
export const FETCH_STUDENT = 'FETCH_STUDENT';
export const ADD_STUDENT = 'ADD_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const APPROVE_STUDENT = 'APPROVE_STUDENT';

export const fetchStudents = () => async (dispatch) => {
  const response = await api.getStudents();
  dispatch({ type: FETCH_STUDENTS, payload: response.data });
};

export const fetchStudentById = (id) => async (dispatch) => {
  const response = await api.getStudentById(id);
  console.log('fetchStudentById', response, response.data);
  dispatch({ type: FETCH_STUDENT, payload: response.data });
};

export const addStudent = (student) => async (dispatch) => {
  const response = await api.createStudent(student);
  dispatch({ type: ADD_STUDENT, payload: response.data });
};

export const editStudent = (id, student) => async (dispatch) => {
  const response = await api.updateStudent(id, student);
  dispatch({ type: UPDATE_STUDENT, payload: response.data });
};

export const deleteStudent = (id) => async (dispatch) => {
  await api.deleteStudent(id);
  dispatch({ type: DELETE_STUDENT, payload: id });
};

export const approveStudent = (id) => async (dispatch) => {
  await api.approveStudent(id);
  dispatch({ type: APPROVE_STUDENT, payload: id });
};
