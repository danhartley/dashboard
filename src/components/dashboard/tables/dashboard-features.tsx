import { useState } from 'react';
import { PledgesRow } from './rows/pledges';

export const Row = ({feature}): JSX.Element => {

    const _colSpan = 3;

    const [selectedFeature, setSelectedFeature] = useState('');

    const handleClick = e => {
        const id = e.target.getAttribute('data-table-id');
        id !== selectedFeature
            ? setSelectedFeature(id)
            : setSelectedFeature('');
    };

    return (
        <>
            <tr>
                <td className="py-1"><button data-table-id={feature.name.toLowerCase()} onClick={handleClick}>{feature.name}</button></td>
                <td className="text-center">{feature.honoured}</td>
                <td className="text-center">{feature.broken}</td>
            </tr>
            { feature.name.toLowerCase() === selectedFeature
                ? <PledgesRow key={feature.name} pledges={feature.pledges} colSpan={_colSpan} source={feature.name}></PledgesRow>
                : null
            }
        </>
    );
}

export const DashboardFeaturesTable = ({data}) => {

    const totals = data ? {
        honoured: data.reduce((total, next) => total + next.honoured, 0),
        broken: data.reduce((total, next) => total + next.broken, 0)
    } : null

    return (!data ? <div>No data!</div> : 
        
        <table data-table-id="features" className="w-4/5 text-xs sm:text-base">
            <thead>
                <tr>
                    <th></th>
                    <th colSpan={2}>Pledges</th>
                </tr>
                <tr>
                    <th className="text-left w-3/5">Feature</th>
                    <th className="w-1/5">Honoured</th>
                    <th className="w-1/5">Broken</th>
                </tr>
            </thead>
            <tbody>
                { data.map(feature => {
                    return(
                        <Row key={feature.name} feature={feature}></Row>
                    )
                }) }
            </tbody>
            <tfoot>
                <tr>
                    <th className="text-left pt-2" scope="row">Totals</th>
                    <th>{totals.honoured}</th>
                    <th>{totals.broken}</th>
                </tr>
            </tfoot>
        </table>
    );
};

export default DashboardFeaturesTable;