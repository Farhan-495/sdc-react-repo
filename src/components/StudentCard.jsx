import React from 'react';

function StudentCard({ student, onDelete }) {
  // Color badging for GPA to make it look unique
  const getGpaBadge = (gpa) => {
    if (gpa >= 3.7) return 'bg-success';
    if (gpa >= 3.0) return 'bg-info text-dark';
    return 'bg-warning text-dark';
  };

  return (
    <div className="col-12 col-sm-6 col-md-3 mb-4">
      <div className="card h-100 shadow-sm border-0 rounded-3">
        {/* Profile Avatar Header */}
        <div className="bg-light py-4 border-bottom text-center rounded-top">
          <div 
            className="rounded-circle bg-dark text-white d-inline-flex align-items-center justify-content-center shadow-sm"
            style={{ width: '75px', height: '75px', fontSize: '1.8rem' }}
          >
            <i className="bi bi-person-fill"></i>
          </div>
        </div>

        {/* Details Body */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-center fw-bold text-dark mb-3">{student.name}</h5>
          
          <div className="small text-secondary mb-3">
            <p className="mb-1"><strong>Roll No:</strong> {student.id}</p>
            <p className="mb-1"><strong>Department:</strong> {student.major}</p>
            <p className="mb-1"><strong>Semester:</strong> {student.semester}</p>
            <p className="mb-1">
              <strong>CGPA: </strong> 
              <span className={`badge ${getGpaBadge(student.gpa)} ms-1`}>{student.gpa}</span>
            </p>
          </div>

          {/* Unique Action Buttons */}
          <div className="mt-auto d-flex gap-2">
            <button className="btn btn-outline-success btn-sm w-100">
              <i className="bi bi-eye me-1"></i> Profile
            </button>
            <button 
              className="btn btn-outline-danger btn-sm w-100" 
              onClick={() => onDelete(student.id)}
            >
              <i className="bi bi-trash me-1"></i> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;