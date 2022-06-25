import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const ButtonLink: React.FC<ButtonProps<typeof Link>> = (props) => {
    return <Button component={Link} {...props} />;
};
