import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { createEventStream } from './server/utils/sse';
import { runCoachAgent } from './server/agents/coach';

config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(json());

// ElevenLabs MCP expects this route to stream back responses
app.get('/mcp', async (req, res) => {
  const authToken = req.headers['authorization'];

  if (authToken !== `Bearer ${process.env.MCP_SECRET}`) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  // Start SSE stream
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const stream = createEventStream(res);

  // Simulate handling a voice input (you'll connect Whisper + LLM later)
  await runCoachAgent({ stream });

  // Close stream after completion
  stream.end();
});

app.listen(port, () => {
  console.log(`🧠 MCP Server running on http://localhost:${port}/mcp`);
});
