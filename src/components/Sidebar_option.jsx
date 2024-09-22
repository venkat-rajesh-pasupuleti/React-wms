// import React from 'react'
// import styles from './Sidebar_options.module.css'
// import { Link } from 'react-router-dom';

// // eslint-disable-next-line
// function Sidebar_option(props) {


// // function handleClick(){
//   //onClick={handleClick}
// // }
//   return (


// <Link to ={props.address}>
// <button className={styles.sidebarOption}   >{props.option}</button> 
// </Link>




//   )
// }




import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar_options.module.css';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Sidebar_option({ option, address,icon }) {
  return (
    <Link to={address} >
      <button className={styles.sidebarOption}  flex items-center p-2 no-underline>
        {/* {icon && <FontAwesomeIcon icon={icon} className="mr-2"/>} */}
        
        {icon && <span className='flex item-center text-center space-x-6 mr-2'>{icon}{option} </span>}
        </button>
    </Link>
  );
}

export default Sidebar_option;

