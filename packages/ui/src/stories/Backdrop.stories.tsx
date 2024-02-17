import { Meta, StoryFn } from '@storybook/react';

import { Backdrop } from '../components/Backdrop';
import { WithTheme } from './WithTheme';

const Component = Backdrop;
type ComponentType = typeof Component;

export default {
	component: Component,
	title: 'Backdrop',
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = ({ ...args }) => (
	<WithTheme>
		<Component {...args} />
	</WithTheme>
);

export const Default = Template.bind({});
Default.args = {};
