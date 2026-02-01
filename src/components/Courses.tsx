import React, { useState, useMemo } from "react"
import { addToCourseCart, removeFromCourseCart, colorBox } from "./Common"
import Fuse from 'fuse.js'
import { MdOutlineAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { toast } from 'react-toastify';

const Courses = ({ courses, courseCart, setCourseCart, cart, setCart }) => {
	const [filter, setFilter] = useState('');
	const initialDescriptionVisibility = courses.map(() => false);
	const [visible, setVisible] = useState([]);




	const handleToggleCartClick = (courseIndex: number) => {

		const shouldAddToCart = !cart[courseIndex];
		if (shouldAddToCart) {
			if (courseCart.length >= 7) {
				toast.error("Cannot add more courses");
			} else if (addToCourseCart(courseCart, setCourseCart, courses[courseIndex].dept, courses[courseIndex].number)) {
				const updatedCart = [...cart];
				updatedCart[courseIndex] = shouldAddToCart;
				setCart(updatedCart);
			}
		} else {
			if (removeFromCourseCart(courseCart, setCourseCart, courses[courseIndex].dept, courses[courseIndex].number)) {
				const updatedCart = [...cart];
				updatedCart[courseIndex] = shouldAddToCart;
				setCart(updatedCart);
			}
		}
	}

	const handleFilter = (event) => {
		setFilter(event.target.value);
	};


	const fuseOptions = {
		keys: ['title', 'description', 'number', 'dept', 'deptNum'],
		threshold: 0.4,
		includeScore: true
	};

	const fuse = useMemo(() => new Fuse(courses, fuseOptions), [courses, fuseOptions]);

	const filteredCoursesViaFuse = useMemo(() => {
		if (!filter) return courses;
		return fuse.search(filter).map(result => result.item);
	}, [filter, fuse]);


	const filteredCourses = courses.filter(course => {
		if (filter == '') {
			return true
		}
		else {
			return course.description.toLowerCase().includes(filter.toLowerCase())
				|| course.title.toLowerCase().includes(filter.toLowerCase())
				|| course.number.toString().includes(filter.toLowerCase())
		}
	});

	const handleShowDescription = (index) => {
		const updatedVisible = [...visible]
		updatedVisible[index] = !updatedVisible[index]
		setVisible(updatedVisible)
	};

	const countResults = filteredCoursesViaFuse ? filteredCoursesViaFuse.length : 0


	return (
		<div style={{ width: "100%", position: "relative" }}>
			<style>{`
                .courseGrid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.75rem;
                    width: 100%;
                }

                @media (max-width: 768px) {
                    .courseGrid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
			<div style={{ display: "flex", flexDirection: "column", }}>
				<input
					type="text"
					placeholder="Search Course ('CIS 110', 'CIS 497')..."
					value={filter}
					onChange={handleFilter}
					style={{
						width: "100%",
						boxSizing: "border-box",
						padding: "1rem",
						fontSize: "1rem",
						border: "1px solid #000035",
						borderRadius: "8px",
						outline: "none",
					}}
				/>
			</div>
			{(countResults === 0) ? (
				<div style={{ padding: "1rem", margin: "1.25rem", color: "Black", textAlign: "center", fontSize: "1.25rem" }}> No courses found for "{filter}" </div>)
				: (
					<div className="courseGrid" style={{ paddingTop: "1rem", width: "100%", color: "Black", }}>
						{/* {filteredCourses.map((course, index) => { */}
						{filteredCoursesViaFuse.map((course, index) => {
							const ogIndex = courses.indexOf(course);
							const {
								dept,
								number,
								title,
								description,
								prereqs,
								"cross-listed": crossListed,
							} = course;

							return (
								<div key={`${dept}-${number}`} style={{ textAlign: "left", background: "#F2F2F2", border: "2px solid #E0E0E0", padding: "0.5rem", }}>
									<div style={{ display: "flex", alignItems: "flex-start", gap: "10px", justifyContent: "space-between" }}>
										<h3 style={{ margin: "0", color: "Black", fontSize: "1.5rem" }}>
											{dept} {number}: {title}
										</h3>
										<div>
											<button style={{
												marginTop: "0.25rem",
												background: cart[ogIndex] ? "#D2042D" : "#000080",
												color: "White",
												border: "1px solid",
												width: "auto",
												height: "auto",
												padding: "4px 8px",
												cursor: "pointer",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												borderRadius: "4px"
											}}
												onClick={() => handleToggleCartClick(ogIndex)}>
												{cart[ogIndex] ? <MdOutlineRemoveShoppingCart /> : <MdOutlineAddShoppingCart />}
												{cart[ogIndex] ? "Remove" : "Add"}
											</button>
										</div>
									</div >
									{courses[ogIndex].hasMoreData ? (
										<div style={{ display: "flex", gap: "4px", flexWrap: "wrap", fontSize: "0.75rem", marginTop: "0.5rem" }}>
											<p style={{ margin: 0, background: "#0000CD", color: "White", width: "auto", height: "auto", padding: "2px 4px", borderRadius: "4px" }}>
												<strong>CU: </strong>{courses[ogIndex].credits ?? 'N/A'}
											</p>
											<p style={{ margin: 0, background: colorBox(courses[ogIndex].courseQuality, 0), color: "White", width: "auto", height: "auto", padding: "2px 4px", borderRadius: "4px" }}>
												<strong>Course: </strong> {courses[ogIndex].courseQuality ?? 'N/A'}
											</p>
											<p style={{ margin: 0, background: colorBox(courses[ogIndex].instructorQuality, 0), color: "White", width: "auto", height: "auto", padding: "2px 4px", borderRadius: "4px" }}>
												<strong>Instructor: </strong>{courses[ogIndex].instructorQuality ?? 'N/A'}
											</p>
											<p style={{ margin: 0, background: colorBox(courses[ogIndex].difficulty, 1), color: "White", width: "auto", height: "auto", padding: "2px 4px", borderRadius: "4px" }}>
												<strong>Difficulty: </strong>{courses[ogIndex].difficulty ?? 'N/A'}
											</p>
											<p style={{ margin: 0, background: colorBox(courses[ogIndex].workRequired, 1), color: "White", width: "auto", height: "auto", padding: "2px 4px", borderRadius: "4px" }}>
												<strong>Work: </strong>{courses[ogIndex].workRequired ?? 'N/A'}
											</p>
										</div>
									)
										: ''
									}
									<p style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
										{visible[ogIndex] ? description : description.slice(0, 230) + "..."}
									</p>
									{prereqs && prereqs.length > 0 && (
										<div>
											<p>
												<i>
													<b>
														Prerequisites:{" "}
													</b>
													{Array.isArray(prereqs) ? prereqs.join(", ") : prereqs}{" "}
												</i>
											</p>
										</div>
									)}
									{crossListed && crossListed.length > 0 && (
										<p style={{}}>
											<i>
												<b>
													Cross-listed: {crossListed.join(", ")}
												</b>
											</i>
										</p>
									)}
									<button style={{
										background: visible[ogIndex] ? "#D2042D" : "#000080",
										color: "White",
										border: "1px solid",
										width: "75px",
										height: "24px",
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										borderRadius: "4px",
										marginBottom: "0.5rem"
									}}
										onClick={() => handleShowDescription(ogIndex)}>
										{visible[ogIndex] ? 'Retract' : 'Expand'}
									</button>
								</div>
							);
						})}
					</div>
				)}
		</div>
	);
}

export default Courses;
