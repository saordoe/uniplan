import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const PDegree = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [semesters, setSemesters] = useState([]);
  const [startTerm, setStartTerm] = useState({ season: '', year: '' });
  const [endTerm, setEndTerm] = useState({ season: '', year: '' });

  const seasons = ['Fall', 'Spring'];
  const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029];

  useEffect(() => {
    if (!auth.currentUser) return;

    const userDocRef = doc(db, 'users', auth.currentUser.uid);

    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setSemesters(userData.semesters || []);
      }
    });

    return () => unsubscribe();
  }, []);

  const saveToFirestore = async (newSemesters) => {
    if (!auth.currentUser) return;

    try {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        semesters: newSemesters
      }, { merge: true });
    } catch (error) {
      console.error('Error saving to Firestore:', error);
    }
  };

  const handleAddDegree = () => {
    setFormVisible(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const startIndex = seasons.indexOf(startTerm.season) + years.indexOf(parseInt(startTerm.year)) * 2;
    const endIndex = seasons.indexOf(endTerm.season) + years.indexOf(parseInt(endTerm.year)) * 2;

    if (startIndex > endIndex || startTerm.season === '' || endTerm.season === '' || startTerm.year === '' || endTerm.year === '') {
      alert('Invalid range. Please ensure the start term is before the end term and all fields are filled.');
      return;
    }

    const generatedSemesters = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const year = years[Math.floor(i / 2)];
      const season = seasons[i % 2];
      generatedSemesters.push(`${season} ${year}`);
    }

    setSemesters(generatedSemesters);
    saveToFirestore(generatedSemesters);
    setFormVisible(false);
  };

  return (
    <div className="bg-offblack w-full h-full flex-1 py-5 pr-5">
      <div className="bg-offwhite w-full h-full p-10 rounded-xl flex flex-col">
        <div className="font-bold text-2xl pb-4">Degree Planning</div>
        {!formVisible && semesters.length === 0 && (
          <button
            className="bg-offblack w-1/5 text-white px-4 py-2 rounded hover:bg-offblack/80"
            onClick={handleAddDegree}
          >
            Add a Degree
          </button>
        )}

        {formVisible && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">Start Term</label>
              <div className="flex space-x-4">
                <select
                  className="border rounded p-2"
                  value={startTerm.season}
                  onChange={(e) => setStartTerm({ ...startTerm, season: e.target.value })}
                >
                  <option value="">Select Season</option>
                  {seasons.map((season) => (
                    <option key={season} value={season}>{season}</option>
                  ))}
                </select>
                <select
                  className="border rounded p-2"
                  value={startTerm.year}
                  onChange={(e) => setStartTerm({ ...startTerm, year: e.target.value })}
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">End Term</label>
              <div className="flex space-x-4">
                <select
                  className="border rounded p-2"
                  value={endTerm.season}
                  onChange={(e) => setEndTerm({ ...endTerm, season: e.target.value })}
                >
                  <option value="">Select Season</option>
                  {seasons.map((season) => (
                    <option key={season} value={season}>{season}</option>
                  ))}
                </select>
                <select
                  className="border rounded p-2"
                  value={endTerm.year}
                  onChange={(e) => setEndTerm({ ...endTerm, year: e.target.value })}
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="bg-offblack text-white px-4 py-2 rounded hover:bg-offblack/80"
            >
              Submit
            </button>
          </form>
        )}

        {semesters.length > 0 && (
          <div className="mt-6">
            <div className="font-bold text-xl mb-4">Semesters:</div>
            <div className="grid grid-cols-2 gap-4">
              {semesters.map((semester, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-lg p-4 text-center font-semibold"
                >
                  {semester}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDegree;
