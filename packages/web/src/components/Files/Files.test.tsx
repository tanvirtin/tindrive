import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';
import { ls } from '../../queries';
import Files from '.';

describe(Files, () => {
    beforeAll(() => jest.mock('next/router', () => ({ useRouter: (): {} => ({ query: { path: './' } }) })));

    test('render', async () => {
        const data: {}[] = [
            {
                name: 'file',
                path: './file',
                extension: null,
                isDirectory: false,
                parentDirectory: '.',
                createdDate: '2020-11-05T03:03:46.950Z',
                size: 4096,
                populatedDate: '2020-12-13T18:10:38.000Z',
            },
            {
                name: 'folder',
                path: './folder',
                extension: null,
                isDirectory: true,
                parentDirectory: '.',
                createdDate: '2020-11-05T05:34:51.219Z',
                size: 4096,
                populatedDate: '2020-12-13T18:10:38.000Z',
            },
        ];
        const { queryByText, queryByTestId, getByTestId } = render((
            <MockedProvider
                addTypename={false}
                mocks={[{
                    request: {
                        query: ls,
                        variables: { path: './' },
                    },
                    result: { data: { ls: data } },
                }]}
            >
                <Files />
            </MockedProvider>
        ));
        expect(getByTestId('files-path-breadcrumbs')).toBeInTheDocument();
        expect(getByTestId('files-spinner')).toBeInTheDocument();
        expect(getByTestId('files')).toBeInTheDocument();
        expect(queryByText('An error has occured')).not.toBeInTheDocument();
        await waitFor(() => {
            expect(getByTestId('files-path-breadcrumbs')).toBeInTheDocument();
            expect(queryByTestId('files-spinner')).not.toBeInTheDocument();
            expect(queryByText('An error has occured')).not.toBeInTheDocument();
            for (let index = 0; index < data.length; ++index) {
                expect(getByTestId(`files-file-${index}`)).toBeInTheDocument();
            }
        });
    });

    test('render with error', async () => {
        const { queryByText, queryByTestId, getByTestId } = render((
            <MockedProvider
                addTypename={false}
                mocks={[{
                    request: {
                        query: ls,
                        variables: { path: './' },
                    },
                    result: { errors: [new GraphQLError('error')] },
                }]}
            >
                <Files />
            </MockedProvider>
        ));
        expect(getByTestId('files-path-breadcrumbs')).toBeInTheDocument();
        expect(getByTestId('files-spinner')).toBeInTheDocument();
        expect(getByTestId('files')).toBeInTheDocument();
        expect(queryByText('An error has occured')).not.toBeInTheDocument();
        await waitFor(() => {
            expect(getByTestId('files-path-breadcrumbs')).toBeInTheDocument();
            expect(queryByTestId('files-spinner')).not.toBeInTheDocument();
            expect(queryByText('An error has occured')).toBeInTheDocument();
        });
    });
});
