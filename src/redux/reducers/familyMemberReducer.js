// src/redux/reducers/familyMemberReducer.js
import { FETCH_FAMILY_MEMBERS, FETCH_FAMILY_MEMBER, FETCH_FAMILY_MEMBER_SID, ADD_FAMILY_MEMBER, UPDATE_FAMILY_MEMBER, DELETE_FAMILY_MEMBER, ADD_FAMILY_MEMBER_SID, DELETE_FAMILY_MEMBER_BY_SID } from '../actions/familyMemberActions';

const initialState = {
  familyMembers: [],
  familyMember: null,
};

const familyMemberReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAMILY_MEMBERS:
      return { ...state, familyMembers: action.payload };
    case FETCH_FAMILY_MEMBER:
      return { ...state, familyMember: action.payload };
    case FETCH_FAMILY_MEMBER_SID:
      return { ...state, familyMember: action.payload };
    case ADD_FAMILY_MEMBER:
      return { ...state, familyMembers: [...state.familyMembers, action.payload] };
    case ADD_FAMILY_MEMBER_SID:
      return { ...state, familyMembers: [...state.familyMembers, action.payload] };
    case UPDATE_FAMILY_MEMBER:
      return { ...state, familyMembers: state.familyMembers.map((familyMember) => familyMember.id === action.payload.id ? action.payload : familyMember) };
    case DELETE_FAMILY_MEMBER:
      return { ...state, familyMembers: state.familyMembers.filter((familyMember) => familyMember.id !== action.payload) };
    case DELETE_FAMILY_MEMBER_BY_SID:
      return { ...state, familyMembers: state.familyMembers.filter((familyMember) => familyMember.studentId !== action.payload) };
    default:
      return state;
  }
};

export default familyMemberReducer;
