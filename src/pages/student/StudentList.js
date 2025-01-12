import './Student.css'
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Toaster } from '@blueprintjs/core';
import { getStudents, deleteStudent } from '../../services/student/apiStudentService';
import { Link } from 'react-router-dom';

const AppToaster = Toaster.create({
    position: "top"
});

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            const response = await getStudents();
            setStudents(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);  // Set loading to false after data is fetched or error occurs
        }
    };

    const handleDelete = async (id) => {
        await deleteStudent(id);
        AppToaster.show({
            message: "Student deleted sucessfully",
            intent: "success",
            timeout: 3000
        });
        loadStudents();
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const sortedData = React.useMemo(() => {
        let sortableData = students.lenght > 0 ? [...students] : [];
        // let sortableData = [...students];
        // console.log('sortableData:', students, sortableData);
        if (sortConfig !== null) {
            sortableData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return students;
    }, [students, sortConfig]);

    const currentData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const requestSort = key => {
        alert('requestSort');
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    if (isLoading) { return <div>Loading...</div>; } // Render a loader while waiting

    return (
        <div className="form-group">
            <div className='modal-body' style={{ textAlign: 'center' }}>
                <h2>Student List</h2>
                <Link intent='success' to="/studentadd">Add Student</Link>
                {/* <Button intent='success' onClick={handleClick}>Add Student</Button> */}
                {students && students.length > 0 ?
                    (<Fragment>
                        <div>
                            <table className='center'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th onClick={() => requestSort('firstName')}>First Name</th>
                                        <th onClick={() => requestSort('lastName')}>Last Name</th>
                                        <th onClick={() => requestSort('dateOfBirth')}>Date Of Birth</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentData.map(student =>
                                            <tr key={student.studentId}>
                                                <td>{student.studentId}</td>
                                                <td>{student.firstName}</td>
                                                <td>{student.lastName}</td>
                                                <td>{new Date(student.dateOfBirth).toLocaleDateString().slice(0, 13)}</td>
                                                <td>
                                                    {/* <Button intent='primary' onClick={() => updateUser(user.studentId)}>Update</Button>&nbsp;
                                                    <Button intent='danger' onClick={() => deleteUser(user.studentId)}>Delete</Button> */}
                                                    <Link intent='primary' className='primary' to={`/studentedit/${student.studentId}`}>Edit</Link>
                                                    <Button intent='danger' onClick={() => handleDelete(student.studentId)}>Delete</Button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <div>
                                <Button intent='default' onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                                    Previous
                                </Button>
                                <Button intent='default' onClick={() => setCurrentPage(prev => (currentData.length < itemsPerPage ? prev : prev + 1))}>
                                    Next
                                </Button>
                            </div>
                        </div>
                        <div>
                            <h2>Student List</h2>
                            <Link to="/studentadd">Add Student</Link>
                            <ul>
                                {students.map((student) => (
                                    <li key={student.studentID}>
                                        {student.firstName} {student.lastName}
                                        <button onClick={() => handleDelete(student.studentID)}>Delete</button>
                                        <Link to={`/studentedit/${student.studentID}`}>Edit</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Fragment>) : (
                        <Fragment>
                            <div>No Data Found</div>
                        </Fragment>
                    )}
            </div>
        </div>

    )
};

export default StudentList;
