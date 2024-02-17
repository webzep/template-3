import { Meta, StoryFn } from '@storybook/react';

import { TextField } from '../components/TextField';
import { WithTheme } from './WithTheme';

const Component = TextField;
type ComponentType = typeof Component;

export default {
	component: Component,
	title: 'TextField',
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = ({ ...args }) => (
	<WithTheme>
		<Component {...args} />
	</WithTheme>
);

export const WithoutValue = Template.bind({});
WithoutValue.args = {
	endIcon: 'KG',
	inputProps: { type: 'number' },
	label: 'Weight',
	variant: 'filled',
};

export const WithValue = Template.bind({});
WithValue.args = {
	endIcon: 'KG',
	inputProps: { type: 'number' },
	label: 'Weight',
	value: 34,
	variant: 'filled',
};
