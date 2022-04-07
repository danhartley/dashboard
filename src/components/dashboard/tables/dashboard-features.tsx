import { useEffect, useState } from 'react';
import { useFeatures } from './useFeatures';
import { PledgesRow } from './rows/pledges';
import { IPledgesByFeatureSnapshot, IPledge } from 'src/components/dashboard/interfaces';
import DashboardControls from 'src/components/dashboard/dashboard-controls';

const Header = () => {
    return (
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
    )
};

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

const Footer = ({totals}) => {
    return (
        <tfoot>
            <tr>
                <th className="text-left pt-2" scope="row">Totals</th>
                <th>{totals.honoured}</th>
                <th>{totals.broken}</th>
            </tr>
        </tfoot>
    )
};

export const DashboardFeaturesTable = () => {

    type Error = {
        message?: string
    }

    const [source, setSource] = useState<string>(process.env.REACT_APP_SERVER);
    const [snapshotId, setSnapshotId] = useState(1);
    const [totals, setTotals] = useState({honoured: 0, broken: 0});
    const { data, isLoading, isError, error, isSuccess } = useFeatures({source:source, snapshotId: snapshotId});

    const fetchFeatures = async () => {

        if(!data) return;

        const totals = {
            honoured: data.items.reduce((total, next) => total + next.honoured, 0),
            broken: data.items.reduce((total, next) => total + next.broken, 0)
        };        
        setTotals(totals);
    };

    useEffect(() => {
        fetchFeatures();
    }, [data]);

    if(isLoading) {
        return <span>Loading...</span>
    }

    if(isError) {
        return <span>Error: { error.message }</span>
    }
    
    if(isSuccess) {        
        return (            
            <figure className="w-full border-solid border-slate-300 border p-3 my-2">
                <figcaption className="mb-4"><em>{data.source} Pledges By Feature</em></figcaption>
                <table data-table-id="features" className="w-4/5 text-xs sm:text-base">
                    <Header />
                    <tbody>
                        { data.items.map(feature => {
                            return(
                                <Row key={feature.name} featurePledges={feature}></Row>
                            )
                        }) }
                    </tbody>
                    <Footer totals={totals} />
                </table>
                <DashboardControls snapshotId={data.id} snapshots={data.snapshots} onChange={setSnapshotId}></DashboardControls>
            </figure>
        );
    }
};

export default DashboardFeaturesTable;