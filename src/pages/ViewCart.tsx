import Nav from "../components/Nav";
import { getCourse, getStringFromCourseCart, moveCourseInCarts, removeFromCourseCart, getCourseArrayIndex, getCourseId } from "../components/Common";
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { toast } from 'react-toastify';

function ViewCart({ courses, courseCart, setCourseCart, courseCartState, setcourseCartState }) {

	const onMoveCourseInCart = (position) => {
		moveCourseInCarts(courseCart, setCourseCart, position);
	};

	const handleRemoveCourseFromCart = (dept, number) => {
		removeFromCourseCart(courseCart, setCourseCart, dept, number);
		const updatedCartState = [...courseCartState];
		updatedCartState[getCourseArrayIndex(getCourseId(dept, number))] = false;
		setcourseCartState(updatedCartState);
	};

	return (
		<div style={{
			background: "White",
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			minHeight: "100vh",
			color: "Black",
			display: "flex",
			flexDirection: "column"
		}}>
			<Nav courseCart={courseCart} />
			<div
				style={{
					flex: "1",
					display: "flex",
					flexDirection: "column",
					width: "100%",
					boxSizing: "border-box",
					padding: "1rem",
					gap: "1rem",
					overflow: "hidden",
					color: "Black"
				}}>
				<h4 style={{ textAlign: "top", fontSize: "1.75rem", margin: "0", padding: "0" }}>
					Course Cart</h4>
				<div style={{ overflowY: "auto", paddingRight: "0.5rem", flex: "1" }}>
					{courseCart.length == 0
						? (<p>Your cart is currently empty!</p>)
						: (<div>
							<DragDropContext onDragEnd={onMoveCourseInCart}>
								<Droppable droppableId="cart">
									{(provided) => (
										<ul {...provided.droppableProps} ref={provided.innerRef}
											style={{
												width: "100%", padding: "0", margin: "0", flexDirection: "column", display: "flex",
											}}>
											{courseCart.map((courseDepNum, index) => (
												<Draggable key={courseDepNum} draggableId={courseDepNum} index={index}>
													{(provided) => (
														<li
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps} // This makes the whole item draggable
															style={{
																width: "100%",
																background: "#F2F2F2",
																display: "flex",
																boxSizing: "border-box",
																border: "1px solid",
																padding: "1rem",
																paddingTop: "0",
																marginTop: "0.9rem",
																borderRadius: "8px",
																alignItems: "center",
																justifyContent: "space-between",
																color: "Black",
																...provided.draggableProps.style,
															}}
														>
															{getCourse(courseDepNum).dept} {getCourse(courseDepNum).number}: {getCourse(courseDepNum).title}
															<button
																onClick={() => handleRemoveCourseFromCart(getCourse(courseDepNum).dept, getCourse(courseDepNum).number)}
																style={{
																	marginTop: "1rem",
																	background: "#D2042D",
																	color: "White",
																	width: "auto",
																	height: "auto",
																	padding: "4px 8px",
																	cursor: "pointer",
																	display: "flex",
																	borderRadius: "4px"
																}}
															>
																Remove
															</button>
														</li>
													)}
												</Draggable>
											))}
											{provided.placeholder}
										</ul>
									)}
								</Droppable>
							</DragDropContext>
						</div>)
					}
				</div>
				<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", width: "100%", }}>
					<Link to={"/receipt/" + getStringFromCourseCart(courseCart)}>
						<button disabled={courseCart.length == 0} style={{ cursor: courseCart.length == "0" ? "not-allowed" : "pointer", width: "100%", textAlign: "center", background: courseCart.length == "0" ? "#C3C3C3" : "#000080", color: courseCart.length == "0" ? "#808080" : "white" }}>
							Checkout
						</button>
					</Link>
					<button disabled={courseCart.length == 0} style={{ cursor: courseCart.length == "0" ? "not-allowed" : "pointer", width: "100%", textAlign: "Center", background: courseCart.length == "0" ? "#C3C3C3" : "#000080", color: courseCart.length == "0" ? "#808080" : "white" }}
						onClick={() => { navigator.clipboard.writeText(new URL(window.location.href).origin + "/receipt/" + getStringFromCourseCart(courseCart)); toast.success("Successfully copied to clipboard!") }}
					>
						Share
					</button>
					<Link to={"/"}>
						<button style={{ cursor: "pointer", width: "100%", textAlign: "Center", background: "#000080", color: "white", }}>
							Back
						</button>
					</Link>
				</div>
			</div >
		</div >
	);
}

export default ViewCart;
