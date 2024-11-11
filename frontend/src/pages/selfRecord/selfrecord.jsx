import React from 'react'
import Sidebar from "../Layout/sidebar"
const selfrecord = () => {
   return (
     <div className="d-flex">
       {/* Sidebar is added here */}
       <Sidebar />

       <div>
         <h1>this is SelfRecord page</h1>
       </div>
     </div>
   );
}

export default selfrecord
