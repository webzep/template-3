import { resolve } from 'node:path';

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * typescript packages.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
	extends: [
		'@vercel/style-guide/eslint/node',
		'@vercel/style-guide/eslint/typescript',
	].map(require.resolve),
	globals: {
		JSX: true,
		React: true,
	},
	ignorePatterns: ['node_modules/', 'dist/'],
	parserOptions: {
		project,
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
