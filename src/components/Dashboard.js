import React, { useState, useEffect } from 'react';

// Helper function to generate sections
const generateSections = (year) => {
  return Array.from({ length: 5 }, (_, i) => `${year}A${i + 1}`);
};

const curriculumYears = [
  { label: '1st Year', sections: generateSections('1') },
  { label: '2nd Year', sections: generateSections('2') },
  { label: '3rd Year', sections: generateSections('3') },
  { label: '4th Year', sections: generateSections('4') },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeSlots = ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00"];

function Dashboard({ userName = "Kashish" }) {
  const [activeYearIdx, setActiveYearIdx] = useState(0);
  const [activeSection, setActiveSection] = useState(curriculumYears[0].sections[0]);

  // Reset active section when year changes
  useEffect(() => {
    setActiveSection(curriculumYears[activeYearIdx].sections[0]);
  }, [activeYearIdx]);

  // Entries hold all subjects added: subject, teacher, section, year, day, timeSlot, details
  const [entries, setEntries] = useState([]);

  // For editing/adding timetable entries
  const [editingCell, setEditingCell] = useState(null); // {day, timeSlot} | null
  const [formData, setFormData] = useState({
    subject: '', teacher: '', section: activeSection, details: ''
  });
  const [editingEntryIdx, setEditingEntryIdx] = useState(null);

  // Update formData.section if activeSection changes (for new adds)
  useEffect(() => {
    if (editingEntryIdx === null) {
      setFormData(form => ({ ...form, section: activeSection }));
    }
  }, [activeSection, editingEntryIdx]);

  // Open the add/edit form for a given cell (day + timeSlot)
  function handleOpenForm(day, timeSlot, entryIdx = null) {
    setEditingCell({ day, timeSlot });
    if (entryIdx !== null) {
      const editing = entries[entryIdx];
      setFormData({
        subject: editing.subject,
        teacher: editing.teacher,
        section: editing.section,
        details: editing.details || ''
      });
      setEditingEntryIdx(entryIdx);
    } else {
      setFormData({
        subject: '',
        teacher: '',
        section: activeSection,
        details: ''
      });
      setEditingEntryIdx(null);
    }
  }

  // Save new or edited entry
  function handleSave(e) {
    e.preventDefault();
    if (formData.subject.trim() === '' || formData.teacher.trim() === '') return;

    const yearLabel = curriculumYears[activeYearIdx].label;

    if (editingEntryIdx !== null) {
      // Update existing entry
      const updated = [...entries];
      updated[editingEntryIdx] = {
        ...formData,
        year: yearLabel,
        day: editingCell.day,
        timeSlot: editingCell.timeSlot,
      };
      setEntries(updated);
    } else {
      // Add new entry
      setEntries([
        ...entries,
        {
          ...formData,
          year: yearLabel,
          day: editingCell.day,
          timeSlot: editingCell.timeSlot
        }
      ]);
    }
    setEditingCell(null);
    setEditingEntryIdx(null);
    setFormData({ subject: '', teacher: '', section: activeSection, details: '' });
  }

  // Delete entry
  function handleDelete(entryIdx) {
    setEntries(entries.filter((_, i) => i !== entryIdx));
    setEditingCell(null);
    setEditingEntryIdx(null);
  }

  // Cancel add/edit form
  function handleCancel() {
    setEditingCell(null);
    setEditingEntryIdx(null);
  }

  // Get entry index and object for a given cell filtered by active year and section
  function getEntryForCell(day, timeSlot) {
    const yearLabel = curriculumYears[activeYearIdx].label;
    const idx = entries.findIndex(
      e => e.day === day &&
           e.timeSlot === timeSlot &&
           e.year === yearLabel &&
           e.section === activeSection
    );
    if (idx === -1) return null;
    return { idx, entry: entries[idx] };
  }

  // Render add/edit form modal
  function renderForm() {
    if (!editingCell) return null;
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 20
      }}>
        <form onSubmit={handleSave} style={{
          background: '#fff', padding: '25px 32px', borderRadius: '12px',
          boxShadow: '0 4px 24px #d1cfe570', minWidth: '340px', maxWidth: '90vw'
        }}>
          <h3 style={{ marginBottom: '12px', color: '#5937be' }}>
            {editingEntryIdx === null ? "Add Subject" : "Edit Subject"}
          </h3>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontWeight: 600, color: '#444' }}>Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={e => setFormData({ ...formData, subject: e.target.value })}
              required
              style={{
                width: '100%', padding: '8px', borderRadius: '6px', border: '1.5px solid #ccc'
              }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontWeight: 600, color: '#444' }}>Teacher</label>
            <input
              type="text"
              value={formData.teacher}
              onChange={e => setFormData({ ...formData, teacher: e.target.value })}
              required
              style={{
                width: '100%', padding: '8px', borderRadius: '6px', border: '1.5px solid #ccc'
              }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontWeight: 600, color: '#444' }}>Section</label>
            <select
              value={formData.section}
              onChange={e => setFormData({ ...formData, section: e.target.value })}
              style={{
                width: '100%', padding: '8px', borderRadius: '6px', border: '1.5px solid #ccc'
              }}
              required
            >
              {curriculumYears[activeYearIdx].sections.map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontWeight: 600, color: '#444' }}>Details</label>
            <input
              type="text"
              value={formData.details}
              onChange={e => setFormData({ ...formData, details: e.target.value })}
              style={{
                width: '100%', padding: '8px', borderRadius: '6px', border: '1.5px solid #ccc'
              }}
              placeholder="Optional details (e.g., Algebra and Geometry)"
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button type="submit" style={{
              background: '#3f51b5', color: '#fff', border: 'none', padding: '8px 32px',
              borderRadius: '8px', fontWeight: 600, cursor: 'pointer'
            }}>Save</button>
            <button type="button" onClick={handleCancel} style={{
              background: '#db4437', color: '#fff', border: 'none', padding: '8px 18px',
              borderRadius: '8px', fontWeight: 600, cursor: 'pointer'
            }}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ece8fc',
      fontFamily: 'Segoe UI, Arial, sans-serif',
    }}>
      {/* Top Navigation */}
      <header style={{
        background: '#fff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        padding: '15px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ color: '#5937be', fontWeight: '700', fontSize: '22px' }}>
          Parul University
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

      {/* Main Content */}
      <main style={{ padding: '38px 42px' }}>
        <h1 style={{
          color: '#29357a', fontWeight: 700, marginBottom: '20px', fontSize: '28px'
        }}>
          Dashboard
        </h1>

        {/* Year Tabs */}
        <div style={{ display: 'flex', gap: '18px', marginBottom: '12px' }}>
          {curriculumYears.map((year, idx) => (
            <div
              key={year.label}
              onClick={() => setActiveYearIdx(idx)}
              style={{
                cursor: 'pointer',
                background: idx === activeYearIdx ? '#e6e2f6' : '#f6f7fa',
                borderRadius: '12px',
                padding: '24px 36px',
                flex: 1,
                boxShadow: idx === activeYearIdx ? '0 4px 12px #b0a6eb' : '0 4px 12px #e7e3fa',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                userSelect: 'none',
              }}
            >
              <span style={{ color: idx === activeYearIdx ? '#3f51b5' : '#7c87b3', fontWeight: 700 }}>
                {year.label}
              </span>
              <span style={{ color: idx === activeYearIdx ? '#7c87b3' : '#b0aed3', marginTop: '8px' }}>
                {year.sections.length} Sections
              </span>
            </div>
          ))}
        </div>

        {/* Sections Tabs */}
        <div style={{ marginBottom: '24px', fontSize: '16px', color: '#444', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '12px', fontWeight: 600 }}>Sections:</span>
          {curriculumYears[activeYearIdx].sections.map(sec => (
            <span
              key={sec}
              onClick={() => setActiveSection(sec)}
              style={{
                cursor: 'pointer',
                marginRight: '12px',
                padding: '6px 16px',
                borderRadius: '20px',
                background: sec === activeSection ? '#e6e2f6' : '#f0eff9',
                color: sec === activeSection ? '#5937be' : '#7c87b3',
                fontWeight: sec === activeSection ? 700 : 500,
                userSelect: 'none',
                boxShadow: sec === activeSection ? '0 4px 12px #b0a6eb' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {sec}
            </span>
          ))}
        </div>

        {/* Weekly Schedule Title */}
        <h2 style={{ fontWeight: 700, color: '#29357a', marginBottom: '16px' }}>
          Weekly Schedule - {curriculumYears[activeYearIdx].label} / {activeSection}
        </h2>

        {/* Timetable Grid */}
        <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '14px', boxShadow: '0 2px 12px #e7e3fa', padding: '18px' }}>
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
                    const cellData = (() => {
                      const yearLabel = curriculumYears[activeYearIdx].label;
                      const idx = entries.findIndex(
                        e => e.day === day &&
                             e.timeSlot === slot &&
                             e.year === yearLabel &&
                             e.section === activeSection
                      );
                      if (idx === -1) return null;
                      return { idx, entry: entries[idx] };
                    })();

                    return (
                      <td key={day + slot} style={{
                        border: '1px solid #ece8fc',
                        verticalAlign: 'top',
                        padding: '0',
                        background: cellData ? '#e6e2f6' : '#f9f9fa',
                        position: 'relative',
                        minHeight: '90px',
                        height: '100px'
                      }}>
                        <div style={{ padding: '10px 8px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          {cellData ? (
                            <div style={{
                              background: '#fafaff',
                              borderRadius: '13px',
                              boxShadow: '0 2px 6px #e6e2f6',
                              padding: '10px',
                              borderLeft: '8px solid #6e6ef7',
                            }}>
                              <div style={{ fontWeight: 700, color: '#29357a', fontSize: '16px' }}>{cellData.entry.subject}</div>
                              <div style={{ color: '#6e6ef7', fontWeight: 600, marginBottom: '2px' }}>
                                {cellData.entry.details}
                              </div>
                              <div style={{ fontSize: '13px', color: '#444', marginBottom: '2px' }}>
                                {cellData.entry.teacher}
                              </div>
                              <div style={{ fontSize: '13px', color: '#444', marginBottom: '2px' }}>
                                Section: {cellData.entry.section}
                              </div>
                              <div style={{ display: 'flex', gap: '6px', marginTop: '7px' }}>
                                <button
                                  onClick={() => handleOpenForm(day, slot, cellData.idx)}
                                  style={{
                                    background: '#3f51b5',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '3px 10px',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: '14px'
                                  }} title="Edit">✎</button>
                                <button
                                  onClick={() => handleDelete(cellData.idx)}
                                  style={{
                                    background: '#db4437',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '3px 10px',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: '14px'
                                  }} title="Delete">🗑</button>
                              </div>
                            </div>
                          ) : (
                            <button style={{
                              background: '#eef0f8',
                              color: '#6e6ef7',
                              padding: '7px 18px',
                              borderRadius: '8px',
                              fontWeight: 600,
                              fontSize: '15px',
                              border: 'none',
                              cursor: 'pointer',
                              margin: '0 auto'
                            }}
                              onClick={() => handleOpenForm(day, slot)}
                            >Click to add</button>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {renderForm()}
      </main>
    </div>
  );
}

export default Dashboard;
