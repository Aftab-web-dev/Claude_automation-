# CLI Tool Planning Template

## Project Overview

### Project Name
[Name]

### Description
[One paragraph description]

### Problem Statement
[What problem this solves]

### Target Users
[Developers/DevOps/etc.]

---

## Requirements Summary

### Functional Requirements
- [ ] [Command/feature 1]
- [ ] [Command/feature 2]

### Non-Functional Requirements
- Performance: [Fast startup, efficient execution]
- Compatibility: [OS support, shell support]
- Installation: [npm/brew/cargo/etc.]

---

## Technical Stack

### Language & Runtime
- Language: [Node.js/Python/Go/Rust]
- Package Manager: [npm/pip/cargo]

### Libraries
- CLI Framework: [Commander/Click/Cobra/Clap]
- Output Formatting: [Chalk/Rich/etc.]
- Config Management: [cosmiconfig/etc.]

---

## Command Design

### Command Structure
```
mytool <command> [subcommand] [options] [arguments]
```

### Global Options
| Option | Short | Description |
|--------|-------|-------------|
| --help | -h | Show help |
| --version | -v | Show version |
| --verbose | -V | Verbose output |
| --quiet | -q | Suppress output |
| --config | -c | Config file path |

### Commands

#### Command: init
```
mytool init [options]

Initialize a new project

Options:
  --template <name>   Use a template
  --force            Overwrite existing files

Examples:
  mytool init
  mytool init --template typescript
```

#### Command: build
```
mytool build [options]

Build the project

Options:
  --watch            Watch for changes
  --output <dir>     Output directory

Examples:
  mytool build
  mytool build --watch
```

#### Command: [other]
```
[Define other commands]
```

---

## Architecture

### Folder Structure
```
cli/
├── src/
│   ├── commands/         # Command implementations
│   │   ├── init.ts
│   │   ├── build.ts
│   │   └── index.ts
│   ├── lib/              # Core logic
│   │   ├── config.ts
│   │   ├── logger.ts
│   │   └── utils.ts
│   ├── types/            # TypeScript types
│   └── index.ts          # Entry point
├── tests/
│   ├── commands/
│   └── lib/
├── docs/
├── bin/                  # Executable entry
│   └── mytool
└── package.json
```

### Flow Diagram
```
┌─────────────┐
│   User      │
│   Input     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Parser    │ ── Parse args & options
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Validator  │ ── Validate input
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Command    │ ── Execute command
│  Handler    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Output    │ ── Format & display
└─────────────┘
```

---

## Configuration

### Config File Locations
1. `.mytoolrc`
2. `.mytoolrc.json`
3. `.mytoolrc.yaml`
4. `mytool.config.js`
5. `package.json` → `"mytool": { }`

### Config Schema
```json
{
  "output": "./dist",
  "verbose": false,
  "plugins": []
}
```

---

## Development Steps

### Step 1: Project Setup
- [ ] Initialize project
- [ ] Set up TypeScript
- [ ] Configure CLI framework
- [ ] Create entry point

### Step 2: Core Infrastructure
- [ ] Implement argument parser
- [ ] Implement config loader
- [ ] Implement logger
- [ ] Implement error handling

### Step 3: Implement Commands
- [ ] init command
- [ ] build command
- [ ] [other commands]

### Step 4: User Experience
- [ ] Help text
- [ ] Error messages
- [ ] Progress indicators
- [ ] Colors and formatting

### Step 5: Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing on different OS

### Step 6: Distribution
- [ ] npm publish setup
- [ ] Binary builds (if applicable)
- [ ] Documentation

---

## UX Guidelines

### Output Formatting
```
✓ Success messages in green
✗ Error messages in red
⚠ Warning messages in yellow
ℹ Info messages in blue
```

### Progress Indicators
- Use spinners for long operations
- Show progress bars for measurable tasks
- Provide time estimates when possible

### Error Messages
```
Error: Could not find config file

  The file '.mytoolrc' was not found in the current directory
  or any parent directory.

  To fix this, run:
    mytool init

  For more information, see:
    https://docs.example.com/config
```

---

## Installation Instructions

### npm (Node.js)
```bash
npm install -g mytool
```

### From Source
```bash
git clone https://github.com/user/mytool
cd mytool
npm install
npm link
```
