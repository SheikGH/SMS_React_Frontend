import './Student.css'
import React, { Fragment, useEffect, useState } from 'react';
import { Button, EditableText, InputGroup, Toaster } from '@blueprintjs/core';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../../services/student/apiStudentService';

const AppToaster = Toaster.create({
    position: "top"
});

const Student = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: ''
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: ''
    });

    // const validateEmail = (email) => {
    //     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return re.test(String(email).toLowerCase());
    // };

    // const validatePhone = (phone) => {
    //     const re = /^[0-9\b]+$/;
    //     return re.test(String(phone));
    // };

    function trimJSONValues(obj) {
        if (typeof obj === 'string') {
            return obj.trim();
        } else if (Array.isArray(obj)) {
            return obj.map(item => trimJSONValues(item));
        } else if (typeof obj === 'object' && obj !== null) {
            const trimmedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    trimmedObj[key] = trimJSONValues(obj[key]);
                }
            }
            return trimmedObj;
        }
        return obj;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        //console.log('handleChange:', e.target, name, value);
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleClick = () => {
        const newErrors = {};
        if (!form.firstName) newErrors.firstName = 'First Name is required';
        if (!form.lastName) newErrors.lastName = 'Last Name is required';
        if (!form.dateOfBirth) newErrors.dateOfBirth = 'Date Of Birth is required';
        // if (!form.email) newErrors.email = 'Email is required';
        // else if (!validateEmail(form.email)) newErrors.email = 'Invalid email format';
        // if (!form.phone) newErrors.phone = 'Phone is required';
        // else if (!validatePhone(form.phone)) newErrors.phone = 'Invalid phone number';
        // if (!form.address) newErrors.address = 'Address is required';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // All fields are valid, proceed with form submission or other logic
            // console.log('Form submitted successfully:', form);
            if (form) {
                createStudent(JSON.stringify(trimJSONValues(form))).then(response => {
                    console.log('addStudent:', response.data);
                    const dataNew = {
                        studentId: students.length + 1,//response.data.studentId,
                        firstName: form.firstName,
                        lastName: form.lastName,
                        dateOfBirth: form.dateOfBirth
                    }
                    setStudents([...students, dataNew]);
                    setForm({
                        firstName: '',
                        lastName: '',
                        dateOfBirth: ''
                    });

                    AppToaster.show({
                        message: "Student added sucessfully",
                        intent: "success",
                        timeout: 3000
                    });
                })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }
        }
    };

    function onChangeHandler(id, key, value) {
        //console.log('onChangeHandler:', id, key, value);
        setStudents((students) => {
            return students.map(user => {
                return user.studentId === id ? { ...user, [key]: value } : user;
            })
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const  stud = getStudents(); console.log('stud:',stud);
                getStudents().then(response => {
                    console.log('getStudents:', response);
                    // Assuming the date is in the response data
                    setStudents(response.data)
                    //setIsLoading(false);  // Stop loading after data is set
                })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);  // Set loading to false after data is fetched or error occurs
            }
        };

        fetchData();
    }, []);

    function updateUser(id) {

        //if (id > 10) id = 10;
        const user = students.find((user) => user.studentId === id);
        if (id) {
            updateStudent(id, JSON.stringify(trimJSONValues(user)))
                .then(response => {
                    console.log('updateStudent', response);
                    if (response.status === 204) {
                        // Handle success (no content)
                        // console.log('Resource updated successfully');
                        AppToaster.show({
                            message: "Student updated sucessfully",
                            intent: "success",
                            timeout: 3000
                        })
                    }
                    else if (response.status === 200) {
                        // Ok(return content)
                        // console.log('Resource updated successfully');
                        AppToaster.show({
                            message: "Student updated sucessfully",
                            intent: "success",
                            timeout: 3000
                        })
                    } else {
                        // Handle other status codes
                        console.error('Failed to update resource');
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }

    function deleteUser(id) {
        deleteStudent(id)
            .then(response => {
                console.log('deleteStudent:', response);
                if (response.status === 204) {
                    // console.log('Resource deleted successfully');
                    setStudents((students) => {
                        return students.filter(user => user.studentId !== id)
                    })
                    AppToaster.show({
                        message: "Student deleted sucessfully",
                        intent: "success",
                        timeout: 3000
                    });
                } else {
                    console.error('Failed to delete the resource');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

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
    if (isLoading) {
        return <div>Loading...</div>;  // Render a loader while waiting
    }
    // if (!students || students.length === 0) return <div>Loading...</div>; // Render fallback content
    // Render data after it is fetched
    // { console.log('students1:', students, students.data) }
    return (
        <div className="form-group">
            <div className='modal-body' style={{ textAlign: 'center' }}>
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
                                        {/* <th onClick={() => requestSort('email')}>Email</th>
                    <th onClick={() => requestSort('phone')}>Phone</th>
                    <th onClick={() => requestSort('address')}>Address</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentData.map(user =>
                                            <tr key={user.studentId}>
                                                <td>{user.studentId}</td>
                                                <td><EditableText onChange={value => onChangeHandler(user.studentId, 'firstName', value)} value={user.firstName} /></td>
                                                <td><EditableText onChange={value => onChangeHandler(user.studentId, 'lastName', value)} value={user.lastName} /></td>
                                                <td><EditableText onChange={value => onChangeHandler(user.studentId, 'dateOfBirth', value)} value={new Date(user.dateOfBirth).toLocaleDateString().slice(0, 13)} /></td>
                                                {/* <td><EditableText onChange={value => onChangeHandler(user.studentId, 'email', value)} value={user.email} /></td>
                                <td><EditableText onChange={value => onChangeHandler(user.studentId, 'phone', value)} value={user.phone} /></td>
                                <td><EditableText onChange={value => onChangeHandler(user.studentId, 'address', value)} value={user.address} /></td> */}
                                                <td>
                                                    <Button intent='primary' onClick={() => updateUser(user.studentId)}>Update</Button>&nbsp;
                                                    <Button intent='danger' onClick={() => deleteUser(user.studentId)}>Delete</Button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <InputGroup
                                                name="firstName" value={form.firstName} onChange={handleChange}
                                                placeholder='Enter First Name...'
                                            />
                                        </td>
                                        <td>
                                            <InputGroup
                                                name="lastName" value={form.lastName} onChange={handleChange}
                                                placeholder='Enter Last Name...'
                                            />
                                        </td>
                                        <td>
                                            <InputGroup
                                                name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange}
                                                placeholder='Enter Date Of Birth...'
                                            />
                                        </td>
                                        {/* <td>
                            <InputGroup
                                name="email" value={form.email} onChange={handleChange}
                                placeholder='Enter Email...'
                            />
                        </td>
                        <td>
                            <InputGroup
                                name="phone" value={form.phone} onChange={handleChange}
                                placeholder='Enter Phone...' minLength='10' maxLength='10'
                            />
                        </td>
                        <td>
                            <InputGroup
                                name="address" value={form.address} onChange={handleChange}
                                placeholder='Enter Address...'
                            />
                        </td> */}
                                        <td><Button intent='success' onClick={handleClick}>Add Student</Button></td>
                                    </tr>
                                    <tr><td></td>
                                        <td>{errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}</td>
                                        <td>{errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}</td>
                                        {/* <td>{errors.dateOfBirth && <p style={{ color: 'red' }}>{errors.dateOfBirth}</p>}</td> */}
                                        {/* <td>{errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}</td>
                        <td>{errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}</td>
                        <td>{errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}</td> */}
                                        <td></td></tr>
                                </tfoot>
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
                    </Fragment>) : (
                        <Fragment>
                            <div>No Data Found</div>
                        </Fragment>
                    )}
            </div>
        </div>

    )
}

export default Student
