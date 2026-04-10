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
    window.scrollTo(0, 0); // Reset scroll position when navigating
    setCurrentView(view);
  };

  // --- Shared Layout Components ---

  const TopBar = ({ portalName }) => (
    <div className="top-bar">
      <svg onClick={() => navigate('home')} viewBox="0 0 100 100" width="40" height="40" style={{ marginRight: '15px', cursor: 'pointer' }}>
          <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="5"/>
          <path d="M 25 35 L 75 35 L 50 75 Z" fill="none" stroke="white" strokeWidth="3"/>
          <text x="50" y="55" fill="white" fontSize="16" fontFamily="Arial" textAnchor="middle">CHCS</text>
      </svg>
      <h1>College Hostel Counselling System {portalName && <span>- {portalName}</span>}</h1>
    </div>
  );

  const Footer = () => (
    <div className="footer">
      Copyright © 2026 College Hostel Counselling System.
    </div>
  );

  const StudentLayout = ({ activeMenu, children }) => (
    <>
      <TopBar portalName="Student Portal" />
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
            <li><a href="#" className={activeMenu === 'dashboard' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('student_dashboard'); }}>Dashboard Overview</a></li>
            <li><a href="#" className={activeMenu === 'profile' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('stu_profile'); }}>View Profile</a></li>
            <li><a href="#" className={activeMenu === 'room' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('stu_room'); }}>Room Details</a></li>
            <li><a href="#" className={activeMenu === 'fees' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('stud_fees'); }}>Fee Details</a></li>
            <li><a href="#" className={activeMenu === 'mess' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('stu_mess'); }}>Mess Menu</a></li>
            <li><a href="#" className={activeMenu === 'leave' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('stu_leave'); }}>Apply Leave</a></li>
            <li><a href="#" className={activeMenu === 'complaint' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('stu_complaint'); }}>Register Complaint</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }} style={{ color: '#dc3545' }}>Logout</a></li>
          </ul>
        </div>
        <div className="dashboard-content">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );

  const EmployeeLayout = ({ activeMenu, children }) => (
    <>
      <TopBar portalName="Employee Portal" />
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
            <li><a href="#" className={activeMenu === 'dashboard' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('employee_dashboard'); }}>Dashboard Overview</a></li>
            <li><a href="#" className={activeMenu === 'students' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('emp_students'); }}>Manage Students</a></li>
            <li><a href="#" className={activeMenu === 'complaints' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('emp_complaints'); }}>Complaints Inbox <span style={{ background: 'red', color: 'white', padding: '2px 6px', borderRadius: '10px', fontSize: '11px' }}>12</span></a></li>
            <li><a href="#" className={activeMenu === 'leave' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('emp_leave'); }}>Leave Approvals <span style={{ background: 'red', color: 'white', padding: '2px 6px', borderRadius: '10px', fontSize: '11px' }}>5</span></a></li>
            <li><a href="#" className={activeMenu === 'fees' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('emp_fees'); }}>Fee Records</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }} style={{ color: '#dc3545' }}>Logout</a></li>
          </ul>
        </div>
        <div className="dashboard-content">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );

  // --- Views ---

  const renderHome = () => (
    <>
      <TopBar />
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
      <Footer />
    </>
  );

  const renderStudentLogin = () => {
    const handleLogin = (e) => {
      e.preventDefault();
      const user = e.target.username.value;
      if (user) setStudentUsername(user);
      navigate('student_dashboard');
    };

    return (
      <>
        <TopBar />
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
        <Footer />
      </>
    );
  };

  const renderEmployeeLogin = () => {
    const handleLogin = (e) => {
      e.preventDefault();
      const user = e.target.username.value;
      if (user) setEmployeeName(user);
      navigate('employee_dashboard');
    };

    return (
      <>
        <TopBar />
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
        <Footer />
      </>
    );
  };

  // --- Student Inner Views ---

  const renderStudentDashboard = () => (
    <StudentLayout activeMenu="dashboard">
      <div className="content-header">
        <h2>Welcome back!</h2>
        <span style={{ color: '#555', fontSize: '14px' }}>{currentTime}</span>
      </div>
      
      <div className="info-grid">
        <div className="info-card"><h3>Room Number</h3><p>A-204</p></div>
        <div className="info-card"><h3>Fee Status</h3><p style={{ color: '#155724' }}>Paid</p></div>
        <div className="info-card"><h3>Active Complaints</h3><p>1</p></div>
        <div className="info-card"><h3>Leave Requests</h3><p>0</p></div>
      </div>

      <div className="content-header">
        <h2>Quick Access</h2>
      </div>
      
      <div className="grid-cards">
        <div className="action-card" onClick={() => navigate('stu_profile')} style={{cursor: 'pointer'}}>
          <div className="action-card-title">View Profile</div>
        </div>
        <div className="action-card" onClick={() => navigate('stu_room')} style={{cursor: 'pointer'}}>
          <div className="action-card-title">Room Details</div>
        </div>
        <div className="action-card" onClick={() => navigate('stud_fees')} style={{cursor: 'pointer'}}>
          <div className="action-card-title">Fee Details</div>
        </div>
        <div className="action-card" onClick={() => navigate('stu_mess')} style={{cursor: 'pointer'}}>
          <div className="action-card-title">Mess Menu</div>
        </div>
        <div className="action-card" onClick={() => navigate('stu_leave')} style={{cursor: 'pointer'}}>
          <div className="action-card-title">Apply Leave</div>
        </div>
        <div className="action-card" onClick={() => navigate('stu_complaint')} style={{cursor: 'pointer'}}>
          <div className="action-card-title">Register Complaint</div>
        </div>
      </div>
    </StudentLayout>
  );

  const renderStuProfile = () => (
    <StudentLayout activeMenu="profile">
      <div className="content-header"><h2>Student Profile</h2></div>
      <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #0d6efd' }}>
        <p style={{ marginBottom: '10px' }}><strong>Name:</strong> {studentUsername}</p>
        <p style={{ marginBottom: '10px' }}><strong>Registration No:</strong> 2026CS1234</p>
        <p style={{ marginBottom: '10px' }}><strong>Course:</strong> B.Tech Computer Science</p>
        <p style={{ marginBottom: '10px' }}><strong>Contact:</strong> student@example.com</p>
      </div>
    </StudentLayout>
  );

  const renderStuRoom = () => (
    <StudentLayout activeMenu="room">
      <div className="content-header"><h2>Room Details</h2></div>
      <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #0d6efd' }}>
        <p style={{ marginBottom: '10px' }}><strong>Block:</strong> A Block</p>
        <p style={{ marginBottom: '10px' }}><strong>Room Number:</strong> A-204</p>
        <p style={{ marginBottom: '10px' }}><strong>Room Type:</strong> 2-Bed AC</p>
        <p style={{ marginBottom: '10px' }}><strong>Roommate:</strong> John Doe (2026CS1235)</p>
      </div>
    </StudentLayout>
  );

  const renderStuFees = () => (
    <StudentLayout activeMenu="fees">
      <div className="content-header"><h2>Fee Details</h2></div>
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr><th>Semester</th><th>Amount</th><th>Due Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr><td>Odd Semester 2026</td><td>₹85,000</td><td>15-Jul-2026</td><td><span className="status-badge status-paid">Paid</span></td></tr>
            <tr><td>Even Semester 2026</td><td>₹85,000</td><td>15-Dec-2026</td><td><span className="status-badge status-pending">Pending</span></td></tr>
          </tbody>
        </table>
      </div>
    </StudentLayout>
  );

  const renderStuMess = () => (
    <StudentLayout activeMenu="mess">
      <div className="content-header"><h2>Mess Menu</h2></div>
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr><th>Day</th><th>Breakfast</th><th>Lunch</th><th>Dinner</th></tr>
          </thead>
          <tbody>
            <tr><td>Monday</td><td>Idli Sambar</td><td>Rajma Rice</td><td>Chapati, Paneer</td></tr>
            <tr><td>Tuesday</td><td>Poha & Sabile</td><td>Dal Chawal</td><td>Chicken Curry / Veg Kofta</td></tr>
            <tr><td>Wednesday</td><td>Aloo Paratha</td><td>Kadi Pakoda</td><td>Egg Curry / Dal Makhani</td></tr>
            <tr><td>Thursday</td><td>Dosa</td><td>Chole Bhature</td><td>Fried Rice & Manchurian</td></tr>
            <tr><td>Friday</td><td>Upma</td><td>Mix Veg & Roti</td><td>Matar Paneer</td></tr>
          </tbody>
        </table>
      </div>
    </StudentLayout>
  );

  const renderStuLeave = () => (
    <StudentLayout activeMenu="leave">
      <div className="content-header"><h2>Apply Leave</h2></div>
      <form onSubmit={(e) => { e.preventDefault(); alert("Leave applied successfully!"); navigate('student_dashboard'); }}>
        <div className="form-group"><label>Reason</label><input type="text" className="form-control" required placeholder="e.g. Family Emergency" /></div>
        <div className="form-group"><label>From Date</label><input type="date" className="form-control" required /></div>
        <div className="form-group"><label>To Date</label><input type="date" className="form-control" required /></div>
        <button type="submit" className="btn-primary">Submit Leave Request</button>
      </form>
    </StudentLayout>
  );

  const renderStuComplaint = () => (
    <StudentLayout activeMenu="complaint">
      <div className="content-header"><h2>Register Complaint</h2></div>
      <form onSubmit={(e) => { e.preventDefault(); alert("Complaint registered successfully!"); navigate('student_dashboard'); }}>
        <div className="form-group">
          <label>Category</label>
          <select className="form-control" required>
            <option>Electrical</option>
            <option>Plumbing</option>
            <option>Cleaning</option>
            <option>Internet/Wi-Fi</option>
          </select>
        </div>
        <div className="form-group"><label>Description</label><textarea className="form-control" rows="4" required placeholder="Describe the issue in detail..."></textarea></div>
        <button type="submit" className="btn-primary">Submit Complaint</button>
      </form>
    </StudentLayout>
  );

  // --- Employee Inner Views ---

  const renderEmployeeDashboard = () => (
    <EmployeeLayout activeMenu="dashboard">
      <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: '#dba90f' }}>Administration Dashboard</h2>
          <span style={{ color: '#555', fontSize: '14px' }}>{currentTime}</span>
        </div>
        <button className="btn-primary" style={{ backgroundColor: '#dba90f', color: 'black', width: 'auto', padding: '8px 15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Download Daily Report</button>
      </div>
      
      <div className="info-grid">
        <div className="info-card" style={{ borderLeftColor: '#dba90f' }}><h3>Total Capacity</h3><p>450 / 500</p></div>
        <div className="info-card" style={{ borderLeftColor: '#dba90f' }}><h3>Pending Complaints</h3><p style={{ color: '#dc3545' }}>12 Active</p></div>
        <div className="info-card" style={{ borderLeftColor: '#dba90f' }}><h3>Leave Requests</h3><p style={{ color: '#fd7e14' }}>5 Pending Approval</p></div>
        <div className="info-card" style={{ borderLeftColor: '#dba90f' }}><h3>Fee Deficit</h3><p>₹1,25,000</p></div>
      </div>

      <div className="content-header">
        <h2>Administrative Tasks</h2>
      </div>
      
      <div className="grid-cards">
        <div className="action-card" onClick={() => navigate('emp_students')} style={{ cursor: 'pointer' }}>
          <div className="action-card-title">Manage Students</div>
          <p style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>View profiles and assign rooms</p>
        </div>
        <div className="action-card" onClick={() => navigate('emp_complaints')} style={{ cursor: 'pointer' }}>
          <div className="action-card-title">Complaints Inbox</div>
          <p style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>Resolve plumbing/electrical issues</p>
        </div>
        <div className="action-card" onClick={() => navigate('emp_leave')} style={{ cursor: 'pointer' }}>
          <div className="action-card-title">Leave Approvals</div>
          <p style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>Grant/deny student absences</p>
        </div>
        <div className="action-card" onClick={() => navigate('emp_fees')} style={{ cursor: 'pointer' }}>
          <div className="action-card-title">Fee Records</div>
          <p style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>Verify offline payments</p>
        </div>
      </div>
      
      <div className="profile-section" style={{ marginTop: '30px', background: 'white', border: '1px solid #ddd', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', padding: '20px' }}>
        <h3 style={{ marginBottom: '15px', color: '#333' }}>Recent Alerts</h3>
        <div className="table-responsive">
            <table className="custom-table">
                <thead><tr><th>Severity</th><th>Module</th><th>Message</th><th>Time</th></tr></thead>
                <tbody>
                    <tr><td><span style={{ color: 'red', fontWeight: 'bold' }}>High</span></td><td>Maintenance</td><td>Broken pipe in Block A, 2nd floor.</td><td>10 mins ago</td></tr>
                    <tr><td><span style={{ color: 'orange', fontWeight: 'bold' }}>Medium</span></td><td>Leave</td><td>5 new emergency leave requests.</td><td>1 hour ago</td></tr>
                </tbody>
            </table>
        </div>
      </div>
    </EmployeeLayout>
  );

  const renderEmpStudents = () => (
    <EmployeeLayout activeMenu="students">
      <div className="content-header"><h2 style={{ color: '#dba90f' }}>Manage Students</h2></div>
      <div className="table-responsive">
        <table className="custom-table">
          <thead><tr><th>Reg No</th><th>Name</th><th>Block & Room</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>2026CS1234</td><td>Student Name</td><td>Block A - 204</td><td><button style={{padding: '5px 10px', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Edit Room</button></td></tr>
            <tr><td>2026CS1235</td><td>John Doe</td><td>Block A - 204</td><td><button style={{padding: '5px 10px', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Edit Room</button></td></tr>
            <tr><td>2026CS1236</td><td>Jane Smith</td><td>Block B - 102</td><td><button style={{padding: '5px 10px', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Edit Room</button></td></tr>
          </tbody>
        </table>
      </div>
    </EmployeeLayout>
  );

  const renderEmpComplaints = () => (
    <EmployeeLayout activeMenu="complaints">
      <div className="content-header"><h2 style={{ color: '#dba90f' }}>Complaints Inbox</h2></div>
      <div className="table-responsive">
        <table className="custom-table">
          <thead><tr><th>ID</th><th>Room</th><th>Category</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>C-001</td><td>A-204</td><td>Plumbing</td><td><span className="status-badge status-pending">Open</span></td><td><button onClick={() => alert("Complaint marked as resolved!")} style={{padding: '5px 10px', background: '#28a745', color:'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Resolve</button></td></tr>
            <tr><td>C-002</td><td>B-102</td><td>Electrical</td><td><span className="status-badge status-pending">Open</span></td><td><button onClick={() => alert("Complaint marked as resolved!")} style={{padding: '5px 10px', background: '#28a745', color:'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Resolve</button></td></tr>
          </tbody>
        </table>
      </div>
    </EmployeeLayout>
  );

  const renderEmpLeave = () => (
    <EmployeeLayout activeMenu="leave">
      <div className="content-header"><h2 style={{ color: '#dba90f' }}>Leave Approvals</h2></div>
      <div className="table-responsive">
        <table className="custom-table">
          <thead><tr><th>Student</th><th>Dates</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>2026CS1234</td><td>15 Nov - 18 Nov</td><td>Family Medical</td><td><span className="status-badge status-pending">Pending</span></td><td><button onClick={() => alert("Leave Approved!")} style={{padding: '5px 10px', background: '#28a745', color:'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px'}}>Approve</button><button onClick={() => alert("Leave Rejected!")} style={{padding: '5px 10px', background: '#dc3545', color:'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Reject</button></td></tr>
          </tbody>
        </table>
      </div>
    </EmployeeLayout>
  );

  const renderEmpFees = () => (
    <EmployeeLayout activeMenu="fees">
      <div className="content-header"><h2 style={{ color: '#dba90f' }}>Fee Records</h2></div>
      <div className="table-responsive">
        <table className="custom-table">
          <thead><tr><th>Student</th><th>Amount</th><th>Transaction Ref</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>2026CS1234</td><td>₹85,000</td><td>TXN987654321</td><td><span className="status-badge status-paid">Verified</span></td><td><button style={{padding: '5px 10px', background: '#0d6efd', color:'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Print Receipt</button></td></tr>
            <tr><td>2026CS1236</td><td>₹85,000</td><td>TXN987659999</td><td><span className="status-badge status-pending">Pending Verification</span></td><td><button style={{padding: '5px 10px', background: '#28a745', color:'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Verify Offline</button></td></tr>
          </tbody>
        </table>
      </div>
    </EmployeeLayout>
  );

  // --- Main Render ---

  switch(currentView) {
    case 'home': return renderHome();
    case 'student_login': return renderStudentLogin();
    case 'employee_login': return renderEmployeeLogin();
    case 'student_dashboard': return renderStudentDashboard();
    case 'employee_dashboard': return renderEmployeeDashboard();
    case 'stu_profile': return renderStuProfile();
    case 'stu_room': return renderStuRoom();
    case 'stud_fees': return renderStuFees();
    case 'stu_mess': return renderStuMess();
    case 'stu_leave': return renderStuLeave();
    case 'stu_complaint': return renderStuComplaint();
    case 'emp_students': return renderEmpStudents();
    case 'emp_complaints': return renderEmpComplaints();
    case 'emp_leave': return renderEmpLeave();
    case 'emp_fees': return renderEmpFees();
    default: return renderHome();
  }
}

export default App;
