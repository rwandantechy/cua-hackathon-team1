# Contributing to CUA Research Discovery MCP Server

Thank you for your interest in contributing to the CUA Research Discovery MCP Server! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature or bug fix
4. Make your changes
5. Test your changes
6. Submit a pull request

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/cua-hackathon-team1.git
cd cua-hackathon-team1

# Install dependencies
npm install

# Build the project
npm run build

# Start development
npm run watch
```

## Code Style

- Use TypeScript for all new code
- Follow existing code formatting patterns
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions focused and small

### TypeScript Guidelines

- Use strict type checking
- Avoid `any` types when possible
- Define interfaces for complex data structures
- Use async/await instead of promises chains

## Making Changes

### Branching Strategy

- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Urgent fixes

### Commit Messages

Use clear and descriptive commit messages:

```
feat: add support for filtering by publication date
fix: resolve issue with empty search results
docs: update README with new examples
refactor: simplify IgniteHub API client
test: add tests for search functionality
```

Format: `type: description`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

## Testing

Before submitting a pull request:

1. Build the project: `npm run build`
2. Test the server manually
3. Verify no TypeScript errors
4. Check for security vulnerabilities: `npm audit`

## Pull Request Process

1. Update documentation if needed
2. Ensure your code builds successfully
3. Write a clear PR description explaining:
   - What changes you made
   - Why you made them
   - How to test them
4. Reference any related issues
5. Wait for review and address feedback

### PR Checklist

- [ ] Code builds without errors
- [ ] Changes are documented
- [ ] Commit messages follow guidelines
- [ ] No security vulnerabilities introduced
- [ ] README updated if needed

## Adding New Features

### Adding a New Research Tool

1. Define the tool in `src/index.ts` in the `TOOLS` array
2. Implement the handler in the `CallToolRequestSchema` handler
3. Add the corresponding method in `IgniteHub Client` if needed
4. Update documentation in README.md
5. Add examples in EXAMPLES.md

Example tool definition:

```typescript
{
  name: 'my_new_tool',
  description: 'Description of what the tool does',
  inputSchema: {
    type: 'object',
    properties: {
      param1: {
        type: 'string',
        description: 'Description of param1',
      },
    },
    required: ['param1'],
  },
}
```

### Extending the IgniteHub Client

1. Add the new method to the `IgniteHubClient` class
2. Define TypeScript interfaces for request/response
3. Implement mock data for demo mode
4. Handle errors appropriately

## Documentation

- Keep README.md up to date
- Add examples to EXAMPLES.md for new features
- Comment complex code sections
- Update CHANGELOG.md for significant changes

## Code Review

All submissions require review. We use GitHub pull requests for this purpose. Reviewers will check:

- Code quality and style
- Functionality and correctness
- Documentation completeness
- Security considerations
- Performance implications

## Community Guidelines

- Be respectful and constructive
- Help others learn and grow
- Focus on the code, not the person
- Assume good intentions
- Ask questions when unclear

## Questions?

If you have questions about contributing:

- Open an issue for discussion
- Tag it with `question` label
- Be specific about what you need help with

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Acknowledgments

Thank you for contributing to the CUA Research Discovery MCP Server! Your efforts help make research more accessible and discoverable for everyone.
