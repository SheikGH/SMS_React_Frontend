// src/redux/actions/familyMemberActions.js
import * as api from '../../services/student/apiFamilyMemberService';

export const FETCH_FAMILY_MEMBERS = 'FETCH_FAMILY_MEMBERS';
export const FETCH_FAMILY_MEMBER = 'FETCH_FAMILY_MEMBER';
export const FETCH_FAMILY_MEMBER_SID = 'FETCH_FAMILY_MEMBER_SID';
export const ADD_FAMILY_MEMBER = 'ADD_FAMILY_MEMBER';
export const ADD_FAMILY_MEMBER_SID = 'ADD_FAMILY_MEMBER_SID';
export const UPDATE_FAMILY_MEMBER = 'UPDATE_FAMILY_MEMBER';
export const DELETE_FAMILY_MEMBER = 'DELETE_FAMILY_MEMBER';
export const DELETE_FAMILY_MEMBER_BY_SID = 'DELETE_FAMILY_MEMBER_BY_SID';

export const fetchFamilyMembers = () => async (dispatch) => {
  const response = await api.fetchFamilyMembers();
  dispatch({ type: FETCH_FAMILY_MEMBERS, payload: response.data });
};
export const fetchFamilyMemberById = (id) => async (dispatch) => {
  const response = await api.fetchFamilyMemberById(id);
  dispatch({ type: FETCH_FAMILY_MEMBER, payload: response.data });
};
export const fetchFamilyMemberByStudentId = (id) => async (dispatch) => {
  const response = await api.fetchFamilyMemberByStudentId(id);console.log('fetchFamilyMemberByStudentId:',response);
  dispatch({ type: FETCH_FAMILY_MEMBER_SID, payload: response.data });
};

export const addFamilyMember = (familyMember) => async (dispatch) => {
  const response = await api.addFamilyMember(familyMember);
  dispatch({ type: ADD_FAMILY_MEMBER, payload: response.data });
};
export const addFamilyMemberBySID = (id, familyMember) => async (dispatch) => {
  const response = await api.addFamilyMemberBySID(id, familyMember);
  dispatch({ type: ADD_FAMILY_MEMBER_SID, payload: response.data });
};

export const editFamilyMember = (id, familyMember) => async (dispatch) => {
  const response = await api.updateFamilyMember(id, familyMember);
  dispatch({ type: UPDATE_FAMILY_MEMBER, payload: response.data });
};

export const deleteFamilyMember = (id) => async (dispatch) => {
  const response = await api.deleteFamilyMember(id);
  dispatch({ type: DELETE_FAMILY_MEMBER, payload: response.data });
};

export const deleteFamilyMemberBySID = (id) => async (dispatch) => {
  const response = await api.deleteFamilyMemberBySID(id);
  dispatch({ type: DELETE_FAMILY_MEMBER_BY_SID, payload: response.data });
};