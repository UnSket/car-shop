import React, { useState } from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Skeleton,
} from '@mui/material';
import styles from './Filter.module.scss';
import { useQuery } from 'react-query';
import { getColorQuery } from '../../queries/colors';
import { getManufacturesQuery } from '../../queries/manufactures';

interface SelectInputProps {
    currentItem: string;
    items: string[];
    onSelect: (item: string) => void;
    label: string;
    className?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
    onSelect,
    items,
    currentItem,
    label,
    className,
}) => {
    const onChange = React.useCallback(
        (event: SelectChangeEvent<string>) => {
            onSelect(event.target.value as string);
        },
        [onSelect]
    );

    const id = `${label}-select`;

    return (
        <div className={className}>
            <FormControl fullWidth>
                <InputLabel id={id}>{label}</InputLabel>
                <Select
                    value={currentItem}
                    label={label}
                    onChange={onChange}
                    color="secondary"
                    labelId={id}
                    id={id}
                    data-testid={`filter-select-${label}`}
                >
                    <MenuItem value={''}>Any</MenuItem>
                    {items.map((item) => (
                        <MenuItem
                            value={item}
                            key={item}
                            data-testid={`filter-select-${label}-item-${item}`}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export interface CarsFilter {
    color: string;
    manufacture: string;
}

interface FilterProps {
    onFilterSubmit: (filter: CarsFilter) => void;
    currentFilter: CarsFilter;
}

export const Filter: React.FC<FilterProps> = ({
    onFilterSubmit,
    currentFilter,
}) => {
    const [color, setColor] = useState(currentFilter.color);
    const [manufacture, setManufacture] = useState(currentFilter.manufacture);

    const { data: colors = [], isLoading: isColorsLoading } = useQuery(
        getColorQuery({})
    );
    const { data: manufactures = [], isLoading: isManufacturesLoading } =
        useQuery(getManufacturesQuery({}));

    const manufactureNames = React.useMemo(
        () => manufactures.map(({ name }) => name),
        [manufactures]
    );

    const onSubmit = React.useCallback(() => {
        onFilterSubmit({ color, manufacture });
    }, [onFilterSubmit, color, manufacture]);

    const isSubmitDisabled =
        currentFilter.manufacture === manufacture &&
        currentFilter.color === color;

    if (isColorsLoading || isManufacturesLoading) {
        return (
            <Card variant="outlined">
                <CardContent className={styles.content}>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card variant="outlined">
            <CardContent className={styles.content}>
                <SelectInput
                    onSelect={setColor}
                    currentItem={color}
                    items={colors}
                    label="Color"
                />
                <SelectInput
                    onSelect={setManufacture}
                    currentItem={manufacture}
                    items={manufactureNames}
                    label="Manufacturer"
                    className={styles.manufactureSelect}
                />
            </CardContent>
            <CardActions className={styles.actions}>
                <Button
                    variant="contained"
                    disabled={isSubmitDisabled}
                    onClick={onSubmit}
                    data-testid={`filter-submit-button`}
                >
                    Filter
                </Button>
            </CardActions>
        </Card>
    );
};
