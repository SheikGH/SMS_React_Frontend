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

export const addStudent1 = (student) => async (dispatch) => {
  const response = await api.createStudent(student);
  console.log('api.createStudent(student):', response);
  dispatch({ type: ADD_STUDENT, payload: response.data });
};
export const addStudent = (student) => async (dispatch) => {
  try {
    const response = await api.createStudent(student);
    console.log('api.createStudent(student):', response);
    dispatch({ type: ADD_STUDENT, payload: response.data });

    // Return the response data to the caller
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error; // Re-throw the error so it can be handled
  }
};
export const editStudent = (id, student) => async (dispatch) => {
  const response = await api.updateStudent(id, student);
  dispatch({ type: UPDATE_STUDENT, payload: response.data });
};

export const deleteStudent = (id) => async (dispatch) => {
  await api.deleteStudent(id);
  dispatch({ type: DELETE_STUDENT, payload: id });
};

export const approveStudent1 = (id) => async (dispatch) => {
  const response = await api.approveStudent(id);
  dispatch({ type: APPROVE_STUDENT, payload: response.data });
};
export const approveStudent = (id) => async (dispatch) => {
  try {
    const response = await api.approveStudent(id);
    console.log('api.approveStudent(id):', response);
    if (!response.ok) throw new Error('Failed to approve student');

    const data = await response.json();
    dispatch({ type: APPROVE_STUDENT, payload: data });

    // Return the response data to the caller
    return data;
  } catch (error) {
    console.error('Error aprroving student:', error);
    throw error; // Re-throw the error so it can be handled
  }
};