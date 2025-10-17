#!/usr/bin/env node

/**
 * Test script for the CUA Research Discovery MCP Server
 * This script demonstrates the server's functionality by making test calls
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start the MCP server
const serverPath = join(__dirname, '../dist/index.js');
const server = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'inherit'],
  env: { ...process.env }
});

let responseBuffer = '';

server.stdout.on('data', (data) => {
  responseBuffer += data.toString();
  
  // Try to parse complete JSON-RPC messages
  const lines = responseBuffer.split('\n');
  responseBuffer = lines.pop() || ''; // Keep incomplete line in buffer
  
  lines.forEach(line => {
    if (line.trim()) {
      try {
        const response = JSON.parse(line);
        console.log('\n--- Server Response ---');
        console.log(JSON.stringify(response, null, 2));
      } catch (e) {
        // Not a complete JSON message yet
      }
    }
  });
});

// Helper function to send JSON-RPC requests
function sendRequest(method, params) {
  const request = {
    jsonrpc: '2.0',
    id: Date.now(),
    method,
    params
  };
  
  console.log('\n--- Sending Request ---');
  console.log(JSON.stringify(request, null, 2));
  
  server.stdin.write(JSON.stringify(request) + '\n');
}

// Wait a bit for server to initialize
setTimeout(() => {
  console.log('Testing CUA Research Discovery MCP Server...\n');
  
  // Test 1: Initialize connection
  console.log('\n=== TEST 1: Initialize ===');
  sendRequest('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: {
      name: 'test-client',
      version: '1.0.0'
    }
  });
  
  // Test 2: List available tools
  setTimeout(() => {
    console.log('\n=== TEST 2: List Tools ===');
    sendRequest('tools/list', {});
  }, 1000);
  
  // Test 3: Search research
  setTimeout(() => {
    console.log('\n=== TEST 3: Search Research ===');
    sendRequest('tools/call', {
      name: 'search_research',
      arguments: {
        query: 'artificial intelligence',
        filters: {
          year: '2023-2024',
          field: 'computer science'
        },
        limit: 3
      }
    });
  }, 2000);
  
  // Test 4: Analyze research
  setTimeout(() => {
    console.log('\n=== TEST 4: Analyze Research ===');
    sendRequest('tools/call', {
      name: 'analyze_research',
      arguments: {
        paper_id: 'paper-001',
        analysis_type: 'comprehensive'
      }
    });
  }, 3000);
  
  // Test 5: Discover related research
  setTimeout(() => {
    console.log('\n=== TEST 5: Discover Related Research ===');
    sendRequest('tools/call', {
      name: 'discover_related_research',
      arguments: {
        reference: 'machine learning',
        relationship_type: 'recent_advances',
        limit: 3
      }
    });
  }, 4000);
  
  // Test 6: Summarize trends
  setTimeout(() => {
    console.log('\n=== TEST 6: Summarize Research Trends ===');
    sendRequest('tools/call', {
      name: 'summarize_research_trends',
      arguments: {
        field: 'artificial intelligence',
        time_period: 'last_year',
        focus: 'topics'
      }
    });
  }, 5000);
  
  // Cleanup after all tests
  setTimeout(() => {
    console.log('\n\n=== All tests completed ===');
    console.log('Shutting down server...');
    server.kill();
    process.exit(0);
  }, 7000);
  
}, 500);

// Handle errors
server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

server.on('close', (code) => {
  console.log(`\nServer exited with code ${code}`);
});
