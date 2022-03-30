import { render, screen } from '@testing-library/react';

import { PledgesRow } from './pledges';
import { PledgesRowProps } from 'src/components/dashboard/types';

describe('PledgesRow', () => {

    const Wrapper = ({ children }) => {
        return (
          <table>
            <tbody>{children}</tbody>
          </table>
        );
    };

    const props:PledgesRowProps = {
        source: "Human agency and oversight",
        colSpan: 3,
        pledges: [
            {
                "name": "Key pledge",
                "honoured": 1,
                "broken": 0
            },
            {
                "name": "Minor pledge",
                "honoured": 0,
                "broken": 1
            },
        ]
    };

    test('Component returns pledges', () => {
        render(<Wrapper><PledgesRow pledges={props.pledges} colSpan={props.colSpan} source={props.source}></PledgesRow></Wrapper>);
        expect(screen.getByText('Key pledge')).toBeTruthy();
        expect(screen.getByText('Minor pledge')).toBeTruthy();
    });
    test('When colSpan is 3 there are 7 table cells', () => {
        render(<Wrapper><PledgesRow pledges={props.pledges} colSpan={props.colSpan} source={props.source}></PledgesRow></Wrapper>);
        expect(screen.getAllByRole('cell').length).toBe(1+3+3);
    });
    test('When colSpan is 4 there are 9 table cells', () => {
        props.colSpan = 4;
        render(<Wrapper><PledgesRow pledges={props.pledges} colSpan={props.colSpan} source={props.source}></PledgesRow></Wrapper>);
        expect(screen.getAllByRole('cell').length).toBe(1+4+4);
    });
});