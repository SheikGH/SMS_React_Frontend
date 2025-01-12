
import axiosInstance from '../../axiosConfig';

export const fetchFamilyMembers = () => axiosInstance.get(`/FamilyMembers`);
export const fetchFamilyMemberById = (id) => { return axiosInstance.get(`/FamilyMembers/${id}`); };
export const fetchFamilyMemberByStudentId = (id) => { return axiosInstance.get(`/Students/${id}/FamilyMembers`); };
export const addFamilyMember = (familyMember) => axiosInstance.post(`/FamilyMembers`, familyMember);
export const addFamilyMemberBySID = (id, familyMember) => axiosInstance.post(`/Students/${id}/FamilyMembers`, familyMember);
export const updateFamilyMember = (id, familyMember) => axiosInstance.put(`/FamilyMembers/${id}`, familyMember);
export const deleteFamilyMember = (id) => axiosInstance.delete(`/FamilyMembers/${id}`);
export const deleteFamilyMemberBySID = (id) => axiosInstance.delete(`/FamilyMembers/DeleteFamilyMemberBySID/${id}`);
