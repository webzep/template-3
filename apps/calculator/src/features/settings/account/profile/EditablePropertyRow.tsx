import { Button, Column, Row, Typography, useTheme } from '@repo/ui';
import { ChangeEvent, FC, Fragment, useState } from 'react';

import { ActionDialog } from '@/components/ActionDialog/ActionDialog';
import { LabelledInput } from '@/components/LabelledField/LabelledField';

type PropertyRowProps = {
	descriptionOverride?: string;
	existingValue: string;
	inputValue: string;
	label: string;
	onCancel: () => void;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: () => void;
};

export const EditablePropertyRow: FC<PropertyRowProps> = ({
	descriptionOverride,
	existingValue,
	inputValue,
	label,
	onCancel,
	onChange,
	onSubmit,
}) => {
	const theme = useTheme();
	const [isEditing, setIsEditing] = useState(false);
	const [hasTriedTitleCase, setHasTriedTitleCase] = useState(false);

	const handleCancelClicked = () => {
		setIsEditing(false);
		setHasTriedTitleCase(false);
		onCancel();
	};

	const handleSaveClicked = () => {
		setIsEditing(false);
		onSubmit();
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!hasTriedTitleCase && e.target.value.length === 1) {
			e.target.value = e.target.value.toUpperCase();
			setHasTriedTitleCase(true);
		}
		onChange(e);
	};

	return (
		<Fragment>
			<Row align="center" justify="space-between">
				<Column align="flex-start">
					<Typography variant="overline" margin="0">
						{label}
					</Typography>
					<Typography variant="subtitle">
						{existingValue || 'Not provided'}
					</Typography>
				</Column>
				<Button
					onClick={() => setIsEditing(true)}
					color={theme.palette.darkAccent}
				>
					Edit
				</Button>
			</Row>

			<ActionDialog
				actions={[
					{
						label: 'Cancel',
						onClick: handleCancelClicked,
						variant: 'text',
					},
					{ label: 'Save', onClick: handleSaveClicked },
				]}
				description={
					descriptionOverride ??
					`Enter a new ${label.toLowerCase()} for your profile.`
				}
				open={isEditing}
				onClose={handleCancelClicked}
				size="sm"
				title={`Edit your ${label.toLowerCase()}`}
			>
				<LabelledInput
					fullWidth
					label={label}
					onChange={handleOnChange}
					value={inputValue}
				/>
			</ActionDialog>
		</Fragment>
	);
};
