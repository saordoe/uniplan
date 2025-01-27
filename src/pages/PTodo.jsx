import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash } from 'lucide-react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const PTodo = () => {
  const [lists, setLists] = useState([]);
  const [editingTitle, setEditingTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editTitleValue, setEditTitleValue] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().todoLists) {
          setLists(docSnap.data().todoLists);
        }
      }
      setLoading(false);
    };
    loadTodos();
  }, []);

  const saveTodos = async (newLists) => {
    if (auth.currentUser) {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        todoLists: newLists
      });
    }
  };

  const addList = () => {
    const newList = {
      id: Date.now(),
      title: 'New List',
      todos: []
    };
    const newLists = [...lists, newList];
    setLists(newLists);
    saveTodos(newLists);
  };

  const startEditingTitle = (list) => {
    setEditingTitle(list.id);
    setEditTitleValue(list.title);
  };

  const saveTitle = (listId) => {
    const newLists = lists.map(list => 
      list.id === listId ? {...list, title: editTitleValue} : list
    );
    setLists(newLists);
    saveTodos(newLists);
    setEditingTitle(null);
  };

 const addTodo = (listId) => {
   const newLists = lists.map(list => {
     if (list.id === listId) {
       return {
         ...list,
         todos: [...list.todos, {
           id: Date.now(),
           text: '',
           completed: false
         }]
       };
     }
     return list;
   });
   setLists(newLists);
   saveTodos(newLists);
 };

 const toggleTodo = (listId, todoId) => {
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
   saveTodos(newLists);
 };

 const editTodo = (listId, todoId, text) => {
   const newLists = lists.map(list => {
     if (list.id === listId) {
       return {
         ...list,
         todos: list.todos.map(todo => 
           todo.id === todoId ? {...todo, text} : todo
         )
       };
     }
     return list;
   });
   setLists(newLists);
   saveTodos(newLists);
 };

 const editListTitle = (listId, newTitle) => {
   const newLists = lists.map(list => 
     list.id === listId ? {...list, title: newTitle} : list
   );
   setLists(newLists);
   saveTodos(newLists);
   setEditingTitle(null);
 };

 const deleteList = (listId) => {
   const newLists = lists.filter(list => list.id !== listId);
   setLists(newLists);
   saveTodos(newLists);
 };

 if (loading) {
  return <div className="bg-offblack w-full h-screen flex-1 py-5 pr-5">
    <div className="bg-offwhite w-full h-full rounded-xl p-8 flex items-center justify-center">
      Loading...
    </div>
  </div>;
}

return (
  <div className="bg-offblack w-full h-screen flex-1 py-5 pr-5">
    <div className="bg-offwhite w-full h-full rounded-xl p-8 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Todo Lists</h1>
        <button 
          onClick={addList}
          className="px-5 py-3 bg-offblack text-white rounded-lg hover:bg-offblack/80 flex items-center"
        >
          <Plus size={20} />
          Add List
        </button>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="inline-flex gap-6 h-full pb-4">
          {lists.map(list => (
            <div key={list.id} className="bg-white p-6 rounded-lg shadow flex flex-col w-80 h-full">
              <div className="flex justify-between items-center mb-4">
                {editingTitle === list.id ? (
                  <input
                    type="text"
                    value={editTitleValue}
                    onChange={(e) => setEditTitleValue(e.target.value)}
                    onBlur={() => saveTitle(list.id)}
                    onKeyDown={(e) => e.key === 'Enter' && saveTitle(list.id)}
                    autoFocus
                    className="text-xl font-bold border-b-2 focus:outline-none"
                  />
                ) : (
                  <h2 
                    className="text-xl font-bold cursor-pointer"
                    onClick={() => startEditingTitle(list)}
                  >
                    {list.title}
                  </h2>
                )}
                <div className="flex gap-2">
                  <Edit2 
                    size={18} 
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => startEditingTitle(list)}
                  />
                  <Trash 
                    size={18} 
                    className="cursor-pointer text-gray-500 hover:text-red-500"
                    onClick={() => deleteList(list.id)}
                  />
                </div>
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
                      <input
                        type="text"
                        value={todo.text}
                        onChange={(e) => editTodo(list.id, todo.id, e.target.value)}
                        className={`flex-1 focus:outline-none ${
                          todo.completed ? 'line-through opacity-50' : ''
                        }`}
                        placeholder="Enter a task..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => addTodo(list.id)}
                className="mt-4 text-offblack hover:text-offblack/80 flex items-center gap-1"
              >
                <Plus size={16} />
                Add Task
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};

export default PTodo;