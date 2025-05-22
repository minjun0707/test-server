import React from 'react';
import GuestbookForm from './components/GuestbookForm';
import GuestbookList from './components/GuestbookList';
import { Layout } from './components/layout';

function App() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">방명록</h1>
          <p className="text-muted-foreground">방문자 여러분의 메시지를 남겨주세요</p>
        </div>
        
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-5">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="border-b bg-primary/10 p-4">
                <h2 className="text-xl font-semibold">새 메시지 작성</h2>
              </div>
              <div className="p-4">
                <GuestbookForm />
              </div>
            </div>
          </div>
          
          <div className="md:col-span-7">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="border-b bg-primary/10 p-4">
                <h2 className="text-xl font-semibold">방명록 메시지</h2>
              </div>
              <div className="p-4">
                <GuestbookList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
