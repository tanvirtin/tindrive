import React from 'react';
import {
    Breadcrumbs,
    Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import { PathBreadcrumbsProps } from './PathBreadcrumbs.d';

export const useStyles = makeStyles(() => ({ button: { textTransform: 'none' } }));

const PathBreadcrumbs: React.FC<PathBreadcrumbsProps> = ({
    path,
    style,
    className,
    'data-testid': dataTestid,
}) => {
    const onClick = (pathArr: string[], index: number): void => {
        let path = '';
        for (let i = 0; i < index + 1; ++i) {
            path += `${pathArr[i]}/`;
        }
        // Calling Router with these options should invoke the file called ../../../pages/[path].tsx
        Router.push({
            pathname: '/',
            query: { path },
        });
    };
    const classes = useStyles();
    const pathArr: string[] = path.split('/');
    return (
        <Breadcrumbs
            className={className}
            data-testid={dataTestid || 'path-breadcrumbs'}
            maxItems={6}
            separator='›'
            style={style}
        >
            {pathArr?.reduce((acc, path, index) => {
                if (path) {
                    acc.push(
                        <Button
                            key={`${path}-${index}`}
                            className={classes.button}
                            data-testid={`path-breadcrumbs-button-${index}`}
                            onClick={(): void => {
                                onClick(pathArr, index);
                            }}
                        >
                            {path === '.' ? 'root' : path}
                        </Button>,
                    );
                }
                return acc;
            }, [])}
        </Breadcrumbs>
    );
};

export default PathBreadcrumbs;
