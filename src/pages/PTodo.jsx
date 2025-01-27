import React, { useState, useEffect } from 'react';
import { Plus, Edit2 } from 'lucide-react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Hero1 = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setLists(data.todoLists?.slice(0, 2) || []);
          setUserName(data.name || '');
        }
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const toggleTodo = async (listId, todoId) => {
    const newLists = lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          todos: list.todos.map(todo => 
            todo.id === todoId ? {...todo, completed: !todo.completed} : todo
          )
        };
      }
      return list;
    });
    
    setLists(newLists);

    if (auth.currentUser) {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const allLists = docSnap.data().todoLists;
        const updatedLists = allLists.map(list => 
          list.id === listId ? newLists.find(l => l.id === listId) : list
        );
        await updateDoc(docRef, { todoLists: updatedLists });
      }
    }
  };

  return (
    <div className="h-2/3 bg-offwhite rounded-xl p-8">
      <div className="font-bold text-xl mb-4" style={{ minWidth: '150px' }}>{loading ? "Loading..." : (userName ? `${userName}'s` : "User's")} TODOs</div>
      <div className="flex gap-6 h-[calc(100%-2rem)] overflow-x-auto pb-4">
        {lists.map(list => (
          <div key={list.id} className="bg-white p-6 rounded-lg shadow flex flex-col w-80 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{list.title}</h2>
              <Edit2 size={18} className="text-gray-500" />
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-2">
                {list.todos.map(todo => (
                  <div key={todo.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(list.id, todo.id)}
                      className="h-4 w-4"
                    />
                    <div className={`flex-1 ${todo.completed ? 'line-through opacity-50' : ''}`}>
                      {todo.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        {lists.length === 0 && (
          <div className="flex items-center justify-center w-full text-gray-500">
            No todo lists yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero1;