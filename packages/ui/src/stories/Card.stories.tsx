import { Meta, StoryFn } from '@storybook/react';

import { Card } from '../components/Card';
import { WithTheme } from './WithTheme';

const Component = Card;
type ComponentType = typeof Component;

export default {
	component: Component,
	title: 'Card',
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = ({ ...args }) => (
	<WithTheme>
		<Component {...args}>
			<h3>Test Card</h3>
			<p>With some content</p>
		</Component>
	</WithTheme>
);

export const Default = Template.bind({});
