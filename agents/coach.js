export async function runCoachAgent({ stream }) {
  return [
    {
      name: 'echo_tool',
      description: 'Repeats what the user says.',
      parameters: {
        type: 'object',
        properties: {
          input: {
            type: 'string',
            description: 'The message to echo back'
          }
        },
        required: ['input']
      },
      run: async ({ input }) => {
        stream.write({ message: `Echoing back: ${input}` });
        return `🗣️ ${input}`;
      }
    },
    {
      name: 'motivate_me',
      description: 'Returns a motivational quote.',
      parameters: {
        type: 'object',
        properties: {}
      },
      run: async () => {
        const quote = "Push yourself, because no one else is going to do it for you.";
        stream.write({ message: `💪 ${quote}` });
        return quote;
      }
    }
  ];
}
