// src/components/StudentList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, deleteStudent } from '../redux/actions/studentActions';
import { selectStudents } from '../redux/selectors/studentSelectors';

const StudentList = () => {
  const dispatch = useDispatch();
  const students = useSelector(selectStudents);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.firstName} {student.lastName} - {student.nationality}
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
