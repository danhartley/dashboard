import { useEffect, useState } from 'react';
import { useFeatures } from './useFeatures';
import { PledgesRow } from './rows/pledges';
import { IFeature } from 'src/components/dashboard/interfaces';

import DashboardControls from 'src/components/dashboard/dashboard-controls';

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

export const DashboardFeaturesTable = () => {

    const [features, setFeatures] = useState<IFeature | null>(null);
    const [activeSnapShot, setActiveSnapShot] = useState('');
    const [totals, setTotals] = useState({honoured: 0, broken: 0});

    const { mutateAsync } = useFeatures();

    const fetchFeatures = async () => {
        
        const data = await mutateAsync({source:process.env.REACT_APP_SERVER, snapShot: activeSnapShot});

        setFeatures(data);

        const totals = data ? {
            honoured: data.items.reduce((total, next) => total + next.honoured, 0),
            broken: data.items.reduce((total, next) => total + next.broken, 0)
        } : null;

        setTotals(totals);
    };

    useEffect(() => {
        fetchFeatures();       
    }, [activeSnapShot]);

    return (!features ? <div>No data!</div> :    
        <figure className="w-full border-solid border-slate-300 border p-3 my-2">
            <figcaption className="mb-4"><em>{features.source} Pledges By IFeature</em></figcaption>
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
                    { features.items.map(feature => {
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
            <DashboardControls snapShot={features.snapShot} snapShots={features.snapShots} onChange={setActiveSnapShot}></DashboardControls>
        </figure>
    );
};

export default DashboardFeaturesTable;