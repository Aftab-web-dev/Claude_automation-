const path = require('path');
const { log, box, table } = require('../colors');
const { fileExists, listFiles } = require('../fs-utils');

function listCommand(options = {}) {
  const targetDir = process.cwd();
  const category = options.category;

  box('Claude AI Automation - Agents');

  const promptsDir = path.join(targetDir, '.aiautomations', 'prompts');
  if (!fileExists(promptsDir)) {
    log('   Not initialized. Run "yuva init" first.\n', 'yellow');
    return;
  }

  const devAgentFiles = {
    'requirementsagent.md': 'Requirements',
    'riskassessmentagent.md': 'Risk Assessment',
    'planningprompt.md': 'Planner',
    'execution.md': 'Execution',
    'continuityagent.md': 'Continuity',
    'testeragent.md': 'Tester',
    'revieweragent.md': 'Reviewer',
    'securityagent.md': 'Security',
    'debuggeragent.md': 'Debugger',
    'refactoragent.md': 'Refactor',
    'statemanageragent.md': 'State Manager'
  };

  const lifeAgentFiles = {
    'researchagent.md': 'Research',
    'teachingagent.md': 'Teaching',
    'financeagent.md': 'Finance',
    'businessagent.md': 'Business',
    'doctoragent.md': 'Doctor',
    'lawyeragent.md': 'Lawyer',
    'travelagent.md': 'Travel',
    'interviewagent.md': 'Interview',
    'analyseragent.md': 'Analyst',
    'careeragent.md': 'Career',
    'writeragent.md': 'Writer',
    'wellnessagent.md': 'Wellness',
    'productivityagent.md': 'Productivity',
    'fitnessagent.md': 'Fitness',
    'stressagent.md': 'Stress',
    'sexualagent.md': 'Sexual Health',
    'loveguideragent.md': 'Relationships',
    'resumeagent.md': 'Resume',
    'negotiationagent.md': 'Negotiation',
    'parentingagent.md': 'Parenting',
    'socialmediaagent.md': 'Social Media',
    'studyagent.md': 'Study',
    'emailagent.md': 'Email'
  };

  const allFiles = listFiles(promptsDir, '*.md');

  if (!category || category === 'dev') {
    log('🔧 Development Agents:', 'bright');
    const devRows = [];
    for (const [file, name] of Object.entries(devAgentFiles)) {
      const installed = allFiles.includes(file);
      devRows.push([installed ? '✅' : '❌', name, file]);
    }
    table(['', 'Agent', 'File'], devRows);
    log('');
  }

  if (!category || category === 'life') {
    log('🌟 Life/Personal Agents:', 'bright');
    const lifeRows = [];
    for (const [file, name] of Object.entries(lifeAgentFiles)) {
      const installed = allFiles.includes(file);
      lifeRows.push([installed ? '✅' : '❌', name, file]);
    }
    table(['', 'Agent', 'File'], lifeRows);
    log('');
  }

  // Check for custom agents
  const knownFiles = [...Object.keys(devAgentFiles), ...Object.keys(lifeAgentFiles), 'orchestrator.md'];
  const customAgents = allFiles.filter(f => !knownFiles.includes(f));
  if (customAgents.length > 0) {
    log('🔌 Custom Agents:', 'bright');
    const customRows = customAgents.map(f => ['✅', f.replace('.md', ''), f]);
    table(['', 'Agent', 'File'], customRows);
    log('');
  }

  log(`   Total: ${allFiles.length} agents installed\n`);
}

module.exports = listCommand;
