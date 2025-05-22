import React, { useState } from 'react';
import axios from 'axios';
import { GuestEntry } from '../types';
import config from '../config';

const GuestbookForm: React.FC<{ onEntryAdded?: () => void }> = ({ onEntryAdded }) => {
  const [entry, setEntry] = useState<GuestEntry>({ name: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(config.API_ENDPOINTS.ENTRIES, entry);
      setEntry({ name: '', message: '' });
      if (onEntryAdded) {
        onEntryAdded();
      }
      window.location.reload(); // 간단한 새로고침으로 목록 갱신
    } catch (err) {
      setError('방명록 작성 중 오류가 발생했습니다.');
      console.error('Error submitting entry:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="mb-3">
        <label htmlFor="name" className="form-label">이름</label>
        <input 
          type="text" 
          className="form-control" 
          id="name" 
          name="name"
          value={entry.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="message" className="form-label">메시지</label>
        <textarea 
          className="form-control" 
          id="message" 
          name="message"
          rows={4}
          value={entry.message}
          onChange={handleChange}
          required
        />
      </div>
      
      <button 
        type="submit" 
        className="btn btn-primary" 
        disabled={loading}
      >
        {loading ? '저장 중...' : '방명록 작성'}
      </button>
    </form>
  );
};

export default GuestbookForm; 