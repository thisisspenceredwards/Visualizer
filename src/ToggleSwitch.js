import React, {useState} from 'react';

const Toggle = (props) => {
    let [toggleState, setToggleState] = useState(false)
    const clicked = () =>
    {
        toggleState = !toggleState //isn't updating quickly enough again
        setToggleState(toggleState)
        if(toggleState)
            props.functionOn()
        else
            props.functionOff()
    }

    return (
        <>
            <div className='custom-control custom-switch'>
                <input
                    type='checkbox'
                    className='custom-control-input'
                    id='customSwitches'
                    checked = {toggleState}
                    onClick = {clicked.bind(this)}
                />
                <label className='custom-control-label' htmlFor='customSwitches'>
                    {props.title}
                </label>
            </div>
        </>
    );
};

export default Toggle;