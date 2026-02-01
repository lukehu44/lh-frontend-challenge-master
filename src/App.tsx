import { BrowserRouter, Routes, Route } from 'react-router-dom';
import coursesFromData from "./data/courses.json";
import Nav from "./components/Nav";
import Courses from "./components/Courses";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Receipt from "./pages/Receipt";
import ViewCart from "./pages/ViewCart";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscLoading } from "react-icons/vsc";
import { TbFileSad } from "react-icons/tb";

function fetchAllCourses(courses, setCourses, loading, setLoading, error, setError) {
	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const requests = coursesFromData.map(async course => {
					const deptNum = course.dept + "-" + course.number.toString();
					const url = '/api/base/2022A/courses/' + deptNum + "/";
					const response = await fetch(url);
					if (response.ok) {
						const urlCourse = await response.json();
						return {
							...course,
							deptNum: deptNum,
							hasMoreData: true,
							courseQuality: urlCourse.course_quality,
							difficulty: urlCourse.difficulty,
							instructorQuality: urlCourse.instructor_quality,
							workRequired: urlCourse.work_required,
							credits: urlCourse.credits,
						};
					} else {
						return {
							...course,
							deptNum: deptNum,
							hasMoreData: false,
						};
					}
				}
				);
				const fetchedCourses = await Promise.all(requests);
				setCourses(fetchedCourses);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchCourses();
	}, []);
}



function App() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [courses, setCourses] = useState(coursesFromData);

	const initialCartState = coursesFromData.map(() => false);
	const [courseCart, setCourseCart] = useState([]);
	const [courseCartState, setcourseCartState] = useState(initialCartState);

	fetchAllCourses(courses, setCourses, loading, setLoading, error, setError);

	if (error) {
		return (<div
			style={{ display: "flex", position: "fixed", left: "0", top: "0", margin: "0", height: "100vh", width: "100vw", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#B2BEB5" }}>
			<TbFileSad style={{ color: "black", width: "8rem", height: "8rem", marginBottom: "1.5rem" }} />
			<h3 style={{ margin: 0, fontSize: "1.25rem", color: "#333" }}>
				Could Not Open Site :(
			</h3> </div>
		);
	} else if (loading) {
		return (<div
			style={{ display: "flex", position: "fixed", left: "0", top: "0", margin: "0", height: "100vh", width: "100vw", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#B2BEB5" }}>
			<style> {`
                @keyframes spin{
                0% {transform: rotate(0deg);}
                100% {transform: rotate(360deg)}}
                `}
			</style>
			<VscLoading style={{ width: "8rem", height: "8rem", animation: "spin 1s linear infinite", marginBottom: "1.5rem" }} />
			<h3 style={{ margin: 0, fontSize: "1.25rem", color: "#333" }}>
				Loading Courses
			</h3> </div>
		);
	} else {
		return (
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home courses={courses} courseCart={courseCart} setCourseCart={setCourseCart} courseCartState={courseCartState} setcourseCartState={setcourseCartState} />} />
					<Route path="/viewcart" element={<ViewCart courses={courses} courseCart={courseCart} setCourseCart={setCourseCart} courseCartState={courseCartState} setcourseCartState={setcourseCartState} />} />
					<Route path="/receipt/:cartstr" element={<Receipt courses={courses} courseCart={courseCart} setCourseCart={setCourseCart} courseCartState={courseCartState} setcourseCartState={setcourseCartState} />} />

					<Route path="*" element={<div
						style={{ display: "flex", position: "fixed", left: "0", top: "0", margin: "0", height: "100vh", width: "100vw", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#B2BEB5" }}>
						<TbFileSad style={{ color: "black", width: "8rem", height: "8rem", marginBottom: "1.5rem" }} />
						<h3 style={{ margin: 0, fontSize: "1.25rem", color: "#333" }}>
							Could Not Open Site :(
						</h3> </div>} />
				</Routes>
				<ToastContainer style={{ zIndex: "1001" }} />
			</BrowserRouter>
		);
	}
}

export default App;
