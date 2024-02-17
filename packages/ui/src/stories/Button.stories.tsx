import { Meta, StoryFn } from '@storybook/react';

import { Button } from '../components/Button';
import { WithTheme } from './WithTheme';

const Component = Button;
type ComponentType = typeof Component;

export default {
	component: Component,
	title: 'Button',
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = ({ ...args }) => (
	<WithTheme>
		<Component {...args}>Button</Component>
	</WithTheme>
);

export const Contained = Template.bind({});
Contained.args = {
	variant: 'contained',
};

export const Outlined = Template.bind({});
Outlined.args = {
	variant: 'outlined',
};

export const Text = Template.bind({});
Text.args = {
	variant: 'text',
};
