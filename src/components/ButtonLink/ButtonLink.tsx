import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonLinkProps extends ButtonProps<typeof Link> {}

export const ButtonLink: React.FC<ButtonLinkProps> = (props) => {
    return <Button component={Link} {...props} />
}