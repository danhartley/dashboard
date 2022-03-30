const PledgeRow = ({pledge, colSpan}): JSX.Element => {

    const isTrue = state => {

        let classes = 'text-xs text-center w-1/5';

        classes += state   
            ? ' after:content-["✓"]'
            : '';

        return classes;
    }

    const nameClasses = `${colSpan === 3 ? "w-3/5" : "w-2/5"} text-xs py-1`;

    return (      
        <>
        <tr>                    
            <td className={nameClasses}>{pledge.name}</td>
            <td className={isTrue(pledge.honoured > 0)}></td>
            <td className={isTrue(pledge.broken > 0)}></td>
            { 
                colSpan === 4
                    ? <td className="text-xs text-center w-1/5"></td>
                    : null
            }
            
        </tr>        
        </>
    )
};

type IPledgesRow = {
    source: string,
    colSpan: number,
    pledges: [
        {
            name: string;
            honoured: number;
            broken: number;
        }
    ]
}

export const PledgesRow = ({pledges, colSpan, source}: IPledgesRow):JSX.Element => {
    return (
        <>
        <tr>
            <td colSpan={colSpan}>
                <table data-table-id={source.toLowerCase() + '-pledges'} className="w-full table-fixed">
                    <tbody>
                        {
                            pledges.map(pledge => {
                                return <PledgeRow key={pledge.name} pledge={pledge} colSpan={colSpan}></PledgeRow>
                            })
                        }
                    </tbody>
                </table>
            </td>
        </tr>
        </>
    )
};