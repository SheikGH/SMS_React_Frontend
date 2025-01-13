import React from "react";
import StudentForm from "../../components/student/StudentForm";
import FamilyMemberForm from "../../components/student/FamilyMemberForm";
import { useParams } from "react-router";
import CloseButton from "../../components/common/button/CloseButton";

const StudentModal = ({ data, isEditMode, onSave, onClose, setIsModalOpen, userRole, onDelete, onApprove, setStudentID, studentID, isApproveDisabled }) => {
    // const { studentId } = useParams();
    const approveStatus = isEditMode ? data.status : null;
    // const disableApproveButton = isEditMode ? !(isEditMode && role === "2" && student.Status === "Approved") : false; //1.Admin, 2.Registrators
    // const [isDisabledApproveButton, setIsDisabledApproveButton] = useState(disableApproveButton);
    // if (!data) return null;
    // console.log('StudentModal::OnLoad', data, isEditMode, userRole, approveStatus);
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    background: "#fff",
                    padding: "10px",
                    borderRadius: "5px",
                    minWidth: "90%",
                    maxHeight: "100%"
                }}
            >
                <div className='bp5-form-group1' style={{ width: '100%', flexDirection: 'row' }}>
                    <div style={{ width: '95%', textAlign: 'right', float: 'left' }}><h1 style={{ width: '90%', textAlign: 'center' }}>Student Details</h1></div>
                    <div style={{ width: '5%', textAlign: 'right', float: 'left' }}><CloseButton onClose={onClose} /></div>
                </div>
                <div style={{ clear: 'both', height: '1px', borderBottom: 'solid 2px gray' }}></div>
                <div>
                    <div style={{ float: 'left' }}><StudentForm student={data} isEditMode={isEditMode} onSave={onSave} role={userRole} /></div>
                    <div style={{ float: 'left' }}><FamilyMemberForm data={data} isEditMode={isEditMode} setIsModalOpen={setIsModalOpen} role={userRole} setStudentID={setStudentID} newStudentID={studentID} /></div>
                </div>
                {/* <div style={{ clear: 'both', height: '10px', textAlign: 'center' }}>
                    <div><button onClick={onClose}>Close</button></div>
                </div> */}
                <div style={{ clear: 'both', height: '5px', textAlign: 'center' }}></div>
                <div className='bp5-form-group'>
                    {isEditMode && userRole === "2" && approveStatus === "Approved" ? <button className='bp5-button bp5-intent-danger' type="button" onClick={() => onDelete(data.id)}>Delete</button> : ''}
                </div>
                <div className='bp5-form-group'>
                    {isEditMode && userRole === "2" && approveStatus !== "Approved" ? <button className='bp5-button bp5-intent-danger' type="button" onClick={() => onApprove(data.id)} disabled={isApproveDisabled}>Approve</button> : ''}
                </div>
                <div style={{ clear: 'both', height: '5px' }}></div>
            </div>
        </div>
    );
};

export default StudentModal;
