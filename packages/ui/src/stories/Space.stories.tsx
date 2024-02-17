import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Meta, StoryFn } from '@storybook/react';

import { Card } from '../components/Card';
import { Space } from '../components/Space';
import { WithTheme } from './WithTheme';

const StyledDiv = styled(Card)`
	${({ theme }) => css`
		background-color: ${theme.palette.brand1};
		color: ${theme.palette.onBrand1};
		display: flex;
		height: 100px;
		margin: 8px;
		width: 100px;
	`};
`;

const Component = Space;
type ComponentType = typeof Component;

export default {
	component: Component,
	title: 'Space',
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = ({ ...args }) => (
	<WithTheme>
		<StyledDiv>Test Card</StyledDiv>
		<Component {...args}></Component>
		<StyledDiv>Test Card</StyledDiv>
	</WithTheme>
);

export const Default = Template.bind({});
Default.args = {
	size: '12px',
	vertical: true,
};
