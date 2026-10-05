import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [documentation, setDocumentation] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [subRes, noteRes, assignRes, docRes, annRes] = await Promise.all([
        api.get('/subjects'),
        api.get('/notes'),
        api.get('/assignments'),
        api.get('/documentation'),
        api.get('/announcements'),
      ]);
      setSubjects(subRes.data.data || []);
      setNotes(noteRes.data.data || []);
      setAssignments(assignRes.data.data || []);
      setDocumentation(docRes.data.data || []);
      setAnnouncements(annRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addSubject = async (data) => {
    const res = await api.post('/subjects', data);
    setSubjects(prev => [...prev, res.data.data]);
  };

  const updateSubject = async (id, data) => {
    const res = await api.put(`/subjects/${id}`, data);
    setSubjects(prev => prev.map(s => s.id === id ? res.data.data : s));
  };

  const removeSubject = async (id) => {
    await api.delete(`/subjects/${id}`);
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  return (
    <DataContext.Provider value={{
      subjects, notes, assignments, documentation, announcements, loading,
      addSubject, updateSubject, removeSubject,
    }}>
      {children}
    </DataContext.Provider>
  );
}