import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [studentUsername, setStudentUsername] = useState('Student');
  const [employeeName, setEmployeeName] = useState('Admin User');
  const [currentTime, setCurrentTime] = useState('');

  // Update time for dashboard views
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      setCurrentTime(now.toLocaleDateString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const navigate = (view) => {
    setCurrentView(view);
  };

  // 1. Home View
  const renderHome = () => (
    <>
      <div className="top-bar">
        <svg viewBox="0 0 100 100" width="40" height="40" style={{ marginRight: '15px' }}>
          <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="5"/>
          <path d="M 25 35 L 75 35 L 50 75 Z" fill="none" stroke="white" strokeWidth="3"/>
          <text x="50" y="55" fill="white" fontSize="16" fontFamily="Arial" textAnchor="middle">CHCS</text>
        </svg>
        <h1>College Hostel Counselling System</h1>
      </div>

      <div className="hero-section">
        <h2>Welcome to the Hostel Portal</h2>
        <p>A digital initiative facilitating Faculty, Staff, and Students to access and process hostel services at one common platform.</p>
      </div>

      <div className="cards-container">
        <div onClick={() => navigate('student_login')} className="portal-card student">
          <div className="card-icon">
            <svg viewBox="0 0 64 64">
              <path d="M32 8L8 20L32 32L56 20L32 8Z M8 32v12l24 12 24-12V32" fill="#e0e0e0" stroke="#555" strokeWidth="2"/>
              <circle cx="32" cy="40" r="8" fill="#555"/>
            </svg>
          </div>
          <div className="card-content">
            <div className="card-title">Student</div>
            <div className="login-btn">➔</div>
          </div>
        </div>

        <div onClick={() => navigate('employee_login')} className="portal-card employee">
          <div className="card-icon">
            <svg viewBox="0 0 64 64">
              <circle cx="32" cy="20" r="12" fill="#ffd54f"/>
              <path d="M12 60c0-16 12-24 20-24s20 8 20 24" fill="#cfd8dc" stroke="#555" strokeWidth="2"/>
              <path d="M30 36 l 2 20 l 2 -20 Z" fill="#e53935"/>
            </svg>
          </div>
          <div className="card-content">
            <div className="card-title">Employee</div>
            <div className="login-btn">➔</div>
          </div>
        </div>
      </div>

      <div className="footer">
        Copyright © 2026 College Hostel Counselling System.
      </div>
    </>
  );

  // 2. Student Login View
  const renderStudentLogin = () => {
    const handleLogin = (e) => {
      e.preventDefault();
      const user = e.target.username.value;
      if (user) setStudentUsername(user);
      navigate('student_dashboard');
    };

    return (
      <>
        <div className="top-bar">
          <svg viewBox="0 0 100 100" width="40" height="40" style={{ marginRight: '15px' }}>
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="5"/>
            <path d="M 25 35 L 75 35 L 50 75 Z" fill="none" stroke="white" strokeWidth="3"/>
            <text x="50" y="55" fill="white" fontSize="16" fontFamily="Arial" textAnchor="middle">CHCS</text>
          </svg>
          <h1>College Hostel Counselling System</h1>
        </div>

        <div className="container-center">
          <div className="auth-box">
            <h2>Student Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Registration Number / Username</label>
                <input type="text" id="username" name="username" className="form-control" required />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" className="form-control" required />
              </div>

              <button type="submit" className="btn-primary">Login</button>
            </form>

            <div onClick={() => navigate('home')} className="btn-back" style={{textAlign: 'center', display: 'block', marginTop: '10px', cursor: 'pointer'}}>
              Back to Home
            </div>
          </div>
        </div>

        <div className="footer">
          Copyright © 2026 College Hostel Counselling System.
        </div>
      </>
    );
  };

  // 3. Employee Login View
  const renderEmployeeLogin = () => {
    const handleLogin = (e) => {
      e.preventDefault();
      const user = e.target.username.value;
      if (user) setEmployeeName(user);
      navigate('employee_dashboard');
    };

    return (
      <>
        <div className="top-bar">
          <svg viewBox="0 0 100 100" width="40" height="40" style={{ marginRight: '15px' }}>
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="5"/>
            <path d="M 25 35 L 75 35 L 50 75 Z" fill="none" stroke="white" strokeWidth="3"/>
            <text x="50" y="55" fill="white" fontSize="16" fontFamily="Arial" textAnchor="middle">CHCS</text>
          </svg>
          <h1>College Hostel Counselling System</h1>
        </div>

        <div className="container-center">
          <div className="auth-box">
            <h2 style={{ color: '#dba90f' }}>Employee Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Employee ID / Email</label>
                <input type="text" id="username" name="username" className="form-control" required />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" className="form-control" required />
              </div>

              <button type="submit" className="btn-primary" style={{ backgroundColor: '#dba90f', color: 'black', fontWeight: 'bold' }}>Login</button>
            </form>

            <div onClick={() => navigate('home')} className="btn-back" style={{textAlign: 'center', display: 'block', marginTop: '10px', cursor: 'pointer'}}>
              Back to Home
            </div>
          </div>
        </div>

        <div className="footer">
          Copyright © 2026 College Hostel Counselling System.
        </div>
      </>
    );
  };

  // 4. Student Dashboard View
  const renderStudentDashboard = () => (
    <>
      <div className="top-bar">
        <svg viewBox="0 0 100 100" width="40" height="40" style={{ marginRight: '15px' }}>
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="5"/>
            <path d="M 25 35 L 75 35 L 50 75 Z" fill="none" stroke="white" strokeWidth="3"/>
            <text x="50" y="55" fill="white" fontSize="16" fontFamily="Arial" textAnchor="middle">CHCS</text>
        </svg>
        <h1>College Hostel Counselling System <span>- Student Portal</span></h1>
      </div>

      <div className="dashboard-wrapper">
        <div className="sidebar">
          <div className="user-profile-sm">
            <svg viewBox="0 0 100 100" width="80" height="80" style={{ borderRadius: '50%', background: '#ddd', marginBottom: '10px' }}>
                <circle cx="50" cy="35" r="20" fill="#999" />
                <path d="M 20 90 Q 50 60 80 90" fill="none" stroke="#999" strokeWidth="10" strokeLinecap="round" />
            </svg>
            <div style={{ fontWeight: 'bold', color: '#333' }}>{studentUsername}</div>
          </div>
          <ul className="nav-menu">
            <li><a href="#" className="active" onClick={(e) => e.preventDefault()}>Dashboard Overview</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); alert("View Profile Module Placeholder"); }}>View Profile</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Room Details Module Placeholder"); }}>Room Details</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Fee Details Module Placeholder"); }}>Fee Details</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Mess Menu Module Placeholder"); }}>Mess Menu</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Apply Leave Module Placeholder"); }}>Apply Leave</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Register Complaint Module Placeholder"); }}>Register Complaint</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }} style={{ color: '#dc3545' }}>Logout</a></li>
          </ul>
        </div>
        
        <div className="dashboard-content">
          <div className="content-header">
            <h2>Welcome back!</h2>
            <span style={{ color: '#555', fontSize: '14px' }}>{currentTime}</span>
          </div>
          
          <div className="info-grid">
            <div className="info-card">
              <h3>Room Number</h3>
              <p>A-204</p>
            </div>
            <div className="info-card">
              <h3>Fee Status</h3>
              <p style={{ color: '#155724' }}>Paid</p>
            </div>
            <div className="info-card">
              <h3>Active Complaints</h3>
              <p>1</p>
            </div>
            <div className="info-card">
              <h3>Leave Requests</h3>
              <p>0</p>
            </div>
          </div>

          <div className="content-header">
            <h2>Quick Access</h2>
          </div>
          
          <div className="grid-cards">
            <div className="action-card" onClick={() => alert("Action triggered: View Profile")} style={{cursor: 'pointer'}}>
              <div className="action-card-title">View Profile</div>
            </div>
            <div className="action-card" onClick={() => alert("Action triggered: Room Details")} style={{cursor: 'pointer'}}>
              <div className="action-card-title">Room Details</div>
            </div>
            <div className="action-card" onClick={() => alert("Action triggered: Fee Details")} style={{cursor: 'pointer'}}>
              <div className="action-card-title">Fee Details</div>
            </div>
            <div className="action-card" onClick={() => alert("Action triggered: Mess Menu")} style={{cursor: 'pointer'}}>
              <div className="action-card-title">Mess Menu</div>
            </div>
            <div className="action-card" onClick={() => alert("Action triggered: Apply Leave")} style={{cursor: 'pointer'}}>
              <div className="action-card-title">Apply Leave</div>
            </div>
            <div className="action-card" onClick={() => alert("Action triggered: Register Complaint")} style={{cursor: 'pointer'}}>
              <div className="action-card-title">Register Complaint</div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        Copyright © 2026 College Hostel Counselling System.
      </div>
    </>
  );

  // 5. Employee Dashboard View
  const renderEmployeeDashboard = () => (
    <>
      <div className="top-bar">
        <svg viewBox="0 0 100 100" width="40" height="40" style={{ marginRight: '15px' }}>
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="5"/>
            <path d="M 25 35 L 75 35 L 50 75 Z" fill="none" stroke="white" strokeWidth="3"/>
            <text x="50" y="55" fill="white" fontSize="16" fontFamily="Arial" textAnchor="middle">CHCS</text>
        </svg>
        <h1>College Hostel Counselling System <span>- Employee Portal</span></h1>
      </div>

      <div className="dashboard-wrapper">
        <div className="sidebar">
          <div className="user-profile-sm">
            <svg viewBox="0 0 100 100" width="80" height="80" style={{ borderRadius: '50%', background: '#ddd', marginBottom: '10px' }}>
                <circle cx="50" cy="50" r="45" fill="#fcfcfc" stroke="#dba90f" strokeWidth="4"/>
                <circle cx="50" cy="35" r="18" fill="#555" />
                <path d="M 20 85 Q 50 55 80 85" fill="none" stroke="#555" strokeWidth="12" strokeLinecap="round" />
                <rect x="45" y="80" width="10" height="20" fill="#dba90f"/>
            </svg>
            <div style={{ fontWeight: 'bold', color: '#333' }}>{employeeName}</div>
            <div style={{ fontSize: '12px', color: '#555' }}>Hostel Manager</div>
          </div>
          <ul className="nav-menu">
            <li><a href="#" className="active" style={{ backgroundColor: '#dba90f', color: 'black' }} onClick={(e) => e.preventDefault()}>Dashboard Overview</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Manage Students triggered!"); }}>Manage Students</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Complaints Inbox triggered!"); }}>Complaints Inbox <span style={{ background: 'red', color: 'white', padding: '2px 6px', borderRadius: '10px', fontSize: '11px' }}>12</span></a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Leave Approvals triggered!"); }}>Leave Approvals <span style={{ background: 'red', color: 'white', padding: '2px 6px', borderRadius: '10px', fontSize: '11px' }}>5</span></a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Fee Records triggered!"); }}>Fee Records</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }} style={{ color: '#dc3545' }}>Logout</a></li>
          </ul>
        </div>
        
        <div className="dashboard-content">
          <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ color: '#dba90f' }}>Administration Dashboard</h2>
              <span style={{ color: '#555', fontSize: '14px' }}>{currentTime}</span>
            </div>
            <button className="btn-primary" style={{ backgroundColor: '#dba90f', color: 'black', width: 'auto', padding: '8px 15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Download Daily Report</button>
          </div>
          
          <div className="info-grid">
            <div className="info-card" style={{ borderLeftColor: '#dba90f' }}>
              <h3>Total Capacity</h3>
              <p>450 / 500</p>
            </div>
            <div className="info-card" style={{ borderLeftColor: '#dba90f' }}>
              <h3>Pending Complaints</h3>
              <p style={{ color: '#dc3545' }}>12 Active</p>
            </div>
            <div className="info-card" style={{ borderLeftColor: '#dba90f' }}>
              <h3>Leave Requests</h3>
              <p style={{ color: '#fd7e14' }}>5 Pending Approval</p>
            </div>
            <div className="info-card" style={{ borderLeftColor: '#dba90f' }}>
              <h3>Fee Deficit</h3>
              <p>₹1,25,000</p>
            </div>
          </div>

          <div className="content-header">
            <h2>Administrative Tasks</h2>
          </div>
          
          <div className="grid-cards">
            <div className="action-card" onClick={() => alert("Manage Students")} style={{ cursor: 'pointer' }}>
              <div className="action-card-title">Manage Students</div>
              <p style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>View profiles and assign rooms</p>
            </div>
            <div className="action-card" onClick={() => alert("Complaints")} style={{ cursor: 'pointer' }}>
              <div className="action-card-title">Complaints Inbox</div>
              <p style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>Resolve plumbing/electrical issues</p>
            </div>
            <div className="action-card" onClick={() => alert("Leave Approvals")} style={{ cursor: 'pointer' }}>
              <div className="action-card-title">Leave Approvals</div>
              <p style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>Grant/deny student absences</p>
            </div>
            <div className="action-card" onClick={() => alert("Fee Records")} style={{ cursor: 'pointer' }}>
              <div className="action-card-title">Fee Records</div>
              <p style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>Verify offline payments</p>
            </div>
          </div>
          
          <div className="profile-section" style={{ marginTop: '30px', background: 'white', border: '1px solid #ddd', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', padding: '20px' }}>
            <h3 style={{ marginBottom: '15px', color: '#333' }}>Recent Alerts</h3>
            <div className="table-responsive">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Severity</th>
                            <th>Module</th>
                            <th>Message</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span style={{ color: 'red', fontWeight: 'bold' }}>High</span></td>
                            <td>Maintenance</td>
                            <td>Broken pipe in Block A, 2nd floor bathroom. Plumber called.</td>
                            <td>10 mins ago</td>
                        </tr>
                        <tr>
                            <td><span style={{ color: 'orange', fontWeight: 'bold' }}>Medium</span></td>
                            <td>Leave</td>
                            <td>5 new emergency leave requests require approval.</td>
                            <td>1 hour ago</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>

        </div>
      </div>

      <div className="footer">
        Copyright © 2026 College Hostel Counselling System.
      </div>
    </>
  );

  return (
    <>
      {currentView === 'home' && renderHome()}
      {currentView === 'student_login' && renderStudentLogin()}
      {currentView === 'employee_login' && renderEmployeeLogin()}
      {currentView === 'student_dashboard' && renderStudentDashboard()}
      {currentView === 'employee_dashboard' && renderEmployeeDashboard()}
    </>
  );
}

export default App;
