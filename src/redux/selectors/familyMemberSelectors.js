// src/redux/selectors/familyMemberSelectors.js
export const selectFamilyMembers = (state) => state.familyMembers.familyMembers;
export const selectFamilyMemberById = (state, id) =>
    state.familyMembers.familyMember ? state.familyMembers.familyMember :
        state.familyMembers.familyMembers.find((familyMember) => familyMember.id === id);
export const selectFamilyMemberBySID = (state, id) =>
    state.familyMembers.familyMember ? state.familyMembers.familyMember :
        state.familyMembers.familyMembers.filter((familyMember) => familyMember.studentId === id);
export const selectFamilyMember = (state) => state.familyMembers.familyMember;
// {    console.log('selectFamilyMember:', state);    return state.familyMembers.familyMember;}
// export const selectFamilyMemberBySID = (state, id) => {
//     console.log('selectFamilyMemberBySID:', state.familyMembers.familyMembers, state.familyMembers.familyMember);
//     return state.familyMembers.familyMember ? state.familyMembers.familyMember :
//         state.familyMembers.familyMembers.filter((familyMember) => familyMember.studentId === id);
// }
