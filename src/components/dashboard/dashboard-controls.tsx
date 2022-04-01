import Slider from './dashboard-controls-slider';
import { ControlsProps } from './types';

const DashboardControls = ({snapShots, snapShot, onChange}:ControlsProps): JSX.Element => {

    console.log('DashboardControls')

    const options = [
        {
            text: 'Table',
            active: true
        },
        {
            text: 'Chart',
            active: false
        },
        {
            text: 'Download',
            active: false
        },
    ];

    type ChangeEvent = React.KeyboardEvent | React.MouseEvent;

    const handleDisplayOptionChange = (e: ChangeEvent) => {
        (e.target as HTMLButtonElement).disabled = true;        
    }

    return (
        <section>
            <nav className="flex justify-center">
                <ul className="flex flex-row w-4/5 m-4 justify-evenly">
                    {
                        options.map(o => {
                            return <li key={o.text}><button onClick={handleDisplayOptionChange} className="border p-2 border-solid">{o.text}</button></li>
                        })
                    }
                </ul>                     
            </nav>
            <div className="flex justify-center">
                <Slider intialState={snapShot} range={snapShots} onChange={onChange}></Slider>    
            </div>
        </section>
    )

};

export default DashboardControls;