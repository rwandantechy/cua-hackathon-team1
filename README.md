# CUA Research Discovery MCP Server

Intelligent research discovery tools built for the Catholic University of America Hackathon. This project leverages the **IgniteHub API** and **Model Context Protocol (MCP)** to provide powerful research discovery capabilities.

## Features

- 🔍 **Advanced Research Search**: Search for research papers with sophisticated filtering
- 📊 **Research Analysis**: Analyze papers to extract insights, methodologies, and findings
- 🔗 **Related Research Discovery**: Find related papers based on citations and topics
- 📈 **Trend Analysis**: Identify emerging trends and popular topics in research fields

## Architecture

This project implements a Model Context Protocol (MCP) server that provides research discovery tools through a standardized interface. The server integrates with the IgniteHub API to access a comprehensive database of research papers and academic resources.

### Components

- **MCP Server** (`src/index.ts`): Main server implementation handling tool requests
- **IgniteHub Client** (`src/ignitehub-client.ts`): API client for IgniteHub integration
- **Research Tools**: Four main tools for research discovery and analysis

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- IgniteHub API key (optional for demo mode)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/rwandantechy/cua-hackathon-team1.git
cd cua-hackathon-team1
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env and add your IgniteHub API key
```

4. Build the project:
```bash
npm run build
```

## Usage

### Running the MCP Server

Start the server using stdio transport:

```bash
npm start
```

Or run in development mode with auto-rebuild:

```bash
npm run watch
```

### Available Tools

#### 1. search_research

Search for research papers using keywords and filters.

**Parameters:**
- `query` (required): Search query for research topics
- `filters` (optional): Filter criteria
  - `year`: Publication year or range (e.g., "2020-2024")
  - `field`: Research field (e.g., "computer science")
  - `author`: Author name
- `limit` (optional): Maximum results (default: 10)

**Example:**
```json
{
  "query": "machine learning",
  "filters": {
    "year": "2023-2024",
    "field": "computer science"
  },
  "limit": 5
}
```

#### 2. analyze_research

Analyze a research paper to extract key information.

**Parameters:**
- `paper_id` (required): Unique identifier or URL of the paper
- `analysis_type` (optional): Type of analysis
  - `summary`: Brief overview
  - `methodology`: Research methods used
  - `findings`: Key findings and results
  - `citations`: Citation information
  - `comprehensive`: All of the above (default)

**Example:**
```json
{
  "paper_id": "paper-001",
  "analysis_type": "comprehensive"
}
```

#### 3. discover_related_research

Find papers related to a given reference.

**Parameters:**
- `reference` (required): Paper ID, topic, or research area
- `relationship_type` (optional): Type of relationship
  - `citations`: Papers that cite or are cited by the reference
  - `similar_topics`: Papers on similar topics (default)
  - `same_authors`: Papers by the same authors
  - `recent_advances`: Recent advances in the same area
- `limit` (optional): Maximum results (default: 10)

**Example:**
```json
{
  "reference": "neural networks",
  "relationship_type": "recent_advances",
  "limit": 10
}
```

#### 4. summarize_research_trends

Analyze trends in a research field over time.

**Parameters:**
- `field` (required): Research field to analyze
- `time_period` (optional): Period for analysis (default: "last_year")
  - `last_year`
  - `last_5_years`
  - `last_decade`
- `focus` (optional): Aspect to focus on (default: "topics")
  - `topics`: Trending research topics
  - `authors`: Top authors in the field
  - `institutions`: Leading institutions
  - `methodologies`: Emerging research methods

**Example:**
```json
{
  "field": "artificial intelligence",
  "time_period": "last_5_years",
  "focus": "topics"
}
```

## MCP Client Configuration

To use this server with an MCP client (like Claude Desktop), add the following configuration:

### Claude Desktop Configuration

Add to your Claude Desktop config file:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "research-discovery": {
      "command": "node",
      "args": ["/path/to/cua-hackathon-team1/dist/index.js"],
      "env": {
        "IGNITEHUB_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Development

### Project Structure

```
cua-hackathon-team1/
├── src/
│   ├── index.ts              # Main MCP server
│   └── ignitehub-client.ts   # IgniteHub API client
├── dist/                      # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

### Scripts

- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Run the compiled server
- `npm run dev`: Build and run in one command
- `npm run watch`: Watch mode for development

### Mock Data Mode

If no IgniteHub API key is provided, the server will operate in mock data mode, returning realistic sample data for demonstration purposes. This is useful for:

- Testing the MCP integration
- Demonstrating functionality without API access
- Development and debugging

## API Integration

The IgniteHub API provides access to:

- Millions of research papers across all academic fields
- Advanced search and filtering capabilities
- Citation networks and relationship mapping
- Real-time trend analysis
- Author and institution profiles

Get your API key at: https://ignitehub.com/api/keys

## Technology Stack

- **TypeScript**: Type-safe development
- **Model Context Protocol SDK**: MCP server implementation
- **Axios**: HTTP client for API requests
- **Node.js**: Runtime environment

## Use Cases

### For Researchers
- Quickly find relevant papers in your field
- Analyze research methodologies and findings
- Track citations and research impact
- Discover emerging trends and hot topics

### For Students
- Find papers for literature reviews
- Understand research methodologies
- Explore related work in your area
- Identify key authors and institutions

### For Academic Institutions
- Monitor research output and trends
- Identify collaboration opportunities
- Track emerging fields and topics
- Analyze institutional research impact

## Contributing

This is a hackathon project for Catholic University of America. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Team

CUA Hackathon Team 1

## Acknowledgments

- Catholic University of America for hosting the hackathon
- IgniteHub for providing the research API
- Model Context Protocol for the standardized interface

## Support

For questions or issues:
- Open an issue on GitHub
- Contact the development team
- Consult the IgniteHub API documentation

---

Built with ❤️ for the Catholic University of America Hackathon
