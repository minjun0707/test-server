import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from './layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tighter mb-4">테스트 서버</h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            방명록과 슬랙 전광판을 이용해보세요
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* 방명록 카드 */}
          <Card className="group hover:shadow-lg transition-all overflow-hidden border-2 border-transparent hover:border-primary/50">
            <CardHeader className="bg-primary/5 pb-4">
              <CardTitle className="text-2xl">방명록</CardTitle>
              <CardDescription className="text-base">방문자 여러분의 메시지를 남겨보세요</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-40 flex items-center justify-center text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 opacity-50 group-hover:opacity-75 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  <line x1="9" y1="10" x2="16" y2="10"></line>
                  <line x1="9" y1="14" x2="14" y2="14"></line>
                </svg>
              </div>
            </CardContent>
            <CardFooter className="bg-card border-t flex justify-end p-4">
              <Button onClick={() => navigate('/guestbook')} className="group-hover:bg-primary transition-colors text-base px-6 py-5">
                방명록 열기
              </Button>
            </CardFooter>
          </Card>
          
          {/* 슬랙 전광판 카드 */}
          <Card className="group hover:shadow-lg transition-all overflow-hidden border-2 border-transparent hover:border-primary/50">
            <CardHeader className="bg-primary/5 pb-4">
              <CardTitle className="text-2xl">슬랙 전광판</CardTitle>
              <CardDescription className="text-base">움직이는 전광판 GIF를 만들어보세요</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-40 flex items-center justify-center text-muted-foreground">
                <div className="relative bg-black/90 w-full max-w-[260px] h-28 rounded-md flex items-center justify-center overflow-hidden group-hover:shadow-[0_0_20px_rgba(0,0,255,0.3)] transition-all">
                  <div className="absolute animate-marquee text-[#00ffff] font-['Digital-7'] text-[36px] tracking-wider" style={{ textShadow: '0 0 8px #00ffff' }}>
                    ✨ 슬랙 전광판 ✨
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-card border-t flex justify-end p-4">
              <Button onClick={() => navigate('/slack')} className="group-hover:bg-primary transition-colors text-base px-6 py-5">
                전광판 만들기
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Home; 