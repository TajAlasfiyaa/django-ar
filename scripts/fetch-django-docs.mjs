// Fetches the official Django docs that the lessons are written against into .reference/django/docs.
// Only the docs/ folder is checked out, so the download stays small. Run again to update.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

// Bump this together with `lesson.django` and verify/requirements.txt (see CURRICULUM.md).
const BRANCH = 'stable/6.1.x';
const DEST = '.reference/django';

const git = (...args) => execFileSync('git', ['-c', 'core.longpaths=true', ...args], { stdio: 'inherit' });

if (existsSync(DEST)) {
	git('-C', DEST, 'fetch', '--depth', '1', 'origin', BRANCH);
	git('-C', DEST, 'checkout', '-B', BRANCH, 'FETCH_HEAD');
} else {
	git('clone', '--depth', '1', '--branch', BRANCH, '--filter=blob:none', '--sparse', 'https://github.com/django/django.git', DEST);
	git('-C', DEST, 'config', 'core.longpaths', 'true');
	git('-C', DEST, 'sparse-checkout', 'set', 'docs');
}

console.log(`\nDjango docs (${BRANCH}) are in ${DEST}/docs`);
