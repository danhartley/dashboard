import Slider from './dashboard-controls-slider';
import { ControlsProps } from './types';

const DashboardControls = ({snapshots, snapshotId, onChange, namespace}:ControlsProps): JSX.Element => {

    const options = [
        {
            text: 'Table',
            active: true,
            target: 'table'
        },
        {
            text: 'Chart',
            active: false,
            target: 'chart'
        },
        {
            text: 'Download',
            active: false,
            target: 'download'
        },
    ];

    type ChangeEvent = React.KeyboardEvent | React.MouseEvent;

    const handleDisplayOptionChange = (e: ChangeEvent) => {
        const target = (e.target as HTMLButtonElement);
        target.setAttribute('aria-selected', "true");
        target.disabled = true;
    }

    return (
        <section>
            <nav className="flex justify-center">
                <div className="flex flex-row w-4/5 m-4 justify-evenly" role="tablist">
                    {
                        options.map(o => {
                            return <button key={o.text} id={`${o.target}-${namespace}`} role="tab" aria-selected="false" onClick={handleDisplayOptionChange} className="border p-2 border-solid">{o.text}</button>
                        })
                    }
                </div>                     
            </nav>
            <div className="flex justify-center">
                <Slider namespace={namespace} intialState={snapshotId} range={snapshots} onChange={onChange}></Slider>    
            </div>
        </section>
    )

};

export default DashboardControls;