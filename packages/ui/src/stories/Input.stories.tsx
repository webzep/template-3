import { Meta, StoryFn } from '@storybook/react';

import { Input } from '../components/Input';
import { WithTheme } from './WithTheme';

const Component = Input;
type ComponentType = typeof Component;

export default {
	component: Component,
	title: 'Input',
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = ({ ...args }) => (
	<WithTheme>
		<Component {...args} />
	</WithTheme>
);

export const Default = Template.bind({});
Default.args = {
	placeholder: 'Test Input',
};
