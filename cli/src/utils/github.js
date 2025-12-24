import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'fs';
import { dirname, join, basename } from 'path';
import { homedir } from 'os';
import https from 'https';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/AsiaOstrich/universal-dev-standards/main';
const SKILLS_RAW_BASE = 'https://raw.githubusercontent.com/AsiaOstrich/universal-dev-skills/main';

/**
 * Download a file from GitHub raw content
 * @param {string} filePath - Path relative to repo root (e.g., 'core/checkin-standards.md')
 * @returns {Promise<string>} File content
 */
export function downloadFromGitHub(filePath) {
  const url = `${GITHUB_RAW_BASE}/${filePath}`;

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Follow redirect
        https.get(res.headers.location, (redirectRes) => {
          if (redirectRes.statusCode !== 200) {
            reject(new Error(`GitHub returned ${redirectRes.statusCode} for ${filePath}`));
            return;
          }

          let data = '';
          redirectRes.on('data', chunk => data += chunk);
          redirectRes.on('end', () => resolve(data));
          redirectRes.on('error', reject);
        }).on('error', reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`GitHub returned ${res.statusCode} for ${filePath}`));
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Download and save a standard file to the target project
 * @param {string} sourcePath - Relative path from repo root (e.g., 'core/checkin-standards.md')
 * @param {string} targetDir - Target directory (usually '.standards')
 * @param {string} projectPath - Project root path
 * @returns {Promise<Object>} Result with success status and copied path
 */
export async function downloadStandard(sourcePath, targetDir, projectPath) {
  const targetFolder = join(projectPath, targetDir);
  const targetFile = join(targetFolder, basename(sourcePath));

  // Ensure target directory exists
  if (!existsSync(targetFolder)) {
    mkdirSync(targetFolder, { recursive: true });
  }

  try {
    const content = await downloadFromGitHub(sourcePath);
    writeFileSync(targetFile, content);
    return {
      success: true,
      error: null,
      path: targetFile
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      path: null
    };
  }
}

/**
 * Download and save an integration file to its target location
 * @param {string} sourcePath - Source path relative to repo root
 * @param {string} targetPath - Target path relative to project root
 * @param {string} projectPath - Project root path
 * @returns {Promise<Object>} Result
 */
export async function downloadIntegration(sourcePath, targetPath, projectPath) {
  const target = join(projectPath, targetPath);

  // Ensure target directory exists
  const targetDir = dirname(target);
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  try {
    const content = await downloadFromGitHub(sourcePath);
    writeFileSync(target, content);
    return {
      success: true,
      error: null,
      path: target
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      path: null
    };
  }
}

/**
 * Download a file from Skills repository
 * @param {string} filePath - Path relative to skills repo root
 * @returns {Promise<string>} File content
 */
export function downloadFromSkillsRepo(filePath) {
  const url = `${SKILLS_RAW_BASE}/${filePath}`;

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, (redirectRes) => {
          if (redirectRes.statusCode !== 200) {
            reject(new Error(`GitHub returned ${redirectRes.statusCode} for ${filePath}`));
            return;
          }

          let data = '';
          redirectRes.on('data', chunk => data += chunk);
          redirectRes.on('end', () => resolve(data));
          redirectRes.on('error', reject);
        }).on('error', reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`GitHub returned ${res.statusCode} for ${filePath}`));
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Get the Skills installation directory
 * @returns {string} Path to ~/.claude/skills/
 */
export function getSkillsDir() {
  return join(homedir(), '.claude', 'skills');
}

/**
 * Download and install a single Skill
 * @param {string} skillName - Skill name (e.g., 'ai-collaboration-standards')
 * @param {string[]} skillFiles - Array of file paths relative to skills repo
 * @returns {Promise<Object>} Result with success status
 */
export async function downloadSkill(skillName, skillFiles) {
  const skillsDir = getSkillsDir();
  const targetDir = join(skillsDir, skillName);

  // Ensure target directory exists
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  const results = [];
  for (const filePath of skillFiles) {
    const fileName = basename(filePath);
    const targetFile = join(targetDir, fileName);

    try {
      const content = await downloadFromSkillsRepo(filePath);
      writeFileSync(targetFile, content);
      results.push({ file: fileName, success: true });
    } catch (error) {
      results.push({ file: fileName, success: false, error: error.message });
    }
  }

  const allSuccess = results.every(r => r.success);
  return {
    success: allSuccess,
    skillName,
    files: results,
    path: targetDir
  };
}

/**
 * Check if Skills are already installed and get version info
 * @returns {Object|null} Installed skills info or null
 */
export function getInstalledSkillsInfo() {
  const skillsDir = getSkillsDir();
  const manifestPath = join(skillsDir, '.manifest.json');

  if (!existsSync(manifestPath)) {
    // Check if any skill directories exist
    if (!existsSync(skillsDir)) {
      return null;
    }

    // Skills exist but no manifest - likely manually installed
    return {
      installed: true,
      version: null,
      source: 'unknown'
    };
  }

  try {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    return {
      installed: true,
      version: manifest.version || null,
      source: manifest.source || 'universal-dev-standards',
      installedDate: manifest.installedDate || null
    };
  } catch {
    return {
      installed: true,
      version: null,
      source: 'unknown'
    };
  }
}

/**
 * Write Skills manifest file
 * @param {string} version - Version of skills installed
 */
export function writeSkillsManifest(version) {
  const skillsDir = getSkillsDir();
  const manifestPath = join(skillsDir, '.manifest.json');

  if (!existsSync(skillsDir)) {
    mkdirSync(skillsDir, { recursive: true });
  }

  const manifest = {
    version,
    source: 'universal-dev-standards',
    installedDate: new Date().toISOString().split('T')[0]
  };

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}
