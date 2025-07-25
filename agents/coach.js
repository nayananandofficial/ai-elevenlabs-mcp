async function runCoachAgent({ stream }) {
  // You can replace this with real Whisper + OpenRouter later
  const fakeResponse = [
    "Hi! I'm your AI communication coach.",
    "Ask me anything about interviews, sales, or building confidence."
  ];

  for (const line of fakeResponse) {
    await new Promise(res => setTimeout(res, 1000)); // simulate delay
    stream.send({ type: 'text', message: line });
  }
}

export { runCoachAgent };