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
		'plugin:storybook/recommended',
		'plugin:mdx/recommended',
		...[
			'@vercel/style-guide/eslint/node',
			'@vercel/style-guide/eslint/typescript',
			'@vercel/style-guide/eslint/browser',
			'@vercel/style-guide/eslint/react',
		].map(require.resolve),
	],
	globals: {
		JSX: true,
		React: true,
	},
	ignorePatterns: ['node_modules/', 'dist/'],
	parserOptions: {
		project,
	},
	plugins: ['only-warn'],
	rules: {
		'import/no-default-export': 'off',
	},
	settings: {
		'import/resolver': {
			typescript: {
				project,
			},
		},
	},
};
