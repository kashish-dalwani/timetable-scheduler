import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password || !role) {
      setError('Please fill all fields.');
      return;
    }
    alert(`Login Successful!\nRole: ${role}`);

    if (role === 'admin') {
      navigate('/dashboard', { state: { email, role } });
    } else if (role === 'teacher') {
      navigate('/tdashboard', { state: { email, role } });
    } else {
      navigate('/sdashboard', { state: { email, role } });
    }
  };

  const handleGoogleSignIn = () => {
    alert('Google Sign-In clicked');
    // Assuming Google user is student for demonstration
    navigate('/studentdashboard', { state: { email: 'googleuser@google.com', role: 'google' }});
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      backgroundColor: '#f0f4f8',
    }}>
      <header style={{
        height: '60px', padding: '0 30px',
        display: 'flex', alignItems: 'center',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        fontWeight: '700', fontSize: '20px',
        color: '#3f51b5', userSelect: 'none',
      }}>
        HackHers
      </header>
      <main style={{
        flex: 1, display: 'flex',
        justifyContent: 'center', alignItems: 'center',
        padding: '20px',
      }}>
        <div style={{
          width: '360px', padding: '30px',
          backgroundColor: '#fff', borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email" style={{ fontWeight: '600', color: '#555' }}>Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%', padding: '10px', marginTop: '6px',
                  borderRadius: '6px', border: '1.5px solid #ccc', fontSize: '14px',
                }}
                required
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="password" style={{ fontWeight: '600', color: '#555' }}>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%', padding: '10px', marginTop: '6px',
                  borderRadius: '6px', border: '1.5px solid #ccc', fontSize: '14px',
                }}
                required
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="role" style={{ fontWeight: '600', color: '#555' }}>Role</label>
              <select
                id="role"
                value={role}
                onChange={e => setRole(e.target.value)}
                style={{
                  width: '100%', padding: '10px', marginTop: '6px',
                  borderRadius: '6px', border: '1.5px solid #ccc',
                  fontSize: '14px', cursor: 'pointer'
                }}
                required
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {error && (
              <div style={{ color: 'red', marginBottom: '10px', fontWeight: '600' }}>{error}</div>
            )}
            <button type="submit" style={{
              width: '100%', padding: '12px',
              backgroundColor: '#3f51b5', color: 'white',
              border: 'none', borderRadius: '8px',
              cursor: 'pointer', fontWeight: '600', fontSize: '16px',
              boxShadow: '0 4px 8px rgba(63, 81, 181, 0.3)',
            }}>
              Login
            </button>
          </form>
          <hr style={{ margin: '25px 0', borderColor: '#ddd' }} />
          <button
            onClick={handleGoogleSignIn}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#db4437',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px',
              boxShadow: '0 4px 8px rgba(219, 68, 55, 0.3)',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#b33c2e'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#db4437'}
          >
            Sign In with Google
          </button>
          <p style={{ marginTop: '20px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              style={{
                background: 'none', border: 'none',
                color: '#3f51b5', cursor: 'pointer',
                fontWeight: '600', fontSize: '14px',
              }}
            >
              Sign Up
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
