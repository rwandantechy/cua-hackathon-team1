# Quick Start Guide - CUA Hackathon

Get started with the CUA Research Discovery MCP Server in 5 minutes!

## 🚀 Installation (2 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/rwandantechy/cua-hackathon-team1.git
cd cua-hackathon-team1

# 2. Install dependencies
npm install

# 3. Build the project
npm run build
```

## ✅ Verify Installation

```bash
# Test the server starts correctly
npm start
# Press Ctrl+C to stop
```

You should see: `CUA Research Discovery MCP server running on stdio`

## 🎯 Using with Claude Desktop

### Step 1: Locate Your Config File

**macOS:**
```bash
open ~/Library/Application\ Support/Claude/
```

**Windows:**
```
%APPDATA%\Claude\
```

### Step 2: Edit `claude_desktop_config.json`

Add this configuration (replace `/path/to/` with actual path):

```json
{
  "mcpServers": {
    "research-discovery": {
      "command": "node",
      "args": ["/path/to/cua-hackathon-team1/dist/index.js"]
    }
  }
}
```

### Step 3: Restart Claude Desktop

Close and reopen Claude Desktop app.

## 💡 First Queries to Try

Once connected, try these in Claude:

### 1. Search for Research
```
Find recent papers on artificial intelligence published in 2024
```

### 2. Analyze a Paper
```
Analyze paper-001 and tell me about its methodology
```

### 3. Discover Trends
```
What are the trending topics in quantum computing research?
```

### 4. Find Related Work
```
Find recent advances in neural networks
```

## 🎨 What Can You Build?

### Ideas for the Hackathon:

1. **Research Assistant Chatbot**
   - Help students find papers for their assignments
   - Automated literature review generation
   - Citation network visualization

2. **Trend Dashboard**
   - Track emerging research topics
   - Monitor top authors and institutions
   - Visualize research trends over time

3. **Smart Bibliography Generator**
   - Auto-generate citations
   - Find related papers automatically
   - Organize papers by topic

4. **Research Discovery Bot**
   - Slack/Discord bot for research queries
   - Daily digest of trending papers
   - Team research collaboration tool

5. **Academic Recommender**
   - Personalized paper recommendations
   - Track reading history
   - Suggest related papers

## 🛠️ Available Tools

### search_research
Find papers with advanced filtering
- Search by keywords
- Filter by year, field, author
- Get detailed paper info

### analyze_research
Deep dive into papers
- Extract methodology
- Identify key findings
- Get comprehensive analysis

### discover_related_research
Find connected research
- Citation networks
- Similar topics
- Same authors

### summarize_research_trends
Track research evolution
- Trending topics
- Top researchers
- Emerging methods

## 📚 Documentation

- **README.md** - Complete guide
- **EXAMPLES.md** - Usage examples
- **CONTRIBUTING.md** - How to contribute

## 🆘 Troubleshooting

### Server won't start
```bash
# Rebuild the project
npm run build

# Check for errors
node dist/index.js
```

### Claude can't find the server
1. Check the path in config is absolute
2. Verify the file exists: `ls /path/to/cua-hackathon-team1/dist/index.js`
3. Restart Claude Desktop

### No results returned
The server runs in mock mode by default (no API key needed).
This is perfect for the hackathon!

## 🎓 Learn More

- [MCP Documentation](https://modelcontextprotocol.io)
- [TypeScript Guide](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)

## 🤝 Need Help?

- Check the examples in EXAMPLES.md
- Open an issue on GitHub
- Ask your team members
- Review the code in `src/`

## 🏆 Success Checklist

- [ ] Server builds without errors
- [ ] Claude Desktop shows the tool
- [ ] Can execute search_research
- [ ] Can analyze papers
- [ ] Can discover trends

## 🚀 Ready to Hack!

You're all set! Start building amazing research discovery tools!

**Remember:** The server works in mock mode, so you don't need an API key to get started. Focus on building creative applications!

---

**Good luck with your hackathon project!** 🎉
