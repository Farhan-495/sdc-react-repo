import React, { useState } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import StudentCard from './components/StudentCard';
import './App.css';

// Separate view component for individual student profile page
function StudentDetailsView({ students }) {
  const { id } = useParams();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-danger">Student Record Not Found</h4>
        <Link to="/" className="btn btn-success mt-3">Back to Directory</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Link to="/" className="btn btn-outline-secondary mb-4">
        ← Back to Student Directory
      </Link>
      
      <div className="card shadow-sm p-4 border-0 rounded-3">
        <h3 className="fw-bold text-dark">{student.name}</h3>
        <p className="text-secondary"><strong>Roll Number:</strong> {student.id}</p>
        <p className="text-secondary"><strong>Major:</strong> {student.major}</p>
        <p className="text-secondary"><strong>Semester:</strong> {student.semester}</p>
        <p className="text-secondary"><strong>CGPA:</strong> {student.gpa}</p>
      </div>
    </div>
  );
}

function App() {
  // Pakistani Student Data
  const [students, setStudents] = useState([
    { id: '21P-8012', name: 'Muhammad Ali', major: 'Computer Science', semester: '4th', gpa: 3.82 },
    { id: '21P-8045', name: 'Fatima Khan', major: 'Software Engineering', semester: '4th', gpa: 3.75 },
    { id: '21P-8090', name: 'Hamza Ahmed', major: 'Artificial Intelligence', semester: '4th', gpa: 3.40 },
    { id: '21P-8112', name: 'Ayesha Raza', major: 'Cyber Security', semester: '4th', gpa: 3.91 },
  ]);

  const [showAlert, setShowAlert] = useState(true);

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">

      {/* 1. Header / Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-3">
        <div className="container">
          <Link className="navbar-brand fw-bold text-success fs-4" to="/">
            <i className="bi bi-mortarboard-fill me-2"></i>PakPortal
          </Link>
          
          <div className="collapse navbar-collapse" id="portalNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link active fw-bold" to="/">Students</Link></li>
              <li className="nav-item"><a className="nav-link" href="#">Courses</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Examinations</a></li>
            </ul>

            <div className="d-flex align-items-center gap-2">
              <span className="text-white-50 small me-2">Admin Settings ▼</span>
              <div className="input-group input-group-sm" style={{ width: '220px' }}>
                <input type="text" className="form-control" placeholder="Search Roll No..." />
                <button className="btn btn-success" type="button">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Main Content & Router View Setup */}
      <div className="container my-4 flex-grow-1">
        <Routes>
          {/* Main Student Directory Route */}
          <Route path="/" element={
            <>
              {/* Breadcrumb Navigation */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-white p-3 rounded-3 shadow-sm border">
                  <li className="breadcrumb-item text-muted">Portal</li>
                  <li className="breadcrumb-item"><a href="#" className="text-decoration-none">Academic</a></li>
                  <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-success">Students</Link></li>
                  <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">Directory List</li>
                </ol>
              </nav>

              {/* Page Header */}
              <div className="d-flex justify-content-between align-items-center my-4">
                <div>
                  <h3 className="fw-bold mb-0 text-dark">Student Management Directory</h3>
                  <p className="text-muted small mb-0">Active Enrolled Students - Spring 2026</p>
                </div>
                <button className="btn btn-success px-3 shadow-sm">
                  <i className="bi bi-person-plus-fill me-2"></i>Add Student Record
                </button>
              </div>

              {/* Student Cards Grid */}
              <div className="row">
                {students.map(student => (
                  <StudentCard key={student.id} student={student} onDelete={handleDelete} />
                ))}
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-center my-4">
                <ul className="pagination pagination-sm">
                  <li className="page-item disabled"><a className="page-link" href="#">Prev</a></li>
                  <li className="page-item active"><a className="page-link bg-success border-success" href="#">1</a></li>
                  <li className="page-item"><a className="page-link text-success" href="#">2</a></li>
                  <li className="page-item"><a className="page-link text-success" href="#">3</a></li>
                  <li className="page-item"><a className="page-link text-success" href="#">Next</a></li>
                </ul>
              </div>

              {/* Alert Notification */}
              {showAlert && (
                <div className="alert alert-success alert-dismissible fade show d-flex justify-content-between align-items-center shadow-sm" role="alert">
                  <div>
                    <i className="bi bi-check-circle-fill me-2"></i>
                    <strong>Success:</strong> Student database records synchronized successfully.
                  </div>
                  <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
                </div>
              )}
            </>
          } />

          {/* Router Route for Individual Student Details Page */}
          <Route path="/students/:id" element={<StudentDetailsView students={students} />} />
        </Routes>
      </div>

      {/* 3. Footer */}
      <footer className="bg-dark text-white py-4 mt-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-3">
              <h6 className="fw-bold text-success">Useful Links</h6>
              <ul className="list-unstyled text-white-50 small mb-0">
                <li className="mb-1"><a href="#" className="text-white-50 text-decoration-none">Main Campus Portal</a></li>
                <li className="mb-1"><a href="#" className="text-white-50 text-decoration-none">Department of Computer Science</a></li>
                <li className="mb-1"><a href="#" className="text-white-50 text-decoration-none">Academic Calendar</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none">Exam Results</a></li>
              </ul>
            </div>
            <div className="col-md-6">
              <h6 className="fw-bold text-success">Contact Support</h6>
              <p className="text-white-50 small mb-1">Lahore, Punjab, Pakistan</p>
              <p className="text-white-50 small mb-1">Phone: +92 (042) 111-128-128</p>
              <p className="text-white-50 small mb-0">Email: support@pakportal.edu.pk</p>
            </div>
          </div>
          <div className="text-center pt-3 mt-3 border-top border-secondary text-white-50 small">
            © 2026 Student Portal System. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
