export const openSocket = (jwt: string, host: string): Promise<WebSocket> =>
  new Promise<WebSocket>((resolve, reject) => {
    const ws = new WebSocket(`ws://${host}/chat?token=${jwt}`);
    ws.addEventListener("open", () => resolve(ws));
    ws.addEventListener("error", reject);
  });
