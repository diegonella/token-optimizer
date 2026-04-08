# Token Optimizer

> [Versión en español](README.md)

Claude Code skill that optimizes all responses for maximum quality with minimum token usage.

## Installation

```bash
claude install-skill token-optimizer.skill
```

Or by cloning the repo:

```bash
git clone git@github.com:diegonella/token-optimizer.git
claude install-skill token-optimizer/token-optimizer.skill
```

## Usage

### Activate in a project

```bash
/token-optimizer:install
```

This creates the configuration in `.claude/settings.json` of the current project with level 1 by default.

### Commands

| Command | Effect |
|---------|--------|
| `/token-optimizer:install` | Activate in current project (level 1) |
| `/token-optimizer:level N` | Change intensity (0-3) |
| `/token-optimizer:toggle` | Enable/disable without uninstalling |
| `/token-optimizer:status` | Show current state |
| `/token-optimizer:uninstall` | Remove from project |

### Optimization levels

| Level | Behavior | Best for |
|-------|----------|----------|
| 0 | Disabled | Prose, creative content |
| 1 | Optimizes if response is verbose (>500 tokens) | General development (default) |
| 2 | Always optimizes | Repetitive technical tasks |
| 3 | Aggressive optimization | Maximum density, expert user |

## What it does

When active, the skill enforces these rules on all responses:

- **No pleasantries** — Skips unnecessary introductions and closings
- **Dense format** — Lists/tables only when they save space
- **Technical precision** — Exact terminology, no repeating the obvious
- **Surgical delivery** — Only modified code, not the whole file
- **Redundancy control** — Picks the most logical interpretation without asking
- **Raw output** — Content over narrative aesthetics

## Examples

### Verbose (without skill)
```
To create a login in React, you need to follow these steps. First, you need
a form with email and password fields. Then, you implement the authentication.
It's important to validate the fields before submitting...
```

### Optimized (with skill, level 2+)
```tsx
<form onSubmit={async (e) => {
  e.preventDefault();
  const token = await auth(email, pwd);
  localStorage.setItem('token', token);
}}>
  <input value={email} onChange={e => setEmail(e.target.value)} />
  <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} />
  <button>Login</button>
</form>
```

## Configuration

Config is stored in `.claude/settings.json` per project:

```json
{
  "token-optimizer": {
    "enabled": true,
    "level": 1,
    "installed_at": "2026-04-08T15:30:00.000Z"
  }
}
```

## Structure

```
token-optimizer/
├── SKILL.md                  # Main prompt + rules
├── README.md                 # Docs (Spanish)
├── README.en.md              # Docs (English)
├── token-optimizer.skill     # Installable package
├── scripts/
│   ├── install.js           # Installs in .claude/
│   └── control.js           # level, toggle, status, uninstall
├── references/
│   └── ARCHITECTURE.md      # Implementation details
└── evals/
    └── evals.json           # Test cases
```

## Limitations

- Security takes priority over brevity
- Does not sacrifice technical accuracy
- Levels 2-3 may not be ideal for prose or junior users

## License

MIT
