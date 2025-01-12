// src/components/StudentForm.js
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { json, useNavigate, useParams } from 'react-router-dom';
import {
    getStudentById,
    createStudent,
    updateStudent,
} from '../../services/student/apiStudentService';

const StudentForm = () => {
    const { id } = useParams(); // Retrieve ID from URL for edit
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        // studentID: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
    });

    const validationSchema = Yup.object({
        // studentID: Yup.string().required('Student ID is required'),
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        dateOfBirth: Yup.date().required('Date of Birth is required'),
    });

    const onSubmit = async (values) => {
        //2023-07-31T12:44:55.403Z
        var updatedVal = values;
        updatedVal.studentId  = id;
        updatedVal.dateOfBirth = updatedVal.dateOfBirth ? updatedVal.dateOfBirth + 'T12:44:55.403Z' : '';
        // updatedVal.dateOfBirth ='';
        updatedVal = JSON.stringify(updatedVal);
        console.log('onSubmit:', id, values,updatedVal);
        if (id) {
            await updateStudent(id, updatedVal); // Update existing student
        } else {
            await createStudent(updatedVal); // Create new student
        }
        //navigate('/'); // Redirect to student list after submit
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true, // Reinitialize form when initialValues change
    });

    useEffect(() => {
        if (id) {
            getStudentById(id).then(({ data }) => {
                data.dateOfBirth = data.dateOfBirth ? data.dateOfBirth.substring(0, 10) : ''
                setInitialValues(data);
                console.log('initialValues:', data, initialValues);
            });
        }
    }, [id]);

    return (
        <div className="form-group">
            <div className='modal-body' style={{ textAlign: 'center' }}>
                <h2>{id ? 'Edit Student' : 'Add Student'}</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className='bp5-form-row' style={{ display: 'block', width: 600, padding: 30, textAlign: 'left', marginLeft: '30%' }}>
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
                                <div>{formik.errors.firstName}</div>
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
                                <div>{formik.errors.lastName}</div>
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
                                <div>{formik.errors.dateOfBirth}</div>
                            )}
                        </div>

                        <button type="submit">{id ? 'Update' : 'Add'} Student</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;
