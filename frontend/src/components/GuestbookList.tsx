import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GuestEntry } from '../types';
import config from '../config';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from './ui/use-toast';

const GuestbookList: React.FC = () => {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await axios.get<GuestEntry[]>(config.API_ENDPOINTS.ENTRIES);
      setEntries(response.data);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "오류",
        description: "방명록 목록을 불러오는 중 오류가 발생했습니다.",
      });
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
        toast({
          title: "성공",
          description: "방명록이 삭제되었습니다.",
        });
        fetchEntries(); // 목록 새로고침
      } catch (err) {
        toast({
          variant: "destructive",
          title: "오류",
          description: "방명록 삭제 중 오류가 발생했습니다.",
        });
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
    return <div className="flex justify-center items-center py-8">방명록을 불러오는 중...</div>;
  }

  if (entries.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">아직 방명록이 없습니다. 첫 방명록을 작성해 보세요!</div>;
  }

  return (
    <div className="space-y-4">
      {entries.map(entry => (
        <Card key={entry.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{entry.name}</CardTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleDelete(entry.id)}
                className="h-8 w-8 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pb-2 pt-0">
            <p className="whitespace-pre-wrap">{entry.message}</p>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-muted-foreground">
            {formatDate(entry.createdAt)}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default GuestbookList; 