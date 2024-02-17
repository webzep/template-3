import { Meta, StoryFn } from '@storybook/react';

import { MenuItem } from '../components/MenuItem';
import { WithTheme } from './WithTheme';

const Component = MenuItem;
type ComponentType = typeof Component;

export default {
	component: Component,
	title: 'MenuItem',
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = ({ ...args }) => (
	<WithTheme>
		<Component {...args}>Test Item</Component>
	</WithTheme>
);

export const Default = Template.bind({});
Default.args = {};
