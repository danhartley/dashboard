import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
        honoured: 2,
        broken: 1,
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
            {
                "name": "Second minor pledge",
                "honoured": 1,
                "broken": 0
            },
        ]
    };

    test('Component returns features', () => {
        const { getByRole, getByText } = render(<Wrapper><Row featurePledges={featurePledges}></Row></Wrapper>);
        expect(screen.getByText('Human agency and oversight')).toBeTruthy();
        const button = getByRole('button', {name: "Human agency and oversight"});
        userEvent.click(button);
        expect(getByText('Key pledge')).toBeInTheDocument();
        const row = screen.getByText('Human agency and oversight').closest("tr");
        expect(within(row).getByText('Human agency and oversight')).toBeTruthy();
        expect(within(row).getByText(1)).toBeTruthy();
        expect(within(row).getByText(2)).toBeTruthy();
    });
});