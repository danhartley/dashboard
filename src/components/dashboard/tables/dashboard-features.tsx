import { useEffect, useState } from 'react';
import { useFeature } from './useFeature';
import { PledgesRow } from './rows/pledges';
import { IFeature, IPledge } from 'src/components/dashboard/interfaces';

import DashboardControls from 'src/components/dashboard/dashboard-controls';

type FeaturePledges = {
    name: string,
    honoured: number,
    broken: number,
    pledges: IPledge[]
}

export const Row = ({featurePledges}:{featurePledges:FeaturePledges}) => {

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
                <td className="py-1"><button data-table-id={featurePledges.name.toLowerCase()} onClick={handleClick}>{featurePledges.name}</button></td>
                <td className="text-center">{featurePledges.honoured}</td>
                <td className="text-center">{featurePledges.broken}</td>
            </tr>
            { featurePledges.name.toLowerCase() === selectedFeature
                ? <PledgesRow key={featurePledges.name} pledges={featurePledges.pledges} colSpan={_colSpan} source={featurePledges.name}></PledgesRow>
                : null
            }
        </>
    );
};

export const DashboardFeaturesTable = () => {

    const source = process.env.REACT_APP_SERVER || 'Test';

    const [features, setFeatures] = useState<IFeature | null>(null);
    const [activeSnapShot, setActiveSnapShot] = useState(null);
    const [totals, setTotals] = useState({honoured: 0, broken: 0});
    const { status, data, isLoading, isError, isSuccess, isIdle, error, isFetching, isStale, isLoadingError } = useFeature({source:source, snapShot: activeSnapShot});

    const fetchFeatures = async () => {
        
        setFeatures(data);

        console.log('source', source)
        console.log('activeSnapShot', activeSnapShot)
        console.log('status', status)

        console.log('received data', data)
        console.log('isLoading',isLoading)
        console.log('isError',isError)
        console.log('isSuccess',isSuccess)
        console.log('isIdle',isIdle)
        console.log('error',error)

        console.log('isFetching',isFetching)
        console.log('isStale',isStale)
        console.log('status',status)
        console.log('isLoadingError', isLoadingError);

        if(!data || data === undefined) return;

        const totals = {
            honoured: data.items.reduce((total, next) => total + next.honoured, 0),
            broken: data.items.reduce((total, next) => total + next.broken, 0)
        };

        setTotals(totals);
    };

    useEffect(() => {
        fetchFeatures();       
    }, [activeSnapShot]);
    

    if (isLoading) {
        return <span>Loading...</span>
      }
    
    if (isError) {
    return <span>Error: {error}</span>
    }

    return (
        
        

        !features ? <div>No data!</div> :    

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
                            <Row key={feature.name} featurePledges={feature}></Row>
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