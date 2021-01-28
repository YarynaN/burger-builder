import React from 'react';

import styles from './Input.module.css'

const input = (props) => {
    let inputElement;
    let options = [];
    const inputClasses = [styles.InputField, (props.invalid && props.shouldValidate ? styles.InputInvalid : '')].join(' ');

    switch (props.elementType) {
        case 'input':
            inputElement = <input className={inputClasses} {...props.elementConfig} value={props.value} onChange={props.onChanged}/>
            break;
        case 'textarea':
            inputElement = <textarea className={inputClasses} {...props.elementConfig} value={props.value} onChange={props.onChanged}/>
            break;
        case 'select':
            options = props.elementConfig.options.map((option) => {
                return <option key={option.value} value={option.value}>{option.displayValue}</option>
            })
            inputElement = (<select className={inputClasses} value={props.value} onChange={props.onChanged}>
                {options}
            </select>)
            break;
        default:
            inputElement = <input className={inputClasses} {...props.elementConfig} value={props.value} onChange={props.onChanged}/>
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
            {props.invalid ? <div className={styles.InputErrorMsg}>Please, enter {props.elementConfig.placeholder}</div> : null}
        </div>
    );
}

export default input;