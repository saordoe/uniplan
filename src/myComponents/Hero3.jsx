import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Hero3 = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInternships = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        console.log('Raw internships data:', docSnap.data()?.internships);
        
        if (docSnap.exists() && docSnap.data().internships) {
          const todoInternships = docSnap.data().internships.filter(
            internship => internship.status.toLowerCase() === 'todo'
          );
          console.log('Filtered todo internships:', todoInternships);
          setInternships(todoInternships);
        }
      }
      setLoading(false);
    };
    loadInternships();
  }, []);

  const markAsApplied = async (internshipId) => {
    if (auth.currentUser) {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const allInternships = docSnap.data().internships;
        const updatedInternships = allInternships.map(internship =>
          internship.id === internshipId 
            ? { ...internship, status: 'Applied' }
            : internship
        );
        
        await updateDoc(docRef, { internships: updatedInternships });
        setInternships(prev => prev.filter(internship => internship.id !== internshipId));
      }
    }
  };

  if (loading) {
    return (
      <div className="h-3/5 bg-offblack rounded-xl p-4 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

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
            {internships.map(internship => (
              <tr key={internship.id} className="border-t border-gray-700">
                <td className="py-2">{internship.company}</td>
                <td className="py-2">{internship.program}</td>
                <td className="py-2 text-center">
                  <input
                    type="checkbox"
                    onChange={() => markAsApplied(internship.id)}
                    className="h-4 w-4"
                  />
                </td>
              </tr>
            ))}
            {internships.length === 0 && (
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