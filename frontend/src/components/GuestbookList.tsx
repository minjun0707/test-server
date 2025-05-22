import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GuestEntry } from '../types';
import config from '../config';

const GuestbookList: React.FC = () => {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await axios.get<GuestEntry[]>(config.API_ENDPOINTS.ENTRIES);
      setEntries(response.data);
      setError(null);
    } catch (err) {
      setError('방명록 목록을 불러오는 중 오류가 발생했습니다.');
      console.error('Error fetching entries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id?: number) => {
    if (!id) return;
    
    if (window.confirm('정말로 이 메시지를 삭제하시겠습니까?')) {
      try {
        await axios.delete(`${config.API_ENDPOINTS.ENTRIES}/${id}`);
        fetchEntries(); // 목록 새로고침
      } catch (err) {
        setError('방명록 삭제 중 오류가 발생했습니다.');
        console.error('Error deleting entry:', err);
      }
    }
  };

  // 날짜 형식 변환 함수
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading && entries.length === 0) {
    return <div className="text-center my-4">방명록을 불러오는 중...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (entries.length === 0) {
    return <div className="text-center my-4">아직 방명록이 없습니다. 첫 방명록을 작성해 보세요!</div>;
  }

  return (
    <div>
      {entries.map(entry => (
        <div key={entry.id} className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="card-title">{entry.name}</h5>
              <button 
                onClick={() => handleDelete(entry.id)}
                className="btn btn-sm btn-outline-danger"
              >
                삭제
              </button>
            </div>
            <p className="card-text">{entry.message}</p>
            <div className="text-muted small">
              {formatDate(entry.createdAt)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuestbookList; 