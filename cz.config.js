// See example: https://github.com/leoforfree/cz-customizable/blob/HEAD/cz-config-EXAMPLE.js
module.exports = {
	allowBreakingChanges: ['feat', 'fix'],
	allowCustomScopes: false,
	allowTicketNumber: false,
	isTicketNumberRequired: false,
	messages: {
		confirmCommit: 'Commit?',
		subject: 'Write a short description of the change:\n',
		type: "Select the type of change that you're committing:",
	},
	scopes: [
		{ name: 'accounts' },
		{ name: 'calculator' },
		{ name: 'api' },
		{ name: 'bouncer' },
		{ name: 'global' },
		{ name: 'ui' },
		{ name: 'common' },
	],
	skipQuestions: ['customScope', 'body', 'breaking', 'footer'],
	subjectLimit: 100,
	subjectSeparator: ': ',
	ticketNumberPrefix: 'GO-',
	ticketNumberRegExp: '\\d{1,5}',
	types: [
		{
			name: 'feat:     🌟 A new feature',
			value: '🌟 feat',
		},
		{
			name: 'fix:      🐞 A bug fix',
			value: '🐞 fix',
		},
		{
			name: 'docs:     📚 Documentation only changes',
			value: '📚 docs',
		},
		{
			name: 'style:    💅 Changes that do not affect the meaning of the code (eg. formatting)',
			value: '💅 style',
		},
		{
			name: 'refactor: 🎨 A code change that neither fixes a bug nor adds a feature',
			value: '🎨 refactor',
		},
		{
			name: 'perf:     🏎️  A code change that improves performance',
			value: '🏎️ perf',
		},
		{
			name: 'test:     🧪 Adding missing tests or correcting existing tests',
			value: '🧪 test',
		},
		{
			name: 'build:    🛠️  Changes that affect the build system or external dependencies',
			value: '🛠️ build',
		},
		{
			name: 'ci:       🚀 Changes to our CI configuration files and scripts',
			value: '🚀 ci',
		},
		{
			name: "chore:    🔩 Other changes that don't modify src or test files",
			value: '🔩 chore',
		},
		{
			name: 'revert:   ⏮️  Reverts a previous commit',
			value: '⏮️ revert',
		},
	],
	usePreparedCommit: false,
};
