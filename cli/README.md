# Universal Documentation Standards CLI

CLI tool for adopting Universal Documentation Standards in your projects.

## Installation

```bash
# Using npx (no installation required)
npx universal-doc-standards init

# Or install globally
npm install -g universal-doc-standards
uds init
```

## Commands

### `uds list`

List all available standards.

```bash
# List all standards
uds list

# Filter by level
uds list --level 2

# Filter by category
uds list --category skill
```

**Options:**
- `-l, --level <1|2|3>` - Filter by adoption level
- `-c, --category <name>` - Filter by category (skill, reference, extension, integration, template)

### `uds init`

Initialize standards in your project.

```bash
# Interactive mode (recommended)
uds init

# Non-interactive with defaults
uds init --yes

# Specify options
uds init --level 2 --lang php --locale zh-tw
```

**Options:**
- `-l, --level <1|2|3>` - Adoption level (1=Essential, 2=Recommended, 3=Enterprise)
- `--lang <language>` - Language extension (csharp, php)
- `--framework <name>` - Framework extension (fat-free)
- `--locale <locale>` - Locale extension (zh-tw)
- `--no-skills` - Skip Claude Code Skills installation prompt
- `-y, --yes` - Use defaults, skip interactive prompts

**What it does:**
1. Detects your project's language and framework
2. Asks which standards to adopt
3. Copies reference documents to `.standards/`
4. Copies AI tool integrations (Cursor, Copilot, etc.)
5. Creates `.standards/manifest.json` for tracking

### `uds check`

Check adoption status of current project.

```bash
uds check
```

**Output includes:**
- Installed version and level
- File integrity check
- Skills installation status
- Coverage summary
- Update availability

### `uds update`

Update standards to the latest version.

```bash
# Interactive update
uds update

# Skip confirmation
uds update --yes
```

**Options:**
- `-y, --yes` - Skip confirmation prompts

## Adoption Levels

| Level | Name | Description |
|-------|------|-------------|
| 1 | Essential | Minimum viable standards for any project |
| 2 | Recommended | Professional quality for team projects |
| 3 | Enterprise | Comprehensive standards for enterprise |

## Categories

| Category | Description |
|----------|-------------|
| `skill` | Standards with Claude Code Skills |
| `reference` | Reference documents (no Skills) |
| `extension` | Language/framework-specific |
| `integration` | AI tool configurations |
| `template` | Document templates |

## Example Workflow

```bash
# 1. Navigate to your project
cd my-project

# 2. Initialize standards (interactive)
npx universal-doc-standards init
# ? Select adoption level: Level 2: Recommended
# ? Detected PHP project. Select style guides: PHP Style Guide
# ? Select AI tool integrations: Cursor, GitHub Copilot
# ? Install Claude Code Skills? Yes

# 3. Review what was created
ls .standards/
# checkin-standards.md
# spec-driven-development.md
# manifest.json

# 4. Check status anytime
uds check

# 5. Update when new version is available
uds update
```

## File Structure

After initialization, your project will have:

```
your-project/
├── .standards/
│   ├── manifest.json        # Tracks what was installed
│   ├── checkin-standards.md # Reference documents
│   ├── spec-driven-development.md
│   └── (other standards...)
├── .cursorrules             # AI tool integrations
├── .github/
│   └── copilot-instructions.md
└── ...
```

## Manifest File

The `.standards/manifest.json` tracks your adoption:

```json
{
  "version": "1.0.0",
  "upstream": {
    "repo": "AsiaOstrich/universal-doc-standards",
    "version": "1.3.1",
    "installed": "2025-12-23"
  },
  "level": 2,
  "standards": ["core/checkin-standards.md", ...],
  "extensions": ["extensions/languages/php-style.md"],
  "integrations": [".cursorrules"],
  "skills": {
    "installed": true,
    "version": "1.1.0"
  }
}
```

## Integration with Claude Code Skills

This CLI works alongside [universal-dev-skills](https://github.com/AsiaOstrich/universal-dev-skills):

- **Skills** provide interactive AI assistance (commit messages, code review, etc.)
- **Reference documents** provide guidelines for manual reference

**Important**: For standards with Skills available, use the Skill OR copy the source document — never both.

## Related

- [universal-doc-standards](https://github.com/AsiaOstrich/universal-doc-standards) - Source repository
- [universal-dev-skills](https://github.com/AsiaOstrich/universal-dev-skills) - Claude Code Skills
- [Adoption Guide](https://github.com/AsiaOstrich/universal-doc-standards/blob/main/adoption/ADOPTION-GUIDE.md) - Complete guidance

## License

MIT
