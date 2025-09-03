import React from 'react';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeSlots = ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00"];

function StudentDashboard({ userName = "Student", section, entries = [] }) {
  // Filter entries for this student's section
  const entriesForSection = entries.filter(e => e.section === section);

  // Get entry for a cell
  const getEntryForCell = (day, timeSlot) => {
    return entriesForSection.find(e => e.day === day && e.timeSlot === timeSlot) || null;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ece8fc',
      fontFamily: 'Segoe UI, Arial, sans-serif',
    }}>
      <header style={{
        background: '#fff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        padding: '15px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h2 style={{ color: '#5937be', fontWeight: '700', fontSize: '22px' }}>
          Parul University - Student Dashboard
        </h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '10px', fontSize: '15px', color: '#444' }}>
            Hello, <b>{userName}</b>
          </span>
          <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" style={{
            width: '34px', height: '34px', borderRadius: '50%'
          }} />
        </div>
      </header>

      <main style={{ padding: '38px 42px' }}>
        <h1 style={{ color: '#29357a', fontWeight: 700, marginBottom: '20px', fontSize: '28px' }}>
          Weekly Schedule - Section {section}
        </h1>

        <div style={{
          overflowX: 'auto', background: '#fff', borderRadius: '14px',
          boxShadow: '0 2px 12px #e7e3fa', padding: '18px'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{
                  background: '#f6f7fa', color: '#7c87b3', fontWeight: 600,
                  padding: '12px 10px', fontSize: '15px', textAlign: 'left', minWidth: '120px'
                }}>Time</th>
                {days.map(day => (
                  <th key={day} style={{
                    background: '#f6f7fa', color: '#7c87b3', fontWeight: 600,
                    padding: '12px 10px', fontSize: '15px', textAlign: 'center', minWidth: '110px'
                  }}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(slot => (
                <tr key={slot}>
                  <td style={{
                    background: '#f6f7fa', color: '#444', padding: '18px 12px',
                    fontWeight: 600, fontSize: '16px', borderRight: '1px solid #ece8fc'
                  }}>{slot}</td>
                  {days.map(day => {
                    const entry = getEntryForCell(day, slot);
                    return (
                      <td key={day + slot} style={{
                        border: '1px solid #ece8fc',
                        verticalAlign: 'top',
                        padding: '10px',
                        background: entry ? '#e6e2f6' : '#f9f9fa',
                        minHeight: '90px',
                        height: '100px',
                        position: 'relative',
                        textAlign: 'center',
                      }}>
                        {entry ? (
                          <div style={{
                            background: '#fafaff',
                            borderRadius: '13px',
                            boxShadow: '0 2px 6px #e6e2f6',
                            padding: '10px',
                            borderLeft: '8px solid #6e6ef7',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}>
                            <div style={{ fontWeight: 700, color: '#29357a', fontSize: '16px' }}>
                              {entry.subject}
                            </div>
                            <div style={{ color: '#6e6ef7', fontWeight: 600, marginBottom: '2px' }}>
                              {entry.details}
                            </div>
                            <div style={{ fontSize: '13px', color: '#444', marginBottom: '2px' }}>
                              {entry.teacher}
                            </div>
                          </div>
                        ) : (
                          <div style={{ color: '#a0a0a0', fontStyle: 'italic', fontSize: '14px', marginTop: '35px' }}>
                            No class
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
