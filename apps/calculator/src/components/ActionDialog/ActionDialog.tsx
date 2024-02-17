import styled from '@emotion/styled';
import {
	Breakpoint,
	Button,
	ButtonProps,
	Card,
	Column,
	Container,
	Dialog,
	DialogProps,
	MaterialIcon,
	Padding,
	Row,
	Space,
	Typography,
	useTheme,
} from '@repo/ui';
import { forwardRef, Fragment } from 'react';

const ActionsContainer = styled(Padding)`
	background-color: ${({ theme }) => theme.palette.bg3};
	width: 100%;
`;

const CloseButton = styled(Button)`
	position: absolute;
	right: 4px;
	top: 4px;
`;

const Scrollable = styled.div`
	height: 100%;
	overflow-y: auto;
`;

type ActionDialogProps = DialogProps & {
	actions: {
		label: string;
		onClick: () => void;
		variant?: ButtonProps['variant'];
	}[];
	description?: string;
	size?: Breakpoint;
	title?: string;
};

export const ActionDialog = forwardRef<HTMLDivElement, ActionDialogProps>(
	function ActionDialog(
		{ actions, children, description, size, title, ...props },
		ref
	) {
		const theme = useTheme();

		return (
			<Dialog ref={ref} {...props}>
				<Container fixedWidth={theme.breakpoints[size ?? 'md']}>
					<Card borderRadius="medium" maxHeight="500px" padding="0">
						<Scrollable>
							<Padding multiplier={4}>
								<Column align="center" justify="center">
									<Typography
										margin="0px 36px 0.35em"
										variant="h6"
									>
										{title}
									</Typography>
									<Typography
										fontColor="font3"
										variant="body"
									>
										{description}
									</Typography>
								</Column>
								<Space size="16px" vertical />
								{children}
							</Padding>
							<Space size="24px" vertical />
						</Scrollable>
						<Row justify="flex-end">
							<CloseButton iconOnly onClick={props.onClose}>
								<MaterialIcon icon="close" />
							</CloseButton>
						</Row>
						<ActionsContainer multiplier={4}>
							<Row justify="flex-end">
								{actions.map(({ label, onClick, variant }) => (
									<Fragment key={label}>
										<Space size="12px" />
										<Button
											onClick={onClick}
											variant={variant}
										>
											{label}
										</Button>
									</Fragment>
								))}
							</Row>
						</ActionsContainer>
					</Card>
				</Container>
			</Dialog>
		);
	}
);
