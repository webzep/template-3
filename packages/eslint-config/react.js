import { resolve } from 'node:path';

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
	extends: [
		'@vercel/style-guide/eslint/browser',
		'@vercel/style-guide/eslint/typescript',
		'@vercel/style-guide/eslint/react',
	].map(require.resolve),
	globals: {
		JSX: true,
	},
	ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js', '**/*.css'],
	parserOptions: {
		project,
	},
	rules: {
		'import/no-default-export': 'off',
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
			},
			typescript: {
				project,
			},
		},
	},
};
