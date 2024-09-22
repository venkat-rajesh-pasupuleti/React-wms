// //import React from 'react'
// import Sidebar_option from './Sidebar_option'
// import styles from './SideBar.module.css'
// function SideBar(props) {
// var links = props.links
// console.log(props.links)
//   return (
//     <div className='block'>
//           <div className={styles.heading}>Warehouse Management</div>
//           <div className={styles.sidebar} >
//           {links.map((x)=><Sidebar_option  option={x.name}  address= {x.url}/>)}
          
//           </div>

//         </div>
//   )
// }



// export default SideBar


// import React from 'react';
// import Sidebar_option from './Sidebar_option';
// import styles from './SideBar.module.css';
// import Draggable from 'react-draggable';

// function SideBar({ links }) {
//   return (
//     <div className='block'>
//       <div className={styles.heading}>Warehouse Management</div>
//       <div className={styles.sidebar}>
//         {links.map((x) => (
//           <Sidebar_option key={x.url} option={x.name} address={x.url} />
//         ))}
//       </div>
//     </div>
//   );
// }

import React from 'react';
import Sidebar_option from './Sidebar_option';
import styles from './SideBar.module.css';
import Draggable from 'react-draggable';
import { faBars} from "@fortawesome/free-solid-svg-icons/index"; // Add icon for sidebar toggle
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FaTrolly, FaClipboardCheck, FaReceipt, FaWarehouse } from 'react-icons/fa'; // Import icons
import IconImage from '../assets/images/StockMovement.jpg';





function SideBar({ links, isCollapsed, onToggle }) {
  return (
    <Draggable>
      <div className={`{bg-gray-200 border-r-gray-800 p-4 ${isCollapsed ? 'w-16' : 'w-1/4'} rounded-lg m-2 transition-all duration-300}`}>
        <div className={styles.heading}>
          {isCollapsed ? '' : 'Warehouse Management'}
        </div>
        {!isCollapsed && (
          <div className={styles.sidebar}>
            {links.map((x) => (
              <Sidebar_option key={x.url} 
              option={x.name} 
              address={x.url} 
              // icon={x.icon}
              icon={
                x.name === "Stock Movement" ? <FaWarehouse className={`${styles.icon} ${styles['icon-lg']}`} color="#3498db" /> :
                x.name === "Status Change" ? <FaClipboardCheck className={`${styles.icon} ${styles['icon-lg']}`} color="#e74c3c" /> :
                x.name === "Receipt" ? <FaReceipt className={`${styles.icon} ${styles['icon-lg']}`} color="#f1c40f" /> : null
              }              //icon={x.name === "Receipt" ? faReceipt :null}
              />
            ))}
          </div>
        )}
        <button className="sidebar-toggle" onClick={onToggle}>
          <FontAwesomeIcon icon={faBars}  color='green'/>
        </button>
      </div>
    </Draggable>
  );
}


export default SideBar;