import inquirer from 'inquirer';
import chalk from 'chalk';

/**
 * Prompt for installation mode
 * @returns {Promise<string>} 'skills' or 'full'
 */
export async function promptInstallMode() {
  const { mode } = await inquirer.prompt([
    {
      type: 'list',
      name: 'mode',
      message: 'Select installation mode:',
      choices: [
        {
          name: `${chalk.green('Skills Mode')} ${chalk.gray('(推薦)')} - Use Claude Code Skills`,
          value: 'skills'
        },
        {
          name: `${chalk.yellow('Full Mode')} - Install all standards without Skills`,
          value: 'full'
        }
      ],
      default: 'skills'
    }
  ]);

  // Show explanation based on selection
  console.log();
  if (mode === 'skills') {
    console.log(chalk.gray('  → Skills will be installed to ~/.claude/skills/'));
    console.log(chalk.gray('  → Only static standards will be copied to .standards/'));
  } else {
    console.log(chalk.gray('  → All standards will be copied to .standards/'));
    console.log(chalk.gray('  → No Skills will be installed'));
  }
  console.log();

  return mode;
}

/**
 * Prompt for Skills upgrade action
 * @param {string} installedVersion - Currently installed version (may be null)
 * @param {string} latestVersion - Latest available version
 * @returns {Promise<string>} 'upgrade', 'keep', or 'reinstall'
 */
export async function promptSkillsUpgrade(installedVersion, latestVersion) {
  const versionDisplay = installedVersion
    ? `v${installedVersion} → v${latestVersion}`
    : `unknown → v${latestVersion}`;

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: `Skills detected (${versionDisplay}). What would you like to do?`,
      choices: [
        {
          name: `${chalk.green('Upgrade')} - Update to latest version`,
          value: 'upgrade'
        },
        {
          name: `${chalk.gray('Keep')} - Keep current version`,
          value: 'keep'
        },
        {
          name: `${chalk.yellow('Reinstall')} - Fresh install (overwrites existing)`,
          value: 'reinstall'
        }
      ],
      default: 'upgrade'
    }
  ]);

  return action;
}

/**
 * Prompt for adoption level
 * @returns {Promise<number>} Selected level
 */
export async function promptLevel() {
  const { level } = await inquirer.prompt([
    {
      type: 'list',
      name: 'level',
      message: 'Select adoption level:',
      choices: [
        {
          name: `${chalk.green('Level 1: Essential')} ${chalk.gray('(基本)')} - Minimum viable standards`,
          value: 1
        },
        {
          name: `${chalk.yellow('Level 2: Recommended')} ${chalk.gray('(推薦)')} - Professional quality`,
          value: 2
        },
        {
          name: `${chalk.blue('Level 3: Enterprise')} ${chalk.gray('(企業)')} - Comprehensive standards`,
          value: 3
        }
      ],
      default: 1
    }
  ]);

  return level;
}

/**
 * Prompt for language extension
 * @param {Object} detected - Detected languages
 * @returns {Promise<string|null>} Selected language or null
 */
export async function promptLanguage(detected) {
  const choices = [];

  if (detected.csharp) {
    choices.push({ name: 'C# Style Guide', value: 'csharp', checked: true });
  }
  if (detected.php) {
    choices.push({ name: 'PHP Style Guide (PSR-12)', value: 'php', checked: true });
  }

  if (choices.length === 0) {
    return null;
  }

  const { languages } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'languages',
      message: 'Detected language(s). Select style guides to include:',
      choices
    }
  ]);

  return languages;
}

/**
 * Prompt for framework extension
 * @param {Object} detected - Detected frameworks
 * @returns {Promise<string|null>} Selected framework or null
 */
export async function promptFramework(detected) {
  const choices = [];

  if (detected['fat-free']) {
    choices.push({ name: 'Fat-Free Framework Patterns', value: 'fat-free', checked: true });
  }

  if (choices.length === 0) {
    return null;
  }

  const { frameworks } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'frameworks',
      message: 'Detected framework(s). Select patterns to include:',
      choices
    }
  ]);

  return frameworks;
}

/**
 * Prompt for locale
 * @returns {Promise<string|null>} Selected locale or null
 */
export async function promptLocale() {
  const { useLocale } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useLocale',
      message: 'Use Traditional Chinese (繁體中文) locale?',
      default: false
    }
  ]);

  return useLocale ? 'zh-tw' : null;
}

/**
 * Prompt for AI tool integrations
 * @param {Object} detected - Detected AI tools
 * @returns {Promise<string[]>} Selected integrations
 */
export async function promptIntegrations(detected) {
  const choices = [];

  // Existing tools (checked if detected)
  choices.push({
    name: 'Cursor (.cursorrules)',
    value: 'cursor',
    checked: detected.cursor || false
  });
  choices.push({
    name: 'Windsurf (.windsurfrules)',
    value: 'windsurf',
    checked: detected.windsurf || false
  });
  choices.push({
    name: 'Cline (.clinerules)',
    value: 'cline',
    checked: detected.cline || false
  });
  choices.push({
    name: 'GitHub Copilot (.github/copilot-instructions.md)',
    value: 'copilot',
    checked: detected.copilot || false
  });

  const { integrations } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'integrations',
      message: 'Select AI tool integrations:',
      choices
    }
  ]);

  return integrations;
}

/**
 * Prompt for confirmation
 * @param {string} message - Confirmation message
 * @returns {Promise<boolean>} True if confirmed
 */
export async function promptConfirm(message) {
  const { confirmed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmed',
      message,
      default: true
    }
  ]);

  return confirmed;
}
