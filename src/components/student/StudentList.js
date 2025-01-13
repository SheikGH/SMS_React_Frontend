// src/components/StudentList.js
import './Student.css'
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Toaster } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, deleteStudent } from '../../redux/actions/studentActions';
import { selectStudents } from '../../redux/selectors/studentSelectors';

const AppToaster = Toaster.create({
  position: "top"
});

const StudentList = ({ students, onRowClick }) => {
  // console.log('StudentList::onRowClick:', students, onRowClick);
  const dispatch = useDispatch();
  // const students = useSelector(selectStudents);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   dispatch(fetchStudents());
  //   setIsLoading(false);  // Set loading to false after data is fetched or error occurs
  // }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
    AppToaster.show({
      message: "Student deleted sucessfully",
      intent: "success",
      timeout: 3000
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
 
  const sortedData = React.useMemo(() => {
    let sortableData = students && students.length > 0 ? [...students] : [];
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
    // alert('requestSort');
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // if (isLoading) { return <div>Loading...</div>; } // Render a loader while waiting

  return (
    <div className="container-fluid">
      <div className='modal-body' style={{ textAlign: 'center' }}>
        {/* <h2>Student List</h2> */}

        {/* <Button intent='success' onClick={handleClick}>Add Student</Button> */}
        {students && students.length > 0 ?
          (<Fragment>
            <div style={{paddingLeft:'20px',paddingRight:'20px'}}>
              <table className='table-collapse' border="1" style={{ width: "100%", textAlign: "left" }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th onClick={() => requestSort('firstName')}>First Name</th>
                    <th onClick={() => requestSort('lastName')}>Last Name</th>
                    <th onClick={() => requestSort('dateOfBirth')}>Date Of Birth</th>
                    <th onClick={() => requestSort('nationalityName')}>Nationality</th>
                    {/* <th><Link intent='success' className='bp5-button bp5-intent-success' to="/studentadd">Add Student</Link></th> */}
                  </tr>
                </thead>
                <tbody>
                  {
                    currentData.map(student =>
                      <tr key={student.id}
                        onClick={() => onRowClick(student)} style={{ cursor: "pointer" }}>
                        <td>{student.id}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString().slice(0, 13) : ''}</td>
                        <td>{student.nationalityName}</td>
                        {/* <td>
                          <Button intent='primary' onClick={() => updateUser(user.id)}>Update</Button>&nbsp;
                                                <Button intent='danger' onClick={() => deleteUser(user.id)}>Delete</Button>
                          <Link intent='primary' className='bp5-button bp5-intent-primary' to={`/studentedit/${student.id}`}>Edit</Link>
                          &nbsp;<Button intent='danger' onClick={() => handleDelete(student.id)}>Delete</Button>
                        </td> */}
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
