import React, { useState } from 'react';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeSlots = ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00"];

function TeacherDashboard({ userName = "Teacher" }) {
  const [entries, setEntries] = useState([]);
  
  // Leave modal state
  const [editingCell, setEditingCell] = useState(null); // {day, timeSlot} or null
  const [leaveReason, setLeaveReason] = useState('');
  const [editingEntryIdx, setEditingEntryIdx] = useState(null);

  // Open leave form modal for a given cell
  const handleTakeLeave = (day, timeSlot) => {
    // Check if leave already exists for this cell
    const idx = entries.findIndex(e => e.day === day && e.timeSlot === timeSlot);
    if (idx !== -1) {
      setEditingEntryIdx(idx);
      setLeaveReason(entries[idx].reason);
    } else {
      setEditingEntryIdx(null);
      setLeaveReason('');
    }
    setEditingCell({ day, timeSlot });
  };

  // Save leave entry
  const handleSaveLeave = (e) => {
    e.preventDefault();
    if (!leaveReason.trim()) return;

    if (editingEntryIdx !== null) {
      // Update existing leave
      const updated = [...entries];
      updated[editingEntryIdx] = {
        day: editingCell.day,
        timeSlot: editingCell.timeSlot,
        reason: leaveReason.trim(),
      };
      setEntries(updated);
    } else {
      // Add new leave
      setEntries([...entries, {
        day: editingCell.day,
        timeSlot: editingCell.timeSlot,
        reason: leaveReason.trim(),
      }]);
    }
    setEditingCell(null);
    setEditingEntryIdx(null);
    setLeaveReason('');
  };

  // Delete leave entry
  const handleDeleteLeave = (idx) => {
    setEntries(entries.filter((_, i) => i !== idx));
  };

  // Cancel leave modal
  const handleCancel = () => {
    setEditingCell(null);
    setEditingEntryIdx(null);
    setLeaveReason('');
  };

  // Find leave entry for a cell
  const getLeaveEntry = (day, timeSlot) => {
    const idx = entries.findIndex(e => e.day === day && e.timeSlot === timeSlot);
    if (idx === -1) return null;
    return { idx, entry: entries[idx] };
  };

  // Render leave modal form
  const renderLeaveForm = () => {
    if (!editingCell) return null;
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 20,
      }}>
        <form onSubmit={handleSaveLeave} style={{
          background: '#fff', padding: '25px 32px', borderRadius: '12px',
          boxShadow: '0 4px 24px #d1cfe570', minWidth: '320px', maxWidth: '90vw',
        }}>
          <h3 style={{ marginBottom: '12px', color: '#5937be' }}>
            {editingEntryIdx === null ? "Take Leave" : "Edit Leave"}
          </h3>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontWeight: 600, color: '#444' }}>Reason for Leave</label>
            <textarea
              value={leaveReason}
              onChange={e => setLeaveReason(e.target.value)}
              required
              rows={4}
              style={{
                width: '100%', padding: '8px', borderRadius: '6px',
                border: '1.5px solid #ccc', resize: 'vertical',
              }}
              placeholder="Enter reason for leave"
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button type="submit" style={{
              background: '#3f51b5', color: '#fff', border: 'none',
              padding: '8px 32px', borderRadius: '8px',
              fontWeight: 600, cursor: 'pointer',
            }}>Save</button>
            <button type="button" onClick={handleCancel} style={{
              background: '#db4437', color: '#fff', border: 'none',
              padding: '8px 18px', borderRadius: '8px',
              fontWeight: 600, cursor: 'pointer',
            }}>Cancel</button>
          </div>
        </form>
      </div>
    );
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
          Parul University - Teacher Dashboard
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
          Weekly Schedule
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
                    const cellData = getLeaveEntry(day, slot);

                    return (
                      <td key={day + slot} style={{
                        border: '1px solid #ece8fc',
                        verticalAlign: 'top',
                        padding: '10px',
                        background: cellData ? '#f9d6d5' : '#f9f9fa',
                        minHeight: '90px',
                        height: '100px',
                        position: 'relative',
                        textAlign: 'center',
                      }}>
                        {cellData ? (
                          <>
                            <div style={{
                              fontWeight: 700,
                              color: '#aa1f1f',
                              fontSize: '14px',
                              marginBottom: '4px'
                            }}>On Leave</div>
                            <div style={{ fontSize: '13px', color: '#800000', fontStyle: 'italic' }}>
                              {cellData.entry.reason}
                            </div>
                            <button
                              onClick={() => handleTakeLeave(day, slot)}
                              style={{
                                marginTop: '8px',
                                background: '#3f51b5',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '4px 12px',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '13px',
                              }}
                              title="Edit Leave"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteLeave(cellData.idx)}
                              style={{
                                marginTop: '8px',
                                marginLeft: '8px',
                                background: '#db4437',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '4px 12px',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '13px',
                              }}
                              title="Delete Leave"
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleTakeLeave(day, slot)}
                            style={{
                              background: '#eef0f8',
                              color: '#6e6ef7',
                              padding: '7px 14px',
                              borderRadius: '8px',
                              fontWeight: 600,
                              fontSize: '15px',
                              border: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            Take Leave
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {renderLeaveForm()}
      </main>
    </div>
  );
}

export default TeacherDashboard;
