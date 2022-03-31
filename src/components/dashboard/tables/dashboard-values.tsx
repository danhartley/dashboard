import {
    useMutation
} from 'react-query';
import { useEffect, useState } from 'react';
import { IValue } from 'src/components/dashboard/interfaces';
import { PledgesRow } from './rows/pledges';

import DashboardControls from 'src/components/dashboard/dashboard-controls';

import api from 'src/api/api';

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

const DashboardValuesTable = (): JSX.Element => {

    const { mutateAsync } = useMutation(api.getPledgesByValues);

    const [values, setValues] = useState<IValue | null>(null);
    const [activeSnapShot, setActiveSnapShot] = useState('');
    const [totals, setTotals] = useState({honoured: 0, broken: 0, features: 0});

    const fetchValues = async () => {
        
        const data = await mutateAsync({source:process.env.REACT_APP_SERVER});

        setValues(data);

        const totals = data ? {
            honoured: data.items.reduce((total, next) => total + next.honoured, 0),
            broken: data.items.reduce((total, next) => total + next.broken, 0),
            features: data.items.reduce((total, next) => total + next.features, 0),
        } : null;

        setTotals(totals);
    };

    useEffect(() => {
        fetchValues();       
    }, []);

    return (!values ? null :

        <figure className="w-full border-solid border-slate-300 border p-3 my-2">
            <figcaption className="mb-4"><em>{values.source} Pledges By Values</em></figcaption>
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
                    { values.items.map(value => {
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
        </figure>
    );
};

export default DashboardValuesTable;
