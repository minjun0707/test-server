export interface GuestEntry {
  id?: number;
  name: string;
  message: string;
  createdAt?: string;
}

export interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

declare module 'gif.js' {
  export interface GIFOptions {
    workers?: number;
    quality?: number;
    width?: number;
    height?: number;
    workerScript?: string;
    background?: string;
    transparent?: string | null;
    dither?: boolean;
    debug?: boolean;
    repeat?: number;
    copy?: boolean;
  }

  export default class GIF {
    constructor(options: GIFOptions);
    on(event: string, callback: (data: any) => void): void;
    addFrame(element: HTMLCanvasElement | HTMLImageElement, options?: { delay?: number, copy?: boolean, dispose?: number }): void;
    render(): void;
    abort(): void;
    getBase64(): string;
    getBlobURL(): string;
    getBlob(): Blob;
  }
} 