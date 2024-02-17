import { Meta, StoryFn } from '@storybook/react';

import { Anchor } from '../components/Anchor';
import { WithTheme } from './WithTheme';

const Component = Anchor;
type ComponentType = typeof Component;

export default {
	component: Component,
	title: 'Anchor',
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = ({ ...args }) => (
	<WithTheme>
		<Component {...args}>Test Anchor</Component>
	</WithTheme>
);

export const Default = Template.bind({});
Default.args = {
	to: '/',
};
