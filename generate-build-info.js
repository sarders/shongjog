const fs = require('fs');
const { execSync } = require('child_process');

try {
    // Get latest commit hash
    const commitHash = execSync('git rev-parse --short HEAD').toString().trim();

    // Get latest commit date
    const commitDate = execSync('git log -1 --format=%cd --date=short').toString().trim();

    const buildInfo = {
        commitHash,
        commitDate,
        buildTime: new Date().toISOString()
    };

    const content = JSON.stringify(buildInfo, null, 2);

    // Ensure src directory exists
    if (!fs.existsSync('./src')) {
        fs.mkdirSync('./src');
    }

    fs.writeFileSync('./src/build-info.json', content);

    console.log('Build info generated:', buildInfo);
} catch (error) {
    console.error('Error generating build info:', error);
    // Fallback for environments without git (e.g. some CI/CD or copies)
    const fallback = {
        commitHash: 'unknown',
        commitDate: 'unknown',
        buildTime: new Date().toISOString()
    };
    fs.writeFileSync('./src/build-info.json', JSON.stringify(fallback, null, 2));
}
