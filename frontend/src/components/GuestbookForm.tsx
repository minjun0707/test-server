import React, { useState } from 'react';
import axios from 'axios';
import { GuestEntry } from '../types';
import config from '../config';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Loader2 } from 'lucide-react';
import { useToast } from './ui/use-toast';

const GuestbookForm: React.FC<{ onEntryAdded?: () => void }> = ({ onEntryAdded }) => {
  const [entry, setEntry] = useState<GuestEntry>({ name: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(config.API_ENDPOINTS.ENTRIES, entry);
      setEntry({ name: '', message: '' });
      if (onEntryAdded) {
        onEntryAdded();
      }
      toast({
        title: "성공",
        description: "방명록이 성공적으로 작성되었습니다.",
      });
      window.location.reload(); // 간단한 새로고침으로 목록 갱신
    } catch (err) {
      toast({
        variant: "destructive",
        title: "오류",
        description: "방명록 작성 중 오류가 발생했습니다.",
      });
      console.error('Error submitting entry:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">이름</Label>
        <Input 
          id="name" 
          name="name"
          value={entry.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">메시지</Label>
        <textarea 
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="message" 
          name="message"
          rows={4}
          value={entry.message}
          onChange={handleChange}
          required
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={loading}
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            저장 중...
          </>
        ) : '방명록 작성'}
      </Button>
    </form>
  );
};

export default GuestbookForm; 