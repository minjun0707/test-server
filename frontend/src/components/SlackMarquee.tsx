import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import GIF from 'gif.js';
import { Download, Loader2 } from 'lucide-react';
import { Layout } from './layout';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useToast } from './ui/use-toast';
import { HexColorPicker } from 'react-colorful';

// 자주 사용하는 이모지
const popularEmojis = [
  { emoji: '✨', label: '반짝이' },
  { emoji: '🔥', label: '불꽃' },
  { emoji: '⭐', label: '별' },
  { emoji: '💯', label: '100점' },
  { emoji: '🚀', label: '로켓' },
];

// 미리 정의된 색상 옵션
const presetColors = [
  '#ffffff', // 흰색
  '#ff0000', // 빨간색
  '#00ff00', // 녹색
  '#ffff00', // 노란색
  '#00ffff', // 시안
  '#ff00ff', // 마젠타
  '#ff9900', // 주황색
  '#ff3399', // 핑크
  '#3366ff', // 파랑
  '#66ff33', // 라임
  '#9933ff', // 보라
  '#ff6666', // 연한 빨강
];

const SlackMarquee: React.FC = () => {
  const [text, setText] = useState('슬랙에 올릴 움직이는 텍스트를 입력하세요');
  const [color, setColor] = useState('#ffffff');
  const [speed, setSpeed] = useState<number>(5);
  const [marqueePosition, setMarqueePosition] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  
  const { toast } = useToast();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 이모지 추가 - 커서 위치에 추가
  const addEmoji = (emoji: string) => {
    if (inputRef.current) {
      const cursorPos = inputRef.current.selectionStart || 0;
      const textBefore = text.substring(0, cursorPos);
      const textAfter = text.substring(cursorPos);
      
      setText(textBefore + emoji + textAfter);
      
      // 커서 위치 이동을 위한 타이머 설정
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
        }
      }, 10);
    } else {
      setText(prevText => prevText + emoji);
    }
  };
  
  // 색상 복사
  const copyColorToClipboard = (colorHex: string) => {
    navigator.clipboard.writeText(colorHex);
    toast({
      title: "색상 코드 복사됨",
      description: `${colorHex} 색상이 클립보드에 복사되었습니다.`,
      duration: 1500,
    });
  };
  
  // 마퀴 효과 애니메이션
  useEffect(() => {
    const interval = setInterval(() => {
      setMarqueePosition((prev) => {
        // 연속적인 스크롤을 위한 로직 수정
        if (prev <= -800) {
          return 400;
        }
        // 속도에 따라 이동 거리 조정 (값이 클수록 빠름)
        const pixelsPerFrame = speed * 1.2; // 속도 값(1-10)에 맞게 픽셀 이동량 조정
        return prev - pixelsPerFrame;
      });
    }, 16); // 약 60fps
    
    return () => clearInterval(interval);
  }, [speed]);
  
  // GIF 생성
  const generateGif = async () => {
    if (!marqueeRef.current || !containerRef.current) return;
    
    setIsGenerating(true);
    setGifUrl(null);
    
    try {
      toast({
        title: "GIF 생성 중",
        description: "잠시만 기다려주세요...",
        duration: 2000,
      });
      
      // 60fps GIF 생성을 위한 설정
      const frameDelay = 16; // 약 60fps (1000ms / 60 ≈ 16.67ms)
      const frameCount = 60; // 1초 분량의 프레임
      const animationWidth = 400; // 애니메이션 너비
      const totalScrollWidth = 800; // 전체 스크롤 너비
      
      const images: HTMLImageElement[] = [];
      const speedFactor = speed * 1.2; // 미리보기와 동일한 속도 계수
      
      // 프레임 간 위치 이동량 계산 (미리보기와 동일하게)
      const moveDistance = speedFactor * (frameDelay / 16);
      
      // 연속적인 애니메이션을 위한 시작 위치 설정
      let currentPosition = animationWidth;
      
      // 여러 프레임 생성
      for (let i = 0; i < frameCount; i++) {
        // 각 프레임마다 위치 조정 (미리보기와 동일한 방식으로)
        currentPosition -= moveDistance;
        
        // 연속 스크롤을 위한 위치 재설정
        if (currentPosition <= -totalScrollWidth) {
          currentPosition = animationWidth;
        }
        
        // 마퀴 위치 설정
        if (marqueeRef.current) {
          marqueeRef.current.style.transform = `translateX(${currentPosition}px)`;
        }
        
        // 두 번째 마퀴 요소의 위치도 설정 (연속 스크롤을 위해)
        const secondMarquee = containerRef.current.querySelectorAll('div')[1];
        if (secondMarquee) {
          secondMarquee.style.transform = `translateX(${currentPosition + totalScrollWidth}px)`;
        }
        
        // 잠시 기다려 DOM이 업데이트되도록 함
        await new Promise(resolve => setTimeout(resolve, 10));
        
        // 현재 화면 캡처
        const dataUrl = await toPng(containerRef.current, {
          backgroundColor: '#000000',
          width: 400,
          height: 100,
        });
        
        // 이미지 생성 및 로드
        const img = new Image();
        img.src = dataUrl;
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        
        images.push(img);
      }
      
      // GIF 생성
      const gif = new GIF({
        workers: 2,
        quality: 10,
        width: 400,
        height: 100,
        workerScript: '/gif.worker.js',
        background: '#000000',
        repeat: 0, // 무한 반복
      });
      
      // 프레임 추가
      images.forEach((img) => {
        gif.addFrame(img, { delay: frameDelay }); // 60fps에 맞는 지연 시간
      });
      
      // GIF 렌더링
      gif.on('finished', (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        setGifUrl(url);
        
        toast({
          title: "생성 완료",
          description: "GIF가 생성되었습니다. 이미지를 우클릭하여 복사하거나 다운로드 버튼을 클릭하세요.",
          duration: 3000,
        });
        
        setIsGenerating(false);
      });
      
      gif.render();
    } catch (error) {
      console.error('GIF 생성 중 오류 발생:', error);
      toast({
        variant: "destructive",
        title: "오류", 
        description: "GIF 생성 중 오류가 발생했습니다."
      });
      setIsGenerating(false);
    }
    
    // 마퀴 위치 복원
    if (marqueeRef.current) {
      marqueeRef.current.style.transform = '';
    }
  };
  
  // GIF 다운로드
  const downloadGif = () => {
    if (!gifUrl) return;
    
    const link = document.createElement('a');
    link.download = 'slack-marquee.gif';
    link.href = gifUrl;
    link.click();

    toast({
      title: "다운로드",
      description: "GIF 파일이 다운로드 되었습니다."
    });
  };
  
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-3">슬랙 전광판 GIF 생성기</h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            슬랙에서 사용할 수 있는 움직이는 전광판 GIF를 만들어보세요
          </p>
        </div>
        
        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl">전광판 설정</CardTitle>
            <CardDescription className="text-base">텍스트와 색상, 속도를 설정하여 원하는 전광판을 만드세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="marquee-text" className="text-lg">전광판 텍스트</Label>
              <Input 
                id="marquee-text"
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="전광판에 표시할 텍스트를 입력하세요"
                className="text-lg py-6"
              />
              
              {/* 이모지 선택 */}
              <div className="mt-4">
                <Label className="text-base text-muted-foreground mb-2 block">자주 사용하는 이모지</Label>
                <div className="flex flex-wrap gap-2">
                  {popularEmojis.map((item) => (
                    <Button
                      key={item.emoji}
                      variant="outline"
                      size="sm"
                      onClick={() => addEmoji(item.emoji)}
                      className="text-2xl h-10 px-3 hover:bg-primary/10"
                      title={item.label}
                    >
                      {item.emoji}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="text-color" className="text-lg">텍스트 색상</Label>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-md cursor-pointer border border-input"
                    style={{ backgroundColor: color }}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyColorToClipboard(color)}
                    className="h-8 px-2 text-muted-foreground hover:text-foreground"
                  >
                    <span className="text-sm font-mono">{color}</span>
                  </Button>
                </div>
              </div>
              
              {showColorPicker && (
                <div className="relative z-10 border rounded-md p-3 bg-popover shadow-md">
                  <HexColorPicker color={color} onChange={setColor} className="w-full max-w-md mx-auto mb-3" />
                  <div className="flex flex-wrap gap-2 pt-2 border-t">
                    {presetColors.map((presetColor) => (
                      <button
                        key={presetColor}
                        onClick={() => setColor(presetColor)}
                        className={`w-8 h-8 rounded-md transition-transform ${
                          color === presetColor ? 'ring-2 ring-primary scale-110' : 'hover:scale-105'
                        }`}
                        style={{ 
                          backgroundColor: presetColor,
                          boxShadow: `0 0 5px ${presetColor}`
                        }}
                        title={presetColor}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="marquee-speed" className="text-lg">애니메이션 속도: {speed}</Label>
              <Slider 
                id="marquee-speed"
                min={1} 
                max={10} 
                step={1}
                value={[speed]}
                onValueChange={(value) => setSpeed(value[0])}
                className="py-3"
              />
              <div className="flex justify-between text-sm text-muted-foreground pt-1">
                <span>느리게</span>
                <span>빠르게</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl">미리보기</CardTitle>
            <CardDescription className="text-base">전광판 GIF가 어떻게 보일지 미리 확인하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              ref={containerRef}
              className="w-full max-w-[400px] h-[100px] mx-auto bg-black rounded-md overflow-hidden flex items-center relative"
            >
              <div 
                ref={marqueeRef}
                className="whitespace-nowrap font-['Digital-7'] text-[40px] absolute tracking-wider flex items-center h-full"
                style={{ 
                  transform: `translateX(${marqueePosition}px)`,
                  color: color,
                  textShadow: `0 0 5px ${color}`
                }}
              >
                {text}
              </div>
              {/* 연속 스크롤을 위한 복제 요소 */}
              <div 
                className="whitespace-nowrap font-['Digital-7'] text-[40px] absolute tracking-wider flex items-center h-full"
                style={{ 
                  transform: `translateX(${marqueePosition + 800}px)`,
                  color: color,
                  textShadow: `0 0 5px ${color}`
                }}
              >
                {text}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-4">
            <Button 
              onClick={generateGif}
              disabled={isGenerating}
              className="text-base"
            >
              {isGenerating ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Download className="mr-2 h-5 w-5" />
              )}
              GIF 생성하기
            </Button>
          </CardFooter>
        </Card>
        
        {/* 생성된 GIF */}
        {gifUrl && (
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">생성된 GIF</CardTitle>
              <CardDescription className="text-base">
                이미지를 우클릭하여 "이미지 복사"를 선택하거나 다운로드 버튼을 클릭하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <img 
                src={gifUrl} 
                alt="생성된 GIF" 
                className="rounded-md cursor-pointer border border-border max-w-[400px] w-full"
                title="우클릭하여 이미지 복사"
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button onClick={downloadGif} className="text-base">
                <Download className="mr-2 h-5 w-5" />
                다운로드
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default SlackMarquee; 