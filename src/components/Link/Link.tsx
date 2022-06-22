import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import React from 'react';
import { Link as ReactDomLink } from 'react-router-dom';

interface LinkProps extends MuiLinkProps<typeof ReactDomLink> {}

export const Link: React.FC<LinkProps> = (props) => {
    return <MuiLink component={ReactDomLink} {...props} />
}
