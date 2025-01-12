import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import Student from './pages/student/Student';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import StudentList from './components/student/StudentList';
import StudentForm from './components/student/StudentForm';
import FamilyMemberForm from './components/student/FamilyMemberForm';
import StudentLanding from './pages/student/StudentLanding';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUserName] = useState(localStorage.getItem('username') || '');

  const handleLogout = () => {
    setToken('');
    setUserName('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          await axios.get(process.env.REACT_APP_API_URL + '/students', {
            headers: { Authorization: token }
          });
        } catch (error) {
          handleLogout();
        }
      }
    };
    checkToken();
  }, [token]);

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <ToastContainer theme='dark' position='top-center' />
          <Header token={token} setToken={setToken} username={username} setUserName={setUserName} />
          <div id="page-wrapper">
            <div className="container-fluid">
              <div className="panel panel-default">
                <div className="panel-body"></div>
                <Routes>
                  <Route path="/" element={<Student setToken={setToken} />} />
                  <Route path="/student" element={<PrivateRoute token={token}><Student /></PrivateRoute>} />
                  <Route path="/studentlist" element={<StudentList />} />
                  <Route path="/studentadd" element={<StudentForm />} />
                  <Route path="/studentedit/:studentId" element={<StudentForm />} />
                  <Route path="/familyadd" element={<FamilyMemberForm />} />
                  <Route path="/familyedit/:familyMemberId" element={<FamilyMemberForm />} />
                  <Route path="/studentlanding" element={<StudentLanding />} />
                </Routes>
              </div>
            </div>
          </div>
          <Footer />
        </Router >
      </div>
    </Provider>
  );
};

const PrivateRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/" />;
};
export default App;