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
    const disableButton = isEditMode ? !(isEditMode && role === "2") : false; //1.Admin, 2.Registrators
    const [isDisabledButton, setIsDisabledButton] = useState(disableButton);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // console.log('StudentForm::data:student:::', student, isEditMode, role);
    const [dataNationality, setDataNationality] = useState([]);

    // Get today's date in the format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];

    const validationSchema = Yup.object({
        // studentID: Yup.string().required('Student ID is required'),
        firstName: Yup.string().required('First Name is required')
            .min(3, "Name must be at least 3 characters")
            .max(50, "Must be 50 characters or less"),
        lastName: Yup.string().required('Last Name is required').min(3, "Name must be at least 3 characters"),
        nationalityId: Yup.string().required('Nationality is required'),
        dateOfBirth: Yup.date().required('Date of Birth is required'),
    });

    const formik = useFormik({
        initialValues: {
            id: student?.id || 0,
            firstName: student?.firstName || '',
            lastName: student?.lastName || '',
            dateOfBirth: student?.dateOfBirth.split("T")[0] || '', //"2023-07-31T12:44:55.403Z" input => 1798-12-31T00:00:00"
            nationalityId: student?.nationalityId || '',
            nationality: {
                id: student?.nationalityId,
                name: student?.nationalityName
            }
        },
        validationSchema,
        // onSubmit,
        onSubmit: (values) => {
            // console.log('StudentForm:onSave', values);
            setIsDisabledButton(true);
            onSave({ ...student, ...values });
        },
        enableReinitialize: true, // Reinitialize form when initialValues change
    });

    useEffect(() => {
        //axios.get("/data/nationality.json")
        axiosInstance.get('/Nationalities')
            .then((res) => { setDataNationality(res.data); })
            .catch((err) => console.log(err));
    }, []);


    // if (!student) {
    //     return <p>Loading...</p>;
    // }

    return (
        <div className="form-group">
            <div className='modal-body' style={{ textAlign: 'center' }}>
                <div style={{ height: '20px' }}><h2>{isEditMode ? 'Edit Student' : 'Add Student'}</h2></div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='bp5-form-row' style={{ display: 'block', width: 600, padding: 10, textAlign: 'left', marginLeft: '3%' }}>
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
                            <label className='bp5-form-group bp5-label'>Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formik.values.dateOfBirth}
                                max={today} // Restricts future dates
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="bp5-input"
                            />
                            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                                <div style={{ color: "red" }}>{formik.errors.dateOfBirth}</div>
                            )}
                        </div>
                        <div style={{ height: '70px' }}>

                        </div>
                        <div className='bp5-form-group'>
                            <button className='bp5-button bp5-intent-primary' type="submit" disabled={isDisabledButton}>{isEditMode ? 'Update' : 'Add'} Student</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;
