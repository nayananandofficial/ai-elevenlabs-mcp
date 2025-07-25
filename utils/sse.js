export function createEventStream(res) {
  return {
    write: (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    },
    end: () => {
      res.write(`event: close\ndata: stream closed\n\n`);
      res.end();
    },
  };
}
