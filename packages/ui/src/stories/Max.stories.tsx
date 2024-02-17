import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Meta, StoryFn } from '@storybook/react';

import { Card } from '../components/Card';
import { Max } from '../components/Max';
import { WithTheme } from './WithTheme';

const StyledDiv = styled(Card)`
	${({ theme }) => css`
		background-color: ${theme.palette.brand1};
		color: ${theme.palette.onBrand1};
		display: flex;
		height: 100px;
		margin: 8px;
		width: 100%;
	`};
`;

const Component = Max;
type ComponentType = typeof Component;

export default {
	component: Component,
	title: 'Max',
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = ({ ...args }) => (
	<WithTheme>
		<Component {...args}>
			<StyledDiv>Test Card</StyledDiv>
		</Component>
	</WithTheme>
);

export const Default = Template.bind({});
Default.args = {
	height: '50px',
	width: '100px',
};
