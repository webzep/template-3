import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Card, Column, Padding, Typography } from '@repo/ui';
import { FC, useEffect, useState } from 'react';

import { LoaderAnimation } from '@/components/FullScreenLoader/LoaderAnimation';
import { appNameTitleCase } from '@/core/configs/constants';
import { useSelector } from '@/core/store/hooks';

const LoaderContainer = styled.div`
	${({ theme }) => css`
		align-items: center;
		background-color: ${theme.palette.bg2};
		color: ${theme.palette.font1};
		display: flex;
		height: 100vh;
		justify-content: center;
		left: 0;
		position: fixed;
		text-align: center;
		top: 0;
		width: 100vw;
		z-index: ${theme.zIndex.navbar + 1};
	`}
`;

type FullScreenLoaderProps = {
	minTime?: number;
};

export const FullScreenLoader: FC<FullScreenLoaderProps> = ({
	minTime = 200,
}) => {
	const { isAuthenticating } = useSelector((state) => state.authentication);
	const [showLoader, setShowLoader] = useState(true);

	useEffect(() => {
		if (isAuthenticating) {
			setShowLoader(true);
		} else {
			setTimeout(() => {
				setShowLoader(false);
			}, minTime);
		}
	}, [isAuthenticating]);

	return (
		showLoader && (
			<LoaderContainer>
				<Column align="center">
					<Padding multiplier={8}>
						<Typography variant="h1">{appNameTitleCase}</Typography>
						<Card bgColor="bg2">
							<LoaderAnimation />
						</Card>
					</Padding>
				</Column>
			</LoaderContainer>
		)
	);
};
