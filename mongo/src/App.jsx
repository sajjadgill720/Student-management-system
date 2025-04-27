import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = (query) => {
    setLoading(true);
    fetch(`http://localhost:5000/api/${query}`)
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        setLoading(false);
      });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Dashboard</h1>
      </header>

      <main className="app-main">
        <div className="layout-container">
          <div className="query-container">
            <div className="button-group">
              <button onClick={() => fetchStudents('students/cs')}>CS Department</button>
              <button onClick={() => fetchStudents('students/age/25')}>Older than 25</button>
              <button onClick={() => fetchStudents('students/cgpa/2.7')}>CGPA >= 2.7</button>
              <button onClick={() => fetchStudents('students/departments')}>Math or Physics</button>
              <button onClick={() => fetchStudents('students/name/a')}>Name starts with 'A'</button>
              <button onClick={() => fetchStudents('students/count')}>Count by Department</button>
              <button onClick={() => fetchStudents('students/sort/cgpa')}>Sort by CGPA</button>
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading student data...</p>
              </div>
            ) : (
              <div className="student-grid">
                {students.map((student, index) => (
                  <div 
                    className="student-card" 
                    key={student._id || index}
                    style={{ '--i': index }}
                  >
                    {student.department && student.count !== undefined ? (
                      <>
                        <h2>{student.department}</h2>
                        <p><strong>Student Count:</strong> {student.count}</p>
                      </>
                    ) : (
                      <>
                        <h2>{student.name}</h2>
                        <p><strong>Age:</strong> {student.age}</p>
                        <p><strong>Department:</strong> {student.department}</p>
                        <p><strong>CGPA:</strong> {student.CGPA}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Student Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
