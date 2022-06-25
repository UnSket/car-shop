import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import React from 'react';
import { Link as ReactDomLink } from 'react-router-dom';

export const Link: React.FC<MuiLinkProps<typeof ReactDomLink>> = (props) => {
    return <MuiLink component={ReactDomLink} {...props} />;
};
