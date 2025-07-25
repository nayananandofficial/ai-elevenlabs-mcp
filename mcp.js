import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { createEventStream } from './utils/sse.js';
import { runCoachAgent } from './agents/coach.js';

config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(json());

app.get('/', (req, res) => {
  res.send('🧠 MCP Agent is alive and listening...');
});

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

  // Run MCP Agent and get tools
  try {
    const tools = await runCoachAgent({ stream });
    stream.write({ tools }); // MCP expects tools to be streamed like this
    stream.end(); // Close the stream cleanly
  } catch (err) {
    console.error('MCP Error:', err);
    res.status(500).json({ error: 'Internal MCP error' });
  }
});

app.listen(port, () => {
  console.log(`🧠 MCP Server running at http://localhost:${port}/mcp`);
});
