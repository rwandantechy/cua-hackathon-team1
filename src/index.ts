#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { IgniteHubClient } from './ignitehub-client.js';

// Initialize IgniteHub API client
const igniteHub = new IgniteHubClient(process.env.IGNITEHUB_API_KEY || '');

// Define available research discovery tools
const TOOLS: Tool[] = [
  {
    name: 'search_research',
    description: 'Search for research papers, articles, and academic resources using advanced filters',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query for research topics, keywords, or concepts',
        },
        filters: {
          type: 'object',
          properties: {
            year: {
              type: 'string',
              description: 'Publication year or year range (e.g., "2020-2024")',
            },
            field: {
              type: 'string',
              description: 'Research field or domain (e.g., "computer science", "biology")',
            },
            author: {
              type: 'string',
              description: 'Author name to filter by',
            },
          },
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results to return (default: 10)',
          default: 10,
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'analyze_research',
    description: 'Analyze research papers to extract key insights, methodologies, and findings',
    inputSchema: {
      type: 'object',
      properties: {
        paper_id: {
          type: 'string',
          description: 'Unique identifier or URL of the research paper',
        },
        analysis_type: {
          type: 'string',
          enum: ['summary', 'methodology', 'findings', 'citations', 'comprehensive'],
          description: 'Type of analysis to perform on the research paper',
          default: 'comprehensive',
        },
      },
      required: ['paper_id'],
    },
  },
  {
    name: 'discover_related_research',
    description: 'Discover related research papers based on a given paper or topic',
    inputSchema: {
      type: 'object',
      properties: {
        reference: {
          type: 'string',
          description: 'Paper ID, topic, or research area to find related work',
        },
        relationship_type: {
          type: 'string',
          enum: ['citations', 'similar_topics', 'same_authors', 'recent_advances'],
          description: 'Type of relationship to explore',
          default: 'similar_topics',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of related papers to return',
          default: 10,
        },
      },
      required: ['reference'],
    },
  },
  {
    name: 'summarize_research_trends',
    description: 'Summarize research trends and emerging topics in a specific field',
    inputSchema: {
      type: 'object',
      properties: {
        field: {
          type: 'string',
          description: 'Research field or domain to analyze trends',
        },
        time_period: {
          type: 'string',
          description: 'Time period for trend analysis (e.g., "last_year", "last_5_years")',
          default: 'last_year',
        },
        focus: {
          type: 'string',
          enum: ['topics', 'authors', 'institutions', 'methodologies'],
          description: 'Aspect of research to focus trend analysis on',
          default: 'topics',
        },
      },
      required: ['field'],
    },
  },
];

// Create MCP server instance
const server = new Server(
  {
    name: 'cua-research-discovery',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle tool listing requests
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS,
  };
});

// Handle tool execution requests
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'search_research': {
        const { query, filters = {}, limit = 10 } = args as {
          query: string;
          filters?: Record<string, string>;
          limit?: number;
        };
        
        const results = await igniteHub.searchResearch(query, filters, limit);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      }

      case 'analyze_research': {
        const { paper_id, analysis_type = 'comprehensive' } = args as {
          paper_id: string;
          analysis_type?: string;
        };
        
        const analysis = await igniteHub.analyzeResearch(paper_id, analysis_type);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(analysis, null, 2),
            },
          ],
        };
      }

      case 'discover_related_research': {
        const { reference, relationship_type = 'similar_topics', limit = 10 } = args as {
          reference: string;
          relationship_type?: string;
          limit?: number;
        };
        
        const related = await igniteHub.discoverRelated(reference, relationship_type, limit);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(related, null, 2),
            },
          ],
        };
      }

      case 'summarize_research_trends': {
        const { field, time_period = 'last_year', focus = 'topics' } = args as {
          field: string;
          time_period?: string;
          focus?: string;
        };
        
        const trends = await igniteHub.summarizeTrends(field, time_period, focus);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(trends, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('CUA Research Discovery MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
