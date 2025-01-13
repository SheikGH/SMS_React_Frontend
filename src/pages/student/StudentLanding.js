import StudentList from "../../components/student/StudentList";
import StudentModal from "./StudentModal";
import Modal from 'react-modal';
import { Button, Toaster } from '@blueprintjs/core';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchStudents, deleteStudent } from '../../redux/actions/studentActions';
import { selectStudents } from '../../redux/selectors/studentSelectors';
import { addStudent, editStudent, fetchStudentById } from '../../redux/actions/studentActions';
import { deleteFamilyMemberBySID } from "../../redux/actions/familyMemberActions";
import { approveStudent } from "../../services/student/apiStudentService";

Modal.setAppElement('#root');
const AppToaster = Toaster.create({
    position: "top"
});

const StudentLanding = () => {
    const dispatch = useDispatch();
    const students = useSelector(selectStudents);
    // const [students, setStudents] = useState(useSelector(selectStudents));
    const [isLoading, setIsLoading] = useState(true);
    // console.log('StudentLanding::students:', students);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [dataRole, setDataRole] = useState([]);
    const [userRole, setUserRole] = useState('1');
    const [studentID, setStudentID] = useState(null);
    const [isApproveDisabled, setIsApproveDisabled] = useState(false);

    useEffect(() => {
        dispatch(fetchStudents());
        setIsLoading(false);  // Set loading to false after data is fetched or error occurs
    }, [dispatch, isModalOpen]);

    useEffect(() => {
        axios
            .get("/data/role.json")
            .then((res) => { setDataRole(res.data); })
            .catch((err) => console.log(err));
    }, []);

    const handleRowClick = (student) => {
        setSelectedStudent(student);
        setIsEditMode(true);
        setIsModalOpen(true);
        setIsApproveDisabled(false);
    };

    const handleAddStudent = () => {
        setSelectedStudent(null);
        setIsEditMode(false);
        setIsModalOpen(true);
        setIsApproveDisabled(false);
    };

    const handleSave = async (values) => {
        // console.log('StudentLanding::handleSave:', values);
        //2023-07-31T12:44:55.403Z
        var updatedVal = values;
        updatedVal.dateOfBirth = updatedVal.dateOfBirth ? updatedVal.dateOfBirth + 'T12:44:55.403Z' : '';
        updatedVal.nationality = {
            id: values.nationalityId,
            name: ''
        }
        updatedVal = JSON.stringify(updatedVal);
        if (isEditMode) {
            // Update existing student
            // setStudents(  students.map((s) => (s.id === student.id ? student : s)) );
            try {
                const resultAction = await dispatch(editStudent(values.id, updatedVal));
                // console.log('onSubmit::editStudent:', values.id, updatedVal);
                AppToaster.show({
                    message: "Student edited successfully",
                    intent: "success",
                    timeout: 3000
                });
            } catch (error) {
                console.error('Failed to edit student:', error);
            }
        } else {
            // Add new student
            // setStudents([...students, { ...student, id: students.length + 1 }]);
            try {
                const resultAction = await dispatch(addStudent(updatedVal)); // Create new student
                // alert('Inserted Student with ID:' + resultAction + resultAction.id);
                // console.log('Inserted Student with ID:', resultAction, updatedVal);
                setStudentID(resultAction.id);
                AppToaster.show({
                    message: "Student added successfully",
                    intent: "success",
                    timeout: 3000
                });
            } catch (error) {
                console.error('Failed to add student:', error);
            }
        }
        // setIsModalOpen(false);
    };
    const handleDelete = async (id) => {
        try {
            // await dispatch(deleteStudent(id));
            await dispatch(deleteFamilyMemberBySID(id));
            AppToaster.show({
                message: "Student and Family member deleted successfully",
                intent: "success",
                timeout: 3000
            });
            setIsModalOpen(false);
            await dispatch(fetchStudents());
        } catch (error) {
            console.error('Failed to delete student and family member:', error);
        }
    }

    const handleApprove = async (id) => {
        try {
            //if (!isEditMode) { return; }
            setIsApproveDisabled(true);
            setSelectedStudent((prevState) => ({
                ...prevState,
                status: "Approved",
            }));
            AppToaster.show({
                message: "Student approved successfully",
                intent: "success",
                timeout: 3000
            });
            await dispatch(approveStudent(id));
        } catch (error) {
            console.error('Failed to approve student:', error);
        }
    }

    if (isLoading) { return <div>Loading...</div>; } // Render a loader while waiting
    if (!students) return;

    return (
        <div>
            <div className="bp5-input-group" style={{ padding: '20px' }}>
                <div style={{ width: '20%', float: 'left' }}>
                    <div className='bp5-form-group'>
                        <label className='bp5-form-group label bp5-label' style={{ float: 'left', marginRight: '15px;',textAlign:'left',fontWeight:'bold' }}>Role:</label>
                        <select style={{ float: 'left' }} name="roleId"
                            className="bp5-input"
                            onChange={(e) => { setUserRole(e.target.value); }}>
                            {/* <option key={0}>---select---</option> */}
                            {
                                dataRole && dataRole.map((h, i) => (<option key={i} value={h.id}>{h.name}</option>))
                            }
                        </select>
                    </div>
                </div>
                <div style={{ width: '60%', float: 'left' }}><h2>Student List</h2></div>
                <div style={{ width: '20%', float: 'left' }}><button className='bp5-button bp5-intent-success' onClick={handleAddStudent}>Add Student</button></div>
            </div>
            <div style={{ clear: "both" }}></div>
            <div style={{ clear: 'both', height: '10px', borderBottom: 'sold 4px black' }}></div>
            <div>
                <StudentList students={students} onRowClick={handleRowClick} />
                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                    <StudentModal
                        data={selectedStudent}
                        isEditMode={isEditMode}
                        onSave={handleSave}
                        onClose={() => setIsModalOpen(false)}
                        setIsModalOpen={setIsModalOpen}
                        userRole={userRole}
                        onDelete={handleDelete}
                        onApprove={handleApprove}
                        setStudentID={setStudentID}
                        studentID={studentID}
                        isApproveDisabled={isApproveDisabled} />
                </Modal>
                {/* {isModalOpen && (
                <StudentModal data={selectedRowData} onClose={handleCloseModal} />
            )} */}
            </div>
        </div>
    );
}

export default StudentLanding