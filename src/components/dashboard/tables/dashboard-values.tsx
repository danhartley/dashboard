import { useState } from 'react';

import { PledgesRow } from './rows/pledges';

const Row = ({value}): JSX.Element => {

    const _colSpan = 4;

    const [selectedValue, setSelectedValue] = useState('');

    const handleClick = e => {
        const id = e.target.getAttribute('data-table-id');
        id !== selectedValue
            ? setSelectedValue(id)
            : setSelectedValue('');
    };

    return (
        <>
            <tr>
                <td className="py-1"><button data-table-id={value.name.toLowerCase()} onClick={handleClick}>{value.name}</button></td>
                <td className="text-center">{value.honoured}</td>
                <td className="text-center">{value.broken}</td>
                <td className="text-center">{value.features}</td>
            </tr>

            { value.name.toLowerCase() === selectedValue
                ? <PledgesRow key={value.name} pledges={value.pledges} colSpan={_colSpan} source={value.name}></PledgesRow>
                : null
            }
        </>
    );
};

const DashboardValuesTable = ({data}): JSX.Element => {

    const totals = data ? {
        honoured: data.reduce((total, next) => total + next.honoured, 0),
        broken: data.reduce((total, next) => total + next.broken, 0),
        features: new Set(data.map(i => i.features)).size        
    } : null;

    return (!data ? null :

        <>
        <table data-table-id="values" className="w-4/5 text-xs sm:text-base">
            <thead>
                <tr>                
                    <th colSpan={1}></th>
                    <th colSpan={2}>Pledges</th>
                    <th colSpan={2}>Project</th>
                </tr>
                <tr>
                    <th className="w-2/5 text-left">Value</th>
                    <th className="w-1/5">Honoured</th>
                    <th className="w-1/5">Broken</th>
                    <th className="w-1/5">Features</th>
                </tr>
            </thead>
            <tbody>                
                { data.map(value => {
                    return (
                        <Row key={value.name} value={value}></Row>
                    )
                }) }
            </tbody>
            <tfoot>
                <tr>
                    <th className="text-left pt-2" scope="row">Totals</th>
                    <th>{totals.honoured}</th>
                    <th>{totals.broken}</th>
                    <th>{totals.features}</th>
                </tr>
            </tfoot>
        </table>
        </>
    );
};

export default DashboardValuesTable;
