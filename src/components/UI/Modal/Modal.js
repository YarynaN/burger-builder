import React from 'react';

import styles from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import BackDrop from '../Backdrop/Backdrop';

const modal = (props) => {
    return (
        <Aux>
            <div className={styles.Modal}
                 style={{
                     transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                     opacity: props.show ? '1' : '0'
                 }}
            >
                {props.children}
            </div>
            <BackDrop show={props.show} clicked={props.modalClosed}/>
        </Aux>
    );
}
const willUpdate = (prevProps, nextProps) => {
    return prevProps.show === nextProps.show && prevProps.children === nextProps.children;
}

export default React.memo(modal, willUpdate);

