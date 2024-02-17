export const camelCase = (str: string) =>
	str
		.trim()
		.split(' ')
		.map((word, index) =>
			index === 0
				? word.toLowerCase()
				: word.charAt(0).toUpperCase() + word.slice(1)
		)
		.join('');

export const kebabCase = (str: string) =>
	str
		.trim()
		.split(' ')
		.map((word) => word.toLowerCase())
		.join('-');

export const snakeCase = (str: string) =>
	str
		.trim()
		.split(' ')
		.map((word) => word.toLowerCase())
		.join('_');

export const titleCase = (str: string) =>
	str
		.trim()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
