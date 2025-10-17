# Example Usage Guide

This guide provides practical examples of using the CUA Research Discovery MCP Server.

## Setup

1. Ensure the server is running in an MCP client (like Claude Desktop)
2. The server will automatically be available through the MCP interface

## Example Conversations

### Example 1: Finding Recent AI Research

**You**: "Can you help me find recent research papers on artificial intelligence and machine learning published in 2024?"

**Assistant** (using `search_research` tool):
```json
{
  "query": "artificial intelligence machine learning",
  "filters": {
    "year": "2024",
    "field": "computer science"
  },
  "limit": 10
}
```

**Result**: List of recent AI/ML papers with titles, authors, abstracts, and citation counts.

---

### Example 2: Analyzing a Research Paper

**You**: "I found an interesting paper with ID 'paper-001'. Can you analyze it and tell me about the methodology used?"

**Assistant** (using `analyze_research` tool):
```json
{
  "paper_id": "paper-001",
  "analysis_type": "methodology"
}
```

**Result**: Detailed analysis of the research methodology, including experimental design, data collection methods, and statistical approaches.

---

### Example 3: Discovering Related Work

**You**: "I'm working on neural networks. What are some recent advances in this field?"

**Assistant** (using `discover_related_research` tool):
```json
{
  "reference": "neural networks",
  "relationship_type": "recent_advances",
  "limit": 5
}
```

**Result**: List of recent papers advancing neural network research, with summaries of their contributions.

---

### Example 4: Research Trend Analysis

**You**: "What are the trending topics in quantum computing research over the last 5 years?"

**Assistant** (using `summarize_research_trends` tool):
```json
{
  "field": "quantum computing",
  "time_period": "last_5_years",
  "focus": "topics"
}
```

**Result**: Analysis of trending topics, emerging themes, and research directions in quantum computing.

---

### Example 5: Finding Papers by Author

**You**: "Can you find papers published by Dr. Jane Smith in the field of biology?"

**Assistant** (using `search_research` tool):
```json
{
  "query": "biology",
  "filters": {
    "author": "Dr. Jane Smith",
    "field": "biology"
  },
  "limit": 10
}
```

**Result**: List of papers authored or co-authored by Dr. Jane Smith in biology.

---

## Advanced Use Cases

### Literature Review Workflow

1. **Initial Search**: Find papers on your topic
   ```
   "Find papers on sustainable energy systems"
   ```

2. **Analyze Key Papers**: Deep dive into promising papers
   ```
   "Analyze paper-123 comprehensively"
   ```

3. **Discover Related Work**: Find connected research
   ```
   "Find papers that cite paper-123"
   ```

4. **Identify Trends**: Understand the field's evolution
   ```
   "What are the trends in sustainable energy over the last decade?"
   ```

### Research Gap Identification

1. **Survey Current Research**:
   ```
   "Find recent papers on blockchain security"
   ```

2. **Analyze Methodologies**:
   ```
   "What methodologies are used in blockchain security research?"
   ```

3. **Identify Emerging Areas**:
   ```
   "What are the emerging topics in blockchain security?"
   ```

### Collaboration Discovery

1. **Find Top Authors**:
   ```
   "Who are the leading researchers in climate science?"
   ```

2. **Identify Institutions**:
   ```
   "Which institutions are doing cutting-edge work in renewable energy?"
   ```

3. **Track Citation Networks**:
   ```
   "Show me papers that cite the work of Prof. John Doe"
   ```

## Tips for Best Results

1. **Be Specific**: More specific queries yield better results
   - ❌ "AI papers"
   - ✅ "Deep learning applications in medical image analysis"

2. **Use Filters**: Narrow down results with filters
   - Use year ranges for recent work
   - Specify research fields for focused results
   - Filter by author when tracking specific researchers

3. **Combine Tools**: Use multiple tools for comprehensive research
   - Search → Analyze → Discover Related
   - Trends → Search → Analyze

4. **Iterate**: Refine your queries based on results
   - Start broad, then narrow down
   - Explore related papers from interesting results
   - Use insights from trend analysis to guide searches

## Mock Data Mode

When running without an IgniteHub API key, the server operates in mock data mode:

- Returns realistic sample data for all queries
- Useful for testing and demonstration
- Papers have IDs like "paper-001", "paper-002", etc.
- Trends show plausible topics and insights

To use real data, configure your IgniteHub API key in the `.env` file or Claude Desktop configuration.

## Troubleshooting

### Server Not Responding
- Check that the server is running
- Verify the path in your MCP client configuration
- Check for errors in the server logs

### No Results Returned
- Verify your query is not too specific
- Try removing some filters
- Check if the field/year range is valid

### API Errors
- Ensure your IgniteHub API key is valid
- Check your API rate limits
- Verify network connectivity

## Need Help?

- Check the main README.md for setup instructions
- Review the tool schemas in src/index.ts
- Open an issue on GitHub for bugs or feature requests
