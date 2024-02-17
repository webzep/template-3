import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from '@repo/ui';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type TabButtonProps = {
	active: boolean;
};

const TabButton = styled(Button)<TabButtonProps>`
	${({ active, theme }) => {
		const darkMode = theme.palette.mode === 'dark';
		const bgColor = darkMode ? theme.palette.bg1 : theme.palette.bg3;
		const fontColor = theme.palette.font2;

		return css`
			background-color: ${active ? bgColor : ''};
			color: ${active ? fontColor : ''};
			height: 32px;
			margin-bottom: 4px;
		`;
	}}
`;

type SettingsTabItemProps = {
	route: string;
	label: string;
};

export const SettingsTabItem: FC<SettingsTabItemProps> = ({ route, label }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const [active, setActive] = useState(false);

	useEffect(() => {
		if (location.pathname === route) {
			setActive(true);
		} else {
			setActive(false);
		}
	}, [location]);

	const handleButtonClicked = () => navigate(route);

	return (
		<TabButton
			active={active}
			justify="flex-start"
			onClick={handleButtonClicked}
			variant="text"
		>
			{label}
		</TabButton>
	);
};
