import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function StudentCard(props) {
  // Support both passing individual props or a student object
  const student = props.student || props;
  const { id, name, program, major, semester, gpa, onDelete } = student;

  // Display major or program depending on what was passed
  const departmentName = major || program || 'Computer Science';

  // State for view counter and detail toggle
  const [views, setViews] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const handleView = () => {
    setViews((prev) => prev + 1);
  };

  // Color badging for GPA (if GPA exists)
  const getGpaBadge = (gpaVal) => {
    if (gpaVal >= 3.7) return 'bg-success';
    if (gpaVal >= 3.0) return 'bg-info text-dark';
    return 'bg-warning text-dark';
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 mb-4">
      <div className="card h-100 shadow-sm border-0 rounded-3">
        {/* Avatar Header */}
        <div className="bg-light py-4 border-bottom text-center rounded-top">
          <div 
            className="rounded-circle bg-dark text-white d-inline-flex align-items-center justify-content-center shadow-sm"
            style={{ width: '75px', height: '75px', fontSize: '1.8rem' }}
          >
            <i className="bi bi-person-fill"></i>
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-center fw-bold text-dark mb-3">
            {name || 'Jane Doe'}
          </h5>

          <div className="small text-secondary mb-3">
            {id && <p className="mb-1"><strong>Roll No:</strong> {id}</p>}
            <p className="mb-1"><strong>Department:</strong> {departmentName}</p>
            <p className="mb-1"><strong>Semester:</strong> {semester || 1}</p>
            
            {gpa !== undefined && (
              <p className="mb-1">
                <strong>CGPA: </strong>
                <span className={`badge ${getGpaBadge(gpa)} ms-1`}>{gpa}</span>
              </p>
            )}

            <p className="mb-1 fw-semibold text-primary">
              Profile Views: {views}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto d-flex flex-column gap-2">
            <div className="d-flex gap-2">
              {/* View Profile Button (Increments Counter) */}
              <button 
                className="btn btn-primary btn-sm w-100"
                onClick={handleView}
              >
                <i className="bi bi-eye me-1"></i> View Profile
              </button>

              {/* Toggle Details Button */}
              <button 
                className="btn btn-outline-secondary btn-sm w-100"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? 'Hide Details' : 'Show Details'}
              </button>
            </div>

            {/* React Router Link (Navigates to Student Details Page) */}
            <Link 
              to={`/students/${id || 1}`} 
              className="btn btn-outline-primary btn-sm w-100 mt-1"
            >
              <i className="bi bi-box-arrow-up-right me-1"></i> Open Router Profile
            </Link>

            {/* Expanded Details Section */}
            {showDetails && (
              <div className="p-2 bg-light rounded border small text-secondary mt-1">
                <p className="mb-1"><strong>Email:</strong> student@example.com</p>
                <p className="mb-0"><strong>Phone:</strong> 0300-1234567</p>
              </div>
            )}

            {/* Remove Action */}
            {onDelete && (
              <button 
                className="btn btn-outline-danger btn-sm w-100 mt-1"
                onClick={() => onDelete(id)}
              >
                <i className="bi bi-trash me-1"></i> Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;
