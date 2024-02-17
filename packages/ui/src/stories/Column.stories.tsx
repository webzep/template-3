import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Meta, StoryFn } from '@storybook/react';

import { Card } from '../components/Card';
import { Column } from '../components/Column';
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

const Component = Column;
type ComponentType = typeof Component;

export default {
	component: Component,
	title: 'Column',
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = ({ ...args }) => (
	<WithTheme>
		<Component {...args}>
			<StyledDiv>Test Card</StyledDiv>
			<StyledDiv>With some content</StyledDiv>
		</Component>
	</WithTheme>
);

export const Default = Template.bind({});
