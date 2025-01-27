import React, { useState } from 'react';
import { Plus, ArrowUpDown, Pin } from 'lucide-react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';

const PInternships = () => {

  useEffect(() => {
    const loadUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists() && userDoc.data().applications) {
          setApplications(userDoc.data().applications);
        }
      }
    };
    
    loadUserData();
  }, []);
  
  const handleAddApplication = async () => {
    if (!newApplication.company || !newApplication.program) return;
    
    const newApplications = [
      ...applications,
      {
        id: applications.length + 1,
        ...newApplication
      }
    ];
  
    setApplications(newApplications);
    
    if (auth.currentUser) {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        applications: newApplications
      });
    }
  };
  
  const handleUpdateStatus = async (id, field, value) => {
    const updatedApplications = applications.map(app => 
      app.id === id ? { ...app, [field]: value } : app
    );
    
    setApplications(updatedApplications);
    
    if (auth.currentUser) {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        applications: updatedApplications
      });
    }
  };

  const [applications, setApplications] = useState([
    {
      id: 1,
      company: 'Example Corp',
      program: 'Software Engineering Intern',
      status: 'Todo',
      result: 'N/A',
      link: 'https://example.com',
      pinned: false
    }
  ]);

  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const [newApplication, setNewApplication] = useState({
    company: '',
    program: '',
    status: 'Todo',
    result: 'N/A',
    link: '',
    pinned: false
  });

  const statusOptions = ['Todo', 'Applied', "Didn't Apply", 'Rejected', 'Accepted'];
  const resultOptions = ['N/A', 'Rejected', 'Accepted'];

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedApplications = [...applications].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    
    if (!sortConfig.key) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const handleRightClick = (e, appId) => {
    e.preventDefault();
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, pinned: !app.pinned } : app
    ));
  };

  const startEditing = (id, field, value) => {
    setEditingCell({ id, field });
    setEditValue(value);
  };

  const handleEdit = (e) => {
    setEditValue(e.target.value);
  };

  const finishEditing = () => {
    if (editingCell) {
      handleUpdateStatus(editingCell.id, editingCell.field, editValue);
      setEditingCell(null);
      setEditValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      finishEditing();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
      setEditValue('');
    }
  };

  const renderCell = (app, field) => {
    const isEditing = editingCell?.id === app.id && editingCell?.field === field;
    const value = app[field];

    if (isEditing) {
      return (
        <input
          type="text"
          value={editValue}
          onChange={handleEdit}
          onBlur={finishEditing}
          onKeyDown={handleKeyDown}
          className="w-full px-2 py-1 border rounded"
          autoFocus
        />
      );
    }

    if (field === 'link') {
      return (
        <div className="flex items-center space-x-2">
          <span 
            onClick={() => startEditing(app.id, 'link', value)}
            className="cursor-text overflow-hidden text-ellipsis max-w-xs"
            title={value}
          >
            {value}
          </span>
          {value && (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-2"
              onClick={(e) => e.stopPropagation()}
            >
              ↗
            </a>
          )}
        </div>
      );
    }

    return (
      <div
        onClick={() => startEditing(app.id, field, value)}
        className="cursor-text"
      >
        {value}
      </div>
    );
  };

  return (
    <div className="bg-offblack w-full h-full flex-1 py-5 pr-5">
      <div className="bg-offwhite w-full h-full rounded-xl flex flex-col">
        <div className="font-bold p-10 text-2xl -mb-4 ">Internship Application Tracker</div>
        <div className="w-full mx-auto bg-white rounded-xl shadow flex-1 overflow-hidden flex flex-col">
          <div className="space-y-4 mx-10 flex-1 overflow-hidden flex flex-col">
            <div className="flex gap-2 flex-wrap pt-4 ml-2 pb-5">
              <input
                type="text"
                placeholder="Company"
                value={newApplication.company}
                onChange={(e) => setNewApplication({...newApplication, company: e.target.value})}
                className="px-3 py-2 border rounded w-48"
              />
              <input
                type="text"
                placeholder="Program/Role"
                value={newApplication.program}
                onChange={(e) => setNewApplication({...newApplication, program: e.target.value})}
                className="px-3 py-2 border rounded w-48"
              />
              <input
                type="text"
                placeholder="Link"
                value={newApplication.link}
                onChange={(e) => setNewApplication({...newApplication, link: e.target.value})}
                className="px-3 py-2 border rounded w-48"
              />
              <button 
                onClick={handleAddApplication}
                className="px-4 py-2 bg-offblack text-white rounded hover:bg-offblack/80 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Application
              </button>
            </div>
            <div className="bg-offblack/20 w-full h-[2px]"></div>
            
            <div className="overflow-auto flex-1">
              <table className="w-full">
                <thead className="sticky top-0 bg-white">
                  <tr className="border-b">
                    <th className="text-left p-2">
                      <button 
                        onClick={() => handleSort('company')}
                        className="font-bold flex items-center hover:text-gray-700"
                      >
                        Company
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                      </button>
                    </th>
                    <th className="text-left p-2">
                      <button 
                        onClick={() => handleSort('program')}
                        className="font-bold flex items-center hover:text-gray-700"
                      >
                        Program/Role
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                      </button>
                    </th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Result</th>
                    <th className="text-left p-2">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedApplications.map((app) => (
                    <tr 
                      key={app.id} 
                      className={`border-b ${app.pinned ? 'bg-blue-50' : ''}`}
                      onContextMenu={(e) => handleRightClick(e, app.id)}
                    >
                      <td className="p-2">
                        <div className="flex items-center">
                          {app.pinned && <Pin className="w-4 h-4 mr-2 text-blue-500" />}
                          {renderCell(app, 'company')}
                        </div>
                      </td>
                      <td className="p-2">{renderCell(app, 'program')}</td>
                      <td className="p-2">
                        <select
                          value={app.status}
                          onChange={(e) => handleUpdateStatus(app.id, 'status', e.target.value)}
                          className="border rounded p-1"
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-2">
                        <select
                          value={app.result}
                          onChange={(e) => handleUpdateStatus(app.id, 'result', e.target.value)}
                          className="border rounded p-1"
                        >
                          {resultOptions.map(result => (
                            <option key={result} value={result}>{result}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-2">{renderCell(app, 'link')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PInternships;