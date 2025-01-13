// src/components/FamilyMemberForm.js
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Toaster } from '@blueprintjs/core';
import { json, useNavigate, useParams } from 'react-router-dom';
import { getFamilyMemberById, createFamilyMember, updateFamilyMember, addFamilyMemberBySID, } from '../../services/student/apiFamilyMemberService';
import axiosInstance from '../../axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { selectFamilyMember, selectFamilyMemberById, selectFamilyMemberBySID, selectFamilyMembers } from '../../redux/selectors/familyMemberSelectors';
import { selectStudents, selectStudent, selectStudentById } from '../../redux/selectors/studentSelectors';
import { addFamilyMember, editFamilyMember, fetchFamilyMemberById, fetchFamilyMemberByStudentId } from '../../redux/actions/familyMemberActions';
const AppToaster = Toaster.create({
    position: "top"
});

const FamilyMemberForm = ({ data, isEditMode, setIsModalOpen, role, setStudentID, newStudentID }) => {
    const studentId = isEditMode ? (data && data.id ? data.id : null) : (newStudentID ? newStudentID : null);
    // alert('FamilyMemberForm: ' + studentId);
    // console.log('FamilyMemberForm:', studentId, data, isEditMode, newStudentID);
    const disableButton = isEditMode ? !(isEditMode && role === "2") : false; //1.Admin, 2.Registrators
    const [isDisabled, setIsDisabled] = useState(disableButton); //1.Admin, 2.Registrators
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const prevFamilyMember = useRef();
    const [dataNationality, setDataNationality] = useState([]);
    const [dataRelationship, setDataRelationship] = useState([]);
    const studentsSelector = useSelector(selectStudents);
    const studentSelector = useSelector(selectStudents);
    // Use `useSelector` to fetch data from Redux
    // Use selector to get familyMember data from the store
    // const familyMember = useSelector((state) => (selectFamilyMemberBySID(state, studentId)));
    const familyMember = useSelector((state) => isEditMode ? state : null);
    // console.log('useSelector:', familyMember);

    // Dispatch fetch action on component mount or if familyMemberId changes
    useEffect(() => {
        if (isEditMode) {
            loadFamilyMember();
            // return () => {
            //     familyMember.dateOfBirth = familyMember.dateOfBirth ? familyMember.dateOfBirth.substring(0, 10) : ''
            //     setInitialValues(familyMember);
            //     console.log('initialValues1:', familyMember, initialValues);
            //     formik.setValues(familyMember);
            // };
        }
    }, [dispatch]);

    const loadFamilyMember = async () => {
        try {
            if (studentId)
                dispatch(fetchFamilyMemberByStudentId(studentId));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {

        }
    };

    // Define default initial values
    const defaultValues = {
        id: 0,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        nationalityId: '',
        relationshipId: '',
        studentId: '',
    };
    // Merge Redux data with default values (handle missing fields)
    const familyMemberId = familyMember && familyMember.students && familyMember.students.student && familyMember.students.student.ID ? familyMember.students.student.ID : '';
    const initialValues = familyMember && familyMember.familyMembers && familyMember.familyMembers.familyMember || defaultValues;
    const formatDOB = initialValues && initialValues.dateOfBirth ? initialValues.dateOfBirth.split("T")[0] : '';
    initialValues.dateOfBirth = formatDOB && formatDOB !== '' ? formatDOB : '';
    // const [initialValues, setInitialValues] = useState(familyMember || defaultValues);
    // console.log('initialValues00:', initialValues);
    // console.log('useSelector:initialValues::', initialValues, initialValues.dateOfBirth, studentId);
    const validationSchema = Yup.object({
        // familyMemberID: Yup.string().required('FamilyMember ID is required'),
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        nationalityId: Yup.string().required('Nationality is required'),
        dateOfBirth: Yup.date().required('Date of Birth is required'),
        relationshipId: Yup.string().required('Relationship is required'),
    });

    // Get today's date in the format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];

    const onSubmit = async (values) => {
        // console.log('selectStudent', studentsSelector, studentSelector)
        // alert('studentId:' + studentId);
        if (!studentId) { alert('Student data is required to add a family member!'); return; }
        //2023-07-31T12:44:55.403Z
        var updatedVal = values;
        // const studentId = updatedVal.studentId !== 0 ? updatedVal.studentId : 1;
        updatedVal.id = values.id ? values.id : 0;
        updatedVal.dateOfBirth = updatedVal.dateOfBirth ? updatedVal.dateOfBirth + 'T12:44:55.403Z' : '';
        updatedVal = JSON.stringify(updatedVal);
        // console.log('FamilyMemberForm::onSubmit:', familyMemberId, values, updatedVal);
        if (isEditMode) {
            try {
                await dispatch(editFamilyMember(values.id, updatedVal));
                // await updateFamilyMember(familyMemberId, updatedVal); // Update existing familyMember
                AppToaster.show({
                    message: "Family member edited successfully",
                    intent: "success",
                    timeout: 3000
                });
            } catch (error) {
                console.error('Failed to edit family member:', error);
            }

        } else {
            if (!studentId) {
                alert('Please add student before add a family member!');
                return;
            }

            try {
                await dispatch(addFamilyMemberBySID(studentId, updatedVal)); // Create new familyMember
                setStudentID(null);
                AppToaster.show({
                    message: "Family member added successfully",
                    intent: "success",
                    timeout: 3000
                });
            } catch (error) {
                console.error('Failed to add family member:', error);
            }
        }
        setIsDisabled(true);
        setIsModalOpen(false);
        //navigate('/'); // Redirect to familyMember list after submit
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true, // Reinitialize form when initialValues change
    });


    useEffect(() => {
        //axios.get("/data/nationality.json")
        axiosInstance.get('/Nationalities')
            .then((res) => { setDataNationality(res.data); })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios.get("/data/relationship.json")
            .then((res) => { setDataRelationship(res.data); })
            .catch((err) => console.log(err));
    }, []);

    // if (!familyMember) {
    //     return <p>Loading...</p>;
    // }

    return (
        <div className="form-group">
            <div className='modal-body' style={{ textAlign: 'center' }}>
                <div style={{ height: '20px' }}><h2>{isEditMode ? 'Edit Family Member' : 'Add Family Member'}</h2></div>
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
                            <label className='bp5-form-group label bp5-label'>Relationship</label>
                            <select name="relationshipId"
                                value={formik.values.relationshipId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="bp5-input">
                                <option key={0}>---select---</option>
                                {
                                    dataRelationship && dataRelationship.map((h, i) => (<option key={i} value={h.id}>{h.name}</option>))
                                }
                            </select>
                            {formik.touched.relationshipId && formik.errors.relationshipId && (
                                <div style={{ color: "red" }}>{formik.errors.relationshipId}</div>
                            )}
                        </div>
                        <div className='bp5-form-group'>
                            <label className='bp5-form-group label bp5-label'>Date of Birth</label>
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
                        <div className='bp5-form-group'>
                            <button className='bp5-button bp5-intent-primary' type="submit" disabled={isDisabled}>{isEditMode ? 'Update' : 'Add'} Family Member</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FamilyMemberForm;
