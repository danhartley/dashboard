import { render, screen } from '@testing-library/react';

import { Row} from './dashboard-features';

const Wrapper = ({ children }) => {
    return (
      <table>
        <tbody>{children}</tbody>
      </table>
    );
};

describe("Row", () => {

    const featurePledges = {
        name: 'Human agency and oversight',
        honoured: 1,
        broken: 0,
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

    test('Component returns features', () => {
        render(<Wrapper><Row featurePledges={featurePledges}></Row></Wrapper>);
        expect(screen.getByText('Human agency and oversight')).toBeTruthy();
    });
});