# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         MCP Client                               │
│                    (Claude Desktop, etc.)                        │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          │ JSON-RPC 2.0
                          │ (stdio)
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                  CUA Research Discovery                          │
│                      MCP Server                                  │
│                                                                   │
│  ┌───────────────────────────────────────────────────────┐     │
│  │              Tool Request Handler                      │     │
│  │                                                         │     │
│  │  • search_research                                     │     │
│  │  • analyze_research                                    │     │
│  │  • discover_related_research                           │     │
│  │  • summarize_research_trends                           │     │
│  └───────────────────┬───────────────────────────────────┘     │
│                      │                                           │
│                      ▼                                           │
│  ┌───────────────────────────────────────────────────────┐     │
│  │           IgniteHub API Client                        │     │
│  │                                                         │     │
│  │  • HTTP/REST Client                                    │     │
│  │  • Request/Response Processing                         │     │
│  │  • Mock Data Fallback                                  │     │
│  │  • Error Handling                                      │     │
│  └───────────────────┬───────────────────────────────────┘     │
│                      │                                           │
└──────────────────────┼───────────────────────────────────────────┘
                       │
                       │ HTTPS
                       ▼
         ┌─────────────────────────┐
         │   IgniteHub API         │
         │   (Research Database)   │
         └─────────────────────────┘
```

## Data Flow

### 1. Search Research Flow

```
User Query
    ↓
MCP Client (Claude)
    ↓
JSON-RPC Request → MCP Server
    ↓
search_research Tool
    ↓
IgniteHub Client
    ↓
API Request → IgniteHub API
    ↓
Research Papers Database
    ↓
Response ← Results
    ↓
JSON-RPC Response ← MCP Server
    ↓
MCP Client ← Formatted Results
    ↓
User sees results
```

### 2. Analyze Research Flow

```
Paper ID
    ↓
analyze_research Tool
    ↓
IgniteHub Client
    ↓
API Analysis Request
    ↓
Paper Analysis Engine
    ↓
Extracted Insights
    ↓
Comprehensive Analysis
    ↓
User sees analysis
```

## Components

### MCP Server (`src/index.ts`)

**Responsibilities:**
- Handle MCP protocol communication
- Route tool requests
- Validate input parameters
- Format responses
- Error handling

**Key Features:**
- JSON-RPC 2.0 protocol
- Stdio transport layer
- Tool registration
- Request/response handling

### IgniteHub Client (`src/ignitehub-client.ts`)

**Responsibilities:**
- Make HTTP requests to IgniteHub API
- Process API responses
- Provide mock data fallback
- Handle API errors

**Key Features:**
- Axios-based HTTP client
- TypeScript interfaces
- Mock data generation
- Timeout handling
- Retry logic

## Tool Architecture

### Tool Definition Structure

```typescript
{
  name: string,           // Tool identifier
  description: string,    // What the tool does
  inputSchema: {         // JSON Schema for parameters
    type: 'object',
    properties: {...},
    required: [...]
  }
}
```

### Tool Execution Flow

1. **Request Reception**: MCP server receives tool call
2. **Validation**: Parameters validated against schema
3. **Processing**: Tool handler processes request
4. **API Call**: IgniteHub client makes API request
5. **Response**: Results formatted and returned

## Technology Stack

```
┌─────────────────────────────────────────┐
│         Application Layer               │
│                                          │
│  • TypeScript                            │
│  • ES2022 Modules                        │
│  • Async/Await                           │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│         Framework Layer                  │
│                                          │
│  • MCP SDK                               │
│  • Axios                                 │
│  • Node.js                               │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│         Runtime Layer                    │
│                                          │
│  • Node.js 18+                           │
│  • V8 Engine                             │
│  • Event Loop                            │
└─────────────────────────────────────────┘
```

## Security Architecture

### Input Validation
- JSON Schema validation
- Type checking
- Parameter sanitization
- Safe defaults

### API Security
- HTTPS communication
- API key authentication
- Request timeout limits
- Rate limiting support

### Error Handling
- Try-catch blocks
- Graceful degradation
- Mock data fallback
- User-friendly messages

## Scalability Considerations

### Current Implementation
- Single-process server
- Synchronous request handling
- In-memory state
- Direct API calls

### Future Enhancements
- Caching layer for frequent queries
- Request batching
- Connection pooling
- Load balancing support

## Mock Data Mode

When no API key is provided:

```
User Request
    ↓
MCP Server
    ↓
IgniteHub Client
    ↓
Detect: No API Key
    ↓
Generate Mock Data
    ↓
Return Sample Results
    ↓
User sees demo data
```

**Benefits:**
- No API setup required
- Instant testing
- Consistent demo data
- Offline capability

## Deployment Options

### Option 1: Local Development
```
Developer Machine
    ↓
Node.js Runtime
    ↓
MCP Server (stdio)
    ↓
Claude Desktop
```

### Option 2: Production Setup
```
Server/Container
    ↓
Node.js Runtime
    ↓
MCP Server (stdio/HTTP)
    ↓
MCP Clients
```

## Integration Points

### MCP Client Integration
- Stdio transport (default)
- JSON-RPC 2.0 protocol
- Standard MCP SDK

### API Integration
- RESTful HTTP API
- JSON request/response
- Bearer token authentication

### Future Integrations
- WebSocket support
- GraphQL queries
- Additional research APIs
- Database caching

## Performance Characteristics

### Response Times
- Mock data: < 100ms
- API search: 1-3 seconds
- API analysis: 2-5 seconds
- Trend summary: 3-7 seconds

### Resource Usage
- Memory: ~50-100 MB
- CPU: Low (event-driven)
- Network: Minimal (API calls only)

## Error Recovery

```
Error Occurs
    ↓
Try API Call
    ↓
Timeout/Failure?
    ↓
Log Error
    ↓
Return Mock Data
    ↓
User still gets results
```

## Monitoring Points

1. **Request Metrics**
   - Tool call frequency
   - Response times
   - Error rates

2. **API Metrics**
   - API call count
   - Success/failure ratio
   - Rate limit status

3. **System Metrics**
   - Memory usage
   - CPU utilization
   - Active connections
