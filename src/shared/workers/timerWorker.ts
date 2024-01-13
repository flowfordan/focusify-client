//WEB WORKER FOR TIMER

let timer: NodeJS.Timeout;
self.onmessage = (e: MessageEvent<string>) => {
  const data = e.data;
  switch (data) {
    case 'tick':
      timer = setTimeout(() => self.postMessage('tok'), 1000);
      break;
    case 'abort':
      clearInterval(timer!);
      break;
    default:
      throw new Error(`Unknown timer command ${data}`);
  }
};

export {};
