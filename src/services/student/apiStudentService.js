import axiosInstance from '../../axiosConfig';

// const res = axiosInstance.get('/students').then(res=>{console.log('getStudents:', res) });
export const getStudents = () => { return axiosInstance.get('/Students'); };
export const getStudentById = (id) => { return axiosInstance.get(`/Students/${id}`); };
export const createStudent = (student) => { return axiosInstance.post(`/Students`, student); };
export const updateStudent = (id, student) => { return axiosInstance.put(`/Students/${id}`, student); };
export const deleteStudent = (id) => { return axiosInstance.delete(`/Students/${id}`); };
export const approveStudent = (id) => { return axiosInstance.get(`/Students/ApproveStudent/${id}`); };
