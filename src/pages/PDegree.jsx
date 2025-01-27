import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const PDegree = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [startTerm, setStartTerm] = useState({ season: '', year: '' });
  const [endTerm, setEndTerm] = useState({ season: '', year: '' });
  const [newCourse, setNewCourse] = useState('');
  const [draggedCourse, setDraggedCourse] = useState(null);
  
  const seasons = ['Fall', 'Spring'];
  const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029];

  useEffect(() => {
    if (!auth.currentUser) return;
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setSemesters(userData.semesters || []);
        setCourses(userData.courses || []);
      }
    });
    return () => unsubscribe();
  }, []);

  const saveToFirestore = async (newSemesters, newCourses) => {
    if (!auth.currentUser) return;
    try {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        semesters: newSemesters || semesters,
        courses: newCourses || courses
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
      alert('Invalid range. Start term should be before end term.');
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

  const handleAddCourse = () => {
    if (!newCourse.trim()) return;
    const newCourses = [...courses, {
      id: Date.now(),
      name: newCourse.trim(),
      semester: null
    }];
    setCourses(newCourses);
    saveToFirestore(null, newCourses);
    setNewCourse('');
  };

  const handleDragStart = (course) => {
    setDraggedCourse(course);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (semester) => {
    if (!draggedCourse) return;
    const updatedCourses = courses.map(course =>
      course.id === draggedCourse.id ? { ...course, semester } : course
    );
    setCourses(updatedCourses);
    saveToFirestore(null, updatedCourses);
    setDraggedCourse(null);
  };

  return (
    <div className="bg-offblack w-full h-full flex-1 py-5 pr-5">
      <div className="bg-offwhite w-full h-full rounded-xl flex flex-col">
        <div className="p-10 pb-0">
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
        </div>

        {semesters.length > 0 && (
          <div className="flex-1 overflow-y-auto p-10 pt-4 space-y-8">
            <div>
              <div className="font-bold text-xl mb-4">Semesters:</div>
              <div className="grid grid-cols-2 gap-4">
                {semesters.map((semester, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 rounded-lg p-4 min-h-[100px]"
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(semester)}
                  >
                    <div className="font-semibold mb-2">{semester}</div>
                    <div className="flex flex-wrap gap-2">
                      {courses
                        .filter(course => course.semester === semester)
                        .map(course => (
                          <div
                            key={course.id}
                            className="bg-offblack text-white px-3 py-1 rounded-full text-sm"
                            draggable
                            onDragStart={() => handleDragStart(course)}
                          >
                            {course.name}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="font-bold text-xl mb-4">Courses:</div>
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="text"
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCourse()}
                  placeholder="Enter course name"
                  className="border rounded-full px-4 py-2"
                />
                <button
                  onClick={handleAddCourse}
                  className="bg-offblack text-white px-4 py-2 rounded-full hover:bg-offblack/80"
                >
                  Add Course
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {courses
                  .filter(course => !course.semester)
                  .map(course => (
                    <div
                      key={course.id}
                      className="bg-offblack text-white px-3 py-1 rounded-full cursor-move"
                      draggable
                      onDragStart={() => handleDragStart(course)}
                    >
                      {course.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDegree;
