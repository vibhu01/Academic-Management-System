import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import "./admin_dash.css"
import { UserContext } from '../contexts/UserContext';
import ViewStudents from '../View Entities/view_students';
import ViewCourses from '../View Entities/ViewCourses';
import ViewProfessors from '../View Entities/ViewProfeessors';
import AddStudent from '../Add Entities/AddStudent';


const AdminDash = () => {
    const [ind,setInd] = useState(sessionStorage.getItem("index"));
    const navigate = useNavigate();
    const {user,logoutUser} = useContext(UserContext);
    const [menu,setMenu] = useState(true);
    return ( 
    <div className="admin">
        <div className="header"> 
        <button  className='menu' onClick={()=>{
            setMenu(!menu);
        }}></button><h2>Hello, {user.first_name} </h2> 
        <button className='logout button btn btn-primary' onClick={function(){
            logoutUser();
            navigate("/");
        }} >Logout</button></div>
        <div className="en">
        <div className="navbar" style = {{display:(menu?"flex":"none")}}>
            <ul className='list-group' onClick={(e)=>{
                console.log(e);
                setInd(e.target.innerHTML);
                sessionStorage.setItem("index",e.target.innerHTML);
            }}>
                <li style = {{borderRight:(ind === "View Students")?"5px solid rgba(0,0,0,0.5)":"5px solid rgba(0,0,0,0)"}}>View Students</li>
                <li style = {{borderRight:(ind === "View Courses")?"5px solid rgba(0,0,0,0.5)":"5px solid rgba(0,0,0,0)"}}>View Courses</li>
                <li style = {{borderRight:(ind === "View Professors")?"5px solid rgba(0,0,0,0.5)":"5px solid rgba(0,0,0,0)"}}>View Professors</li>
                <li style = {{borderRight:(ind === "Add Students")?"5px solid rgba(0,0,0,0.5)":"5px solid rgba(0,0,0,0)"}}>Add Students</li>
            </ul>
        </div>
        <div className="content">
            {(ind === "View Students")?
                <ViewStudents></ViewStudents>
            :(ind === "View Courses")?
                <ViewCourses />
            :(ind === "View Professors")?
                <ViewProfessors /> 
            :(ind === "Add Students")?
            <AddStudent />: <p></p>}
         </div>
        </div>

    </div> 
    );
}
 
export default AdminDash;