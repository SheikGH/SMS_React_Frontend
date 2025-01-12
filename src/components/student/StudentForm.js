// src/components/StudentForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { json, useNavigate, useParams } from 'react-router-dom';
import { getStudentById, createStudent, updateStudent, } from '../../services/student/apiStudentService';
import axiosInstance from '../../axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { selectStudentById, selectStudents } from '../../redux/selectors/studentSelectors';
import { addStudent, editStudent, fetchStudentById } from '../../redux/actions/studentActions';

const StudentForm = ({ student, isEditMode, onSave, role }) => {

    // const { studentId } = useParams(); // Retrieve ID from URL for edit
    const isDisabled = isEditMode && role !== "2"; //1.Admin, 2.Registrators
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const students = useSelector(selectStudents);
    // const student = useSelector(selectStudentById(state,, studentId));
    // Use selector to get student data from the store
    // const student = useSelector((state) => { return data ? data : selectStudentById(state, studentId) });
    console.log('StudentForm::data:student:::', student, isEditMode, role);
    const [dataNationality, setDataNationality] = useState([]);
    // const [initialValues, setInitialValues] = useState({
    //     firstName: student?.firstName || '',
    //     lastName: student?.lastName || '',
    //     dateOfBirth: student?.dateOfBirth || '',
    //     nationalityId: student?.dateOfBirth || 0,
    //     nationality: {
    //         id: 0,
    //         name: ''
    //     }
    // });


    const validationSchema = Yup.object({
        // studentID: Yup.string().required('Student ID is required'),
        firstName: Yup.string().required('First Name is required')
            .min(3, "Name must be at least 3 characters")
            .max(50, "Must be 50 characters or less"),
        lastName: Yup.string().required('Last Name is required').min(3, "Name must be at least 3 characters"),
        nationalityId: Yup.string().required('Nationality is required'),
        dateOfBirth: Yup.date().required('Date of Birth is required'),
    });

    // const onSubmit1 = async (values, { resetForm }) => {
    //     //2023-07-31T12:44:55.403Z
    //     var updatedVal = values;
    //     updatedVal.ID = studentId ? studentId : 0;
    //     updatedVal.dateOfBirth = updatedVal.dateOfBirth ? updatedVal.dateOfBirth + 'T12:44:55.403Z' : '';
    //     // updatedVal.dateOfBirth ='';
    //     updatedVal.nationality = {
    //         id: values.nationalityId,
    //         name: ''
    //     }
    //     updatedVal = JSON.stringify(updatedVal);
    //     console.log('onSubmit:', studentId, values, updatedVal);
    //     console.log('Student Form Submitted:', values);
    //     resetForm(); // Clears the form
    //     if (studentId) {
    //         await dispatch(editStudent(studentId, updatedVal));
    //         // await updateStudent(studentId, updatedVal); // Update existing student
    //     } else {
    //         await dispatch(addStudent(updatedVal)); // Create new student
    //     }
    //     //navigate('/'); // Redirect to student list after submit
    // };

    const formik = useFormik({
        initialValues: {
            id: student?.id || 0,
            firstName: student?.firstName || '',
            lastName: student?.lastName || '',
            dateOfBirth: student?.dateOfBirth || '',
            nationalityId: student?.dateOfBirth || '',
            nationality: {
                id: 0,
                name: ''
            }
        },
        validationSchema,
        // onSubmit,
        onSubmit: (values) => {
            console.log('StudentForm:onSave', values);
            onSave({ ...student, ...values });
        },
        enableReinitialize: true, // Reinitialize form when initialValues change
    });

    // useEffect(() => {
    //     if (studentId) {
    //         console.log('initialValues0:', studentId, initialValues);
    //         dispatch(fetchStudentById(studentId));
    //         console.log('initialValues1:', student, initialValues);
    //         student.dateOfBirth = student.dateOfBirth ? student.dateOfBirth.substring(0, 10) : ''
    //         setInitialValues(student);
    //         console.log('initialValues2:', student, initialValues);
    //         // getStudentById(studentId).then(({ data }) => {
    //         //     data.dateOfBirth = data.dateOfBirth ? data.dateOfBirth.substring(0, 10) : ''
    //         //     setInitialValues(data);
    //         //     console.log('initialValues:', data, initialValues);
    //         // });
    //     }
    // }, [studentId]);
    // Dispatch fetch action on component mount or if studentId changes

    // useEffect(() => {
    //     if (studentId) {
    //         loadStudent();
    //     }
    // }, [dispatch]);

    // const loadStudent = async () => {
    //     try {
    //         dispatch(fetchStudentById(studentId));

    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     } finally {

    //     }
    // };
    // useEffect(() => {
    //     if (student) {
    //         student.dateOfBirth = student.dateOfBirth ? student.dateOfBirth.substring(0, 10) : ''
    //         setInitialValues(student);
    //         console.log('initialValues1:', student, initialValues);
    //     }
    // }, [student]);

    useEffect(() => {
        axios
            .get("/data/nationality.json")
            .then((res) => { setDataNationality(res.data); })
            .catch((err) => console.log(err));
    }, []);

    const handleAddClick = () => {

    }

    // if (!student) {
    //     return <p>Loading...</p>;
    // }

    return (
        <div className="form-group">
            <div className='modal-body' style={{ textAlign: 'center' }}>
                <div style={{height:'20px'}}><h2>{isEditMode ? 'Edit Student' : 'Add Student'}</h2></div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='bp5-form-row' style={{ display: 'block', width: 600, padding: 10, textAlign: 'left', marginLeft: '3%' }}>
                        {/* <div>
        <label className='bp5-form-group label bp5-label'>Student ID</label>
        <input
          type="text"
          name="studentID"
          value={formik.values.studentID}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.studentID && formik.errors.studentID && (
          <div>{formik.errors.studentID}</div>
        )}
      </div> */}

                        <div className='bp5-form-group'>
                            <label className='bp5-form-group label bp5-label'>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="bp5-input"
                            />
                            {formik.touched.firstName && formik.errors.firstName && (
                                <div style={{ color: "red" }}>{formik.errors.firstName}</div>
                            )}
                        </div>

                        <div className='bp5-form-group'>
                            <label className='bp5-form-group label bp5-label'>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="bp5-input"
                            />
                            {formik.touched.lastName && formik.errors.lastName && (
                                <div style={{ color: "red" }}>{formik.errors.lastName}</div>
                            )}
                        </div>
                        <div className='bp5-form-group'>
                            <label className='bp5-form-group label bp5-label'>Nationality</label>
                            <select name="nationalityId"
                                value={formik.values.nationalityId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="bp5-input">
                                <option key={0}>---select---</option>
                                {
                                    dataNationality && dataNationality.map((h, i) => (<option key={i} value={h.id}>{h.name}</option>))
                                }
                            </select>
                            {formik.touched.nationalityId && formik.errors.nationalityId && (
                                <div style={{ color: "red" }}>{formik.errors.nationalityId}</div>
                            )}
                        </div>

                        <div className='bp5-form-group'>
                            <label className='bp5-form-group label bp5-label'>Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formik.values.dateOfBirth}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="bp5-input"
                            />
                            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                                <div style={{ color: "red" }}>{formik.errors.dateOfBirth}</div>
                            )}
                        </div>
                        <div style={{height:'70px'}}>
                            
                        </div>
                        <div className='bp5-form-group'>
                            <button className='bp5-button bp5-intent-primary' type="submit" disabled={isDisabled}>{isEditMode ? 'Update' : 'Add'} Student</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;
