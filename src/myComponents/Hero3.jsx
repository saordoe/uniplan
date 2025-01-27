import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';

const Hero3 = () => {
  const [applications, setApplications] = useState([]);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) return;

    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const todoApps = (userData.applications || []).filter(app => app.status === 'Todo');
        setApplications(todoApps);
      }
    });

    return () => unsubscribe();
  }, []);

  const markAsApplied = async (id) => {
    setRemovingId(id);
    
    setTimeout(async () => {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(userDocRef);
      
      if (docSnap.exists()) {
        const allApps = docSnap.data().applications;
        const updatedApps = allApps.map(app =>
          app.id === id ? { ...app, status: 'Applied' } : app
        );
        
        await setDoc(userDocRef, { applications: updatedApps }, { merge: true });
      }
    }, 300);
  };

  return (
    <div className="h-3/5 bg-offblack rounded-xl p-4 text-white">
      <div className="font-bold text-lg mb-3">Internship Applications</div>
      <div className="overflow-y-auto h-[calc(100%-2rem)]">
        <table className="w-full">
          <thead className="text-sm text-gray-300">
            <tr>
              <th className="text-left py-2">Company</th>
              <th className="text-left py-2">Program</th>
              <th className="text-center py-2">Applied?</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr 
                key={app.id} 
                className={`border-t border-gray-700 transition-all duration-300 ${
                  removingId === app.id ? 'opacity-0 transform translate-x-full' : ''
                }`}
              >
                <td className="py-2">{app.company}</td>
                <td className="py-2">{app.program}</td>
                <td className="py-2 text-center">
                  <input
                    type="checkbox"
                    onChange={() => markAsApplied(app.id)}
                    className="h-4 w-4"
                  />
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-400">
                  No pending applications
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hero3;