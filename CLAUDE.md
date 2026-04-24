# TypingMind Plugin Development

This project contains custom plugins for [TypingMind](https://www.typingmind.com).

## Plugin Types

| Type | When to use |
|------|-------------|
| **JavaScript** | Logic runs in the browser — no server needed |
| **HTTP Actions** | Calls an external REST API (must support CORS) |
| **MCP** | Integrates a Model Context Protocol server |

## Plugin JSON Structure

Each plugin is a single JSON file imported into TypingMind via:
**Settings → Plugins → Add Plugin → Import JSON**

Top-level fields:

```
uuid               unique ID string
emoji              icon shown in the UI
title              display name
overviewMarkdown   description (supports markdown)
authenticationType "AUTH_TYPE_NONE" | API key | OAuth
permissions        e.g. ["read_user_message"]
userSettings       array of user-configurable inputs (API keys, options)
pluginContext       instructions added to the system prompt when plugin is active
openAPISpec        OpenAI Function Spec — name, description, parameters
implementationType "javascript" | "http" | "mcp"
implementationCode JS source code (javascript type only)
outputType         "render-markdown" | "render-html" | "send-to-ai"
```

## JavaScript Plugin Signature

```javascript
async function functionName({ param1, param2 }, userSettings, resources) {
  // param1, param2  — values the AI provides per openAPISpec
  // userSettings    — user-configured values (API keys, options)
  // resources.userMessage.attachments  — files attached by the user
  // resources.previousRunOutput        — output from a prior run of this plugin

  return "string";          // rendered per outputType
  // OR
  throw new Error("...");   // shown to user; AI can retry with different params
}
```

The function name in the code **must match** the `name` field in `openAPISpec`.

## Output Types

- `render-markdown` — return a markdown string, rendered as a chat message
- `render-html` — return an HTML string, rendered in a sandboxed iframe
- `send-to-ai` — return data for the AI to process and respond to

## Testing Workflow

1. Edit `implementation.js` (easier to work with than the escaped string in JSON)
2. Copy the updated code into the `implementationCode` field of `plugin.json`
3. Copy the full `plugin.json` content
4. In TypingMind: Settings → Plugins → Add Plugin → paste JSON
5. Enable the plugin in a chat and test
6. Use browser DevTools (F12) to debug JS errors in the sandbox iframe

## Sandbox Limitations

- The JS sandbox is `<iframe sandbox="allow-scripts">` — no parent DOM access
- For file downloads, use a `data:` URI with a `<a download>` link (return as HTML)
- For external HTTP calls, the target server must allow CORS

## Folder Structure

```
plugins/
  export-chat-markdown/
    plugin.json        ← full importable plugin (copy into TypingMind)
    implementation.js  ← JS code standalone for easier editing
```

## Reference

- Docs: https://docs.typingmind.com/plugins/build-a-typingmind-plugin
- Schema: https://docs.typingmind.com/plugins/typingmind-plugin-json-schema
