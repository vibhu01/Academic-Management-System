import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../contexts/UserContext";
import SectionItem from "../List Items/SectionItem";
import './view_course.css'

const ViewCourse = () => {
    const {courseID} = useParams();
    const navigate = useNavigate();
    const {user, loading} = useContext(UserContext);

    const [sections,setSections] = useState([]);
    const [courseInfo,setCourseInfo] = useState({});

    useEffect(() => {
        axios.post("http://localhost:3010/course/sections",{course_id: courseID})
            .then(res => {
                setSections(res.data);
                console.log(res.data);
            });

        axios.post("http://localhost:3010/course/info",{course_id: courseID})
            .then(res => {
                setCourseInfo(res.data[0]);
            });
    },[courseID]);

    return ( 
        <div className="course">
            <div className="course-details">
                <h3>{courseInfo.ic !== undefined && courseInfo.course_id} {courseInfo.ic !== undefined && courseInfo.course_name}</h3>
                <h4>IC: {courseInfo.ic !== undefined && (courseInfo.first_name + " " + courseInfo.last_name)}</h4>
            </div>

            <div className="course-sections">
                <h3>Sections</h3>
                {/* Render Sections here */}
                {sections.length > 0 && sections.map(s =>{
                    return <SectionItem courseID={s.course_id} sectionID={s.section_id} />
                })}

            </div>
            {loading && user.role === "professor" && user.professor_id === courseInfo.ic && <button className="btn btn-primary" onClick={_ => navigate("addSection")} >Add Section</button>}

        </div>
     );
}
 
export default ViewCourse;