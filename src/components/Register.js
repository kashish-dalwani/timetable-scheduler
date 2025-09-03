import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [year, setYear] = useState('');         // Track year for students
  const [section, setSection] = useState('');   // Track section for students
  const navigate = useNavigate();

  // Generate section options based on selected year
  const getSectionOptions = (year) => {
    if (!year) return [];
    const numSections = 5;
    let options = [];
    for (let i = 1; i <= numSections; i++) {
      options.push(`${year}A${i}`);
    }
    return options;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setError('');
    // Validate student extra fields
    if (role === 'student' && (!year || !section)) {
      setError('Please select both year and section!');
      return;
    }
    alert(`Registered with Name: ${name}, Email: ${email}, Role: ${role}${role === 'student' ? `, Year: ${year}, Section: ${section}` : ''}`);
    // Save user info here...
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      backgroundColor: '#f9fafb',
    }}>
      <header style={{
        height: '60px', padding: '0 30px',
        display: 'flex', alignItems: 'center',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        fontWeight: '700',
        fontSize: '20px',
        color: '#3f51b5',
        userSelect: 'none',
      }}>
        HackHers
      </header>
      <main style={{
        flex: 1,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: '20px',
      }}>
        <div style={{
          width: '400px',
          padding: '35px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#222' }}>Create Account</h2>
          <form onSubmit={handleSubmit}>
            {/* ...name & email fields as before... */}
            <div style={{ marginBottom: '18px' }}>
              <label htmlFor="name" style={{ fontWeight: '600', color: '#444' }}>Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: '100%', padding: '12px', marginTop: '8px', borderRadius: '8px', border: '1.8px solid #bbb', fontSize: '16px', outline: 'none', transition: 'border-color 0.3s' }}
                required
                onFocus={e => e.target.style.borderColor = '#3f51b5'}
                onBlur={e => e.target.style.borderColor = '#bbb'}
              />
            </div>
            <div style={{ marginBottom: '18px' }}>
              <label htmlFor="email" style={{ fontWeight: '600', color: '#444' }}>Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '12px', marginTop: '8px', borderRadius: '8px', border: '1.8px solid #bbb', fontSize: '16px', outline: 'none', transition: 'border-color 0.3s' }}
                required
                onFocus={e => e.target.style.borderColor = '#3f51b5'}
                onBlur={e => e.target.style.borderColor = '#bbb'}
              />
            </div>

            {/* Role Selection Dropdown */}
            <div style={{ marginBottom: '18px' }}>
              <label htmlFor="role" style={{ fontWeight: '600', color: '#444' }}>Role</label>
              <select
                id="role"
                value={role}
                onChange={e => { setRole(e.target.value); setYear(''); setSection(''); }}
                style={{ width: '100%', padding: '12px', marginTop: '8px', borderRadius: '8px', border: '1.8px solid #bbb', fontSize: '16px', outline: 'none', cursor: 'pointer' }}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Conditional: Student Year & Section */}
            {role === 'student' && (
              <>
                <div style={{ marginBottom: '18px' }}>
                  <label htmlFor="year" style={{ fontWeight: '600', color: '#444' }}>Year</label>
                  <select
                    id="year"
                    value={year}
                    onChange={e => {
                      setYear(e.target.value);
                      setSection('');  // Reset section when year changes
                    }}
                    style={{ width: '100%', padding: '12px', marginTop: '8px', borderRadius: '8px', border: '1.8px solid #bbb', fontSize: '16px', outline: 'none', cursor: 'pointer' }}
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                  </select>
                </div>
                {year && (
                  <div style={{ marginBottom: '18px' }}>
                    <label htmlFor="section" style={{ fontWeight: '600', color: '#444' }}>Section</label>
                    <select
                      id="section"
                      value={section}
                      onChange={e => setSection(e.target.value)}
                      style={{ width: '100%', padding: '12px', marginTop: '8px', borderRadius: '8px', border: '1.8px solid #bbb', fontSize: '16px', outline: 'none', cursor: 'pointer' }}
                      required
                    >
                      <option value="">Select Section</option>
                      {getSectionOptions(year).map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}

            {/* ...password fields as before... */}
            <div style={{ marginBottom: '18px' }}>
              <label htmlFor="password" style={{ fontWeight: '600', color: '#444' }}>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px', marginTop: '8px', borderRadius: '8px', border: '1.8px solid #bbb', fontSize: '16px', outline: 'none', transition: 'border-color 0.3s' }}
                required
              />
            </div>
            <div style={{ marginBottom: '18px' }}>
              <label htmlFor="confirmPassword" style={{ fontWeight: '600', color: '#444' }}>Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                style={{ width: '100%', padding: '12px', marginTop: '8px', borderRadius: '8px', border: '1.8px solid #bbb', fontSize: '16px', outline: 'none', transition: 'border-color 0.3s' }}
                required
              />
            </div>

            {error && (
              <p style={{ color: 'red', marginBottom: '15px', fontWeight: '600' }}>{error}</p>
            )}

            <button type="submit" style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#3f51b5',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '18px',
              boxShadow: '0 6px 14px rgba(63, 81, 181, 0.4)',
              transition: 'background-color 0.3s',
            }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#303f9f'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = '#3f51b5'}
            >
              Register
            </button>
          </form>
          <p style={{ marginTop: '25px', textAlign: 'center', color: '#666', fontSize: '15px' }}>
            Already have an account?{' '}
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'none',
                border: 'none',
                color: '#3f51b5',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '15px',
              }}
            >
              Login
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Register;
