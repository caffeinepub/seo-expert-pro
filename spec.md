# SEO Expert Pro

## Current State
The chatbot calls OpenAI directly from the browser frontend (`fetch` to `https://api.openai.com/...`). This fails because ICP-hosted apps cannot make CORS-restricted cross-origin requests from the browser to external APIs. The chatbot always returns the "trouble connecting" error message.

## Requested Changes (Diff)

### Add
- Backend `askOpenAI(question: Text, history: Text) : async Text` function using HTTP outcalls to call OpenAI's chat completions API
- The backend encodes the request, calls OpenAI, decodes the response, and returns the reply text

### Modify
- `ChatBot.tsx`: replace `getAIReply` fetch call with a call to `actor.askOpenAI(userMessage, historyJson)` on the backend

### Remove
- Direct `fetch` to OpenAI from the frontend
- Hardcoded API key in frontend code

## Implementation Plan
1. Add `askOpenAI` Motoko function using `http-outcalls` component to proxy the OpenAI API call from the backend
2. Update `ChatBot.tsx` to call `actor.askOpenAI` instead of calling OpenAI directly
