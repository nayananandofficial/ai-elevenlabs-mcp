function createEventStream(res) {
  return {
    send: (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    },
    end: () => {
      res.end();
    }
  };
}

export { createEventStream };
