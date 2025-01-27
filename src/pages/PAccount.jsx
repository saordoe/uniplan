import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PAccount = () => {
 const [user, setUser] = useState({
   name: '',
   email: '',
   photoURL: ''
 });
 const [loading, setLoading] = useState(true);

 useEffect(() => {
   const loadUserData = async () => {
     if (auth.currentUser) {
       const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
       if (userDoc.exists()) {
         setUser({
           name: userDoc.data().name || '',
           email: auth.currentUser.email,
           photoURL: userDoc.data().photoURL || ''
         });
       }
       setLoading(false);
     }
   };
   loadUserData();
 }, []);

 const handleNameChange = async (e) => {
   const newName = e.target.value;
   setUser(prev => ({ ...prev, name: newName }));
   
   if (auth.currentUser) {
     await updateDoc(doc(db, 'users', auth.currentUser.uid), {
       name: newName
     });
   }
 };

 const handlePhotoUpload = async (e) => {
   const file = e.target.files[0];
   if (!file) return;

   const storageRef = ref(storage, `profilePhotos/${auth.currentUser.uid}`);
   await uploadBytes(storageRef, file);
   const photoURL = await getDownloadURL(storageRef);

   setUser(prev => ({ ...prev, photoURL }));
   await updateDoc(doc(db, 'users', auth.currentUser.uid), {
     photoURL
   });
 };

 const handleSignOut = async () => {
   try {
     await signOut(auth);
     window.location.href = '/';
   } catch (error) {
     console.error('Error signing out:', error);
   }
 };

 return (
   <div className="bg-offblack w-full h-full flex-1 py-5 pr-5">
     <div className="bg-offwhite w-full h-full rounded-xl p-8">
       <h1 className="text-2xl font-bold mb-8">My Account</h1>
       
       <div className="max-w-md mx-auto space-y-6">
         <div className="text-center">
           <div className="mb-4">
             {user.photoURL ? (
               <img 
                 src={user.photoURL} 
                 alt="Profile" 
                 className="w-32 h-32 rounded-full mx-auto object-cover"
               />
             ) : (
               <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                 <span className="text-4xl text-gray-500">?</span>
               </div>
             )}
           </div>
           <input
             type="file"
             accept="image/*"
             onChange={handlePhotoUpload}
             className="hidden"
             id="photo-upload"
           />
           <label 
             htmlFor="photo-upload"
             className="bg-offblack text-white px-4 py-2 rounded cursor-pointer hover:bg-offblack/80"
           >
             Change Photo
           </label>
         </div>

         <div>
           <label className="block mb-2 font-medium">Name</label>
           <input
             type="text"
             value={user.name}
             onChange={handleNameChange}
             className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
             placeholder="Enter your name"
           />
         </div>

         <div>
           <label className="block mb-2 font-medium">Email</label>
           <input
             type="email"
             value={user.email}
             disabled
             className="w-full px-4 py-2 border rounded bg-gray-100"
           />
         </div>

         <div>
           <label className="block mb-2 font-medium">Password</label>
           <input
             type="password"
             value="********"
             disabled
             className="w-full px-4 py-2 border rounded bg-gray-100"
           />
         </div>

         <button
           onClick={handleSignOut}
           className="w-full bg-offblack text-white py-2 rounded-lg hover:bg-offblack/80 mt-8"
         >
           Sign Out
         </button>
       </div>
     </div>
   </div>
 );
};

export default PAccount;