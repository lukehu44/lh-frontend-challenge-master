
import { getCourse, getCourseId, getStringFromCourseCart, moveCourseInCarts, removeFromCourseCart, getCourseArrayIndex } from "./Common";
import { Link, createSearchParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { toast } from 'react-toastify';

const Cart = ({ courses, courseCart, setCourseCart, courseCartState, setcourseCartState }) => {

	const handleRemoveCourseFromCart = (dept, number) => {
		removeFromCourseCart(courseCart, setCourseCart, dept, number);
		const updatedCartState = [...courseCartState];
		updatedCartState[getCourseArrayIndex(getCourseId(dept, number))] = false;
		setcourseCartState(updatedCartState);
	};

	const onMoveCourseInCart = (position) => {
		moveCourseInCarts(courseCart, setCourseCart, position);
	};

	return (
		<>
			<div
				style={{
					width: "100%",
					height: "100%",
					boxSizing: "border-box",
					border: "1px solid",
					padding: "1rem",
					borderRadius: "8px",
					justifyContent: "space-between",
					color: "Black",
					display: "flex",
					flexDirection: "column",
				}}>
				<h4 style={{ textAlign: "top", fontSize: "1.75rem", margin: "0" }}>
					Course Cart</h4>
				<div style={{ flexGrow: "1", overflowY: "auto" }}>
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
															{...provided.dragHandleProps}
															style={{
																width: "100%",
																background: "#F2F2F2",
																display: "flex",
																boxSizing: "border-box",
																border: "1px solid",
																padding: "1rem",
																marginBottom: "1rem",
																borderRadius: "8px",
																alignItems: "center",
																justifyContent: "space-between",
																color: "Black",
																...provided.draggableProps.style,
															}}
														>
															<div style={{
																display: "flex",
																fontWeight: "bold",
																justifyContent: "center",
																borderRadius: "4px", paddingRight: "1rem"
															}}
															>
																{index + 1}
															</div>
															<span
																style={{
																	flex: "1",
																	textAlign: "left",
																	fontWeight: "500"
																}}>

																{getCourse(courseDepNum).dept} {getCourse(courseDepNum).number}: {getCourse(courseDepNum).title}
															</span>
															<button
																onClick={() => handleRemoveCourseFromCart(getCourse(courseDepNum).dept, getCourse(courseDepNum).number)}
																style={{
																	background: "#D2042D",
																	color: "White",
																	border: "1px solid",
																	width: "auto",
																	height: "auto",
																	padding: "4px 8px",
																	cursor: "pointer",
																	display: "flex",
																	alignItems: "center",
																	justifyContent: "center",
																	borderRadius: "4px",
																	flexShrink: "0",
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
				<div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
					<Link to={"/receipt/" + getStringFromCourseCart(courseCart)}>
						<button disabled={courseCart.length == 0} style={{ cursor: courseCart.length == "0" ? "not-allowed" : "pointer", width: "100%", textAlign: "center", background: courseCart.length == "0" ? "#C3C3C3" : "#000080", color: courseCart.length == "0" ? "#808080" : "white" }}>
							Checkout
						</button>
					</Link>
					<button disabled={courseCart.length == 0} style={{ cursor: courseCart.length == "0" ? "not-allowed" : "pointer", width: "100%", textAlign: "Center", background: courseCart.length == "0" ? "#C3C3C3" : "#000080", color: courseCart.length == "0" ? "#808080" : "white" }}
						onClick={() => { navigator.clipboard.writeText(new URL(window.location.href).origin + "/receipt/" + getStringFromCourseCart(courseCart)); toast.success("Successfully copied to clipboard!") }}
					>
						Share Cart
					</button>
				</div>
			</div >
		</>
	);
}

export default Cart;
