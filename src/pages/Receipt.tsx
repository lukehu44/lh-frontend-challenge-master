import Nav from "../components/Nav";
import Courses from "../components/Courses";
import Cart from "../components/Cart";
import { getCourse, getCourseCartFromString, getCourseArrayIndex, getCourseId, colorBox } from "../components/Common";
import { useParams, useSearchParams } from "react-router-dom";
import { Link, createSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import React, { useMemo } from 'react';


function Receipt({ courses, courseCart, setCourseCart, courseCartState, setcourseCartState }) {
    const { cartstr } = useParams();
    const receivedCourseCart = getCourseCartFromString(cartstr);


    const handleCourseReplacement = () => {
        const updatedCartState = [...courseCartState];
        const updatedCourseCart = [];
        for (var i = 0; i < updatedCartState.length; i++) {
            updatedCartState[i] = false;
        }
        for (var i = 0; i < receivedCourseCart.length; i++) {
            const courseArrayId = getCourseArrayIndex(receivedCourseCart[i]);
            updatedCourseCart.push(receivedCourseCart[i]);
            updatedCartState[courseArrayId] = true;
        }
        toast.success("Cart successfully copied")
        setCourseCart(updatedCourseCart);
        setcourseCartState(updatedCartState);
    }

    const averages = useMemo(() => {
        const safeDivision = (total, count) => count === 0 ? 0 : (total / count).toFixed(1);
        let totalCred = 0;
        let totalDiff = 0, countDiff = 0;
        let totalInst = 0, countInst = 0;
        let totalCourse = 0, countCourse = 0;
        let totalWork = 0, countWork = 0;

        for (var i = 0; i < receivedCourseCart.length; i++) {
            const tempCart = receivedCourseCart[i];
            const takenCourse = getCourse(tempCart);

            const course = courses.find(c => c.dept === takenCourse.dept && c.number === takenCourse.number)
            if (course != null) {
                if (course.credits != null) {
                    totalCred += parseFloat(course.credits);
                }
                if (course.difficulty != null) {
                    totalDiff += course.difficulty; countDiff++
                }
                if (course.instructorQuality != null) {
                    totalInst += course.instructorQuality; countInst++
                }
                if (course.courseQuality != null) {
                    totalCourse += course.courseQuality; countCourse++
                }
                if (course.workRequired != null) {
                    totalWork += course.workRequired; countWork++
                }
            }
        }
        return {
            credits: totalCred.toFixed(1), difficulty: safeDivision(totalDiff, countDiff), instructorQuality: safeDivision(totalInst, countInst),
            courseQuality: safeDivision(totalCourse, countCourse), workRequired: safeDivision(totalWork, countWork)
        }
    }, [receivedCourseCart, courses]);

    return (
        <div style={{
            background: "White",
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            minHeight: "100vh",
            minWidth: "100%",
            color: "Black",
            display: "flex",
            flexDirection: "column"
        }}>

            <Nav courseCart={courseCart} />
            <h3 style={{ textAlign: "top", fontSize: "1.75rem", marginLeft: "1rem", marginBottom: "0rem" }}>
                Course Cart Checkout</h3>
            <div>
                <div style={{
                    borderBottom: "1px solid #E0E0E0", paddingBottom: "0.5rem", marginBottom: "0rem", width: "35%"
                }}>
                    <h3 style={{ marginLeft: "1rem", marginBottom: "0rem", color: "#4A4A4A", fontSize: "1.5rem", fontWeight: "bold" }}>
                        Average
                    </h3>
                </div>
                {(receivedCourseCart.length > 0 && averages) && (
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", fontSize: "1rem", marginBottom: "0rem", margin: "1rem" }}>
                        <div style={{ margin: 0, width: "auto", height: "auto" }}>
                            <div style={{ margin: 0, background: "#0000CD", color: "White", borderRadius: "4px", width: "5rem", height: "5rem", display: "flex", justifyContent: 'center', alignItems: 'center', fontSize: "1.5rem" }}>
                                {averages.credits ?? 'N/A'}
                            </div>
                            <strong style={{ justifyContent: 'center', flexDirection: "center", display: "flex", marginTop: "0.5rem" }}> Total CUs </strong>
                        </div>
                        <div style={{ margin: 0, width: "auto", height: "auto" }}>
                            <div style={{ display: "flex", margin: 0, background: colorBox(averages.courseQuality, 0), color: "White", borderRadius: "4px", width: "5rem", height: "5rem", justifyContent: 'center', alignItems: 'center', fontSize: "1.5rem" }}>
                                {averages.courseQuality ?? 'N/A'}
                            </div>
                            <strong style={{ justifyContent: 'center', flexDirection: "center", display: "flex", marginTop: "0.5rem" }}> Course </strong>
                        </div>
                        <div style={{ margin: 0, width: "auto", height: "auto" }}>
                            <div style={{ display: "flex", margin: 0, background: colorBox(averages.instructorQuality, 0), color: "White", borderRadius: "4px", width: "5rem", height: "5rem", justifyContent: 'center', alignItems: 'center', fontSize: "1.5rem" }}>
                                {averages.instructorQuality ?? 'N/A'}
                            </div>
                            <strong style={{ justifyContent: 'center', flexDirection: "center", display: "flex", marginTop: "0.5rem" }}> Instructor </strong>
                        </div>
                        <div style={{ margin: 0, width: "auto", height: "auto" }}>
                            <div style={{ display: "flex", margin: 0, background: colorBox(averages.difficulty, 1), color: "White", borderRadius: "4px", width: "5rem", height: "5rem", justifyContent: 'center', alignItems: 'center', fontSize: "1.5rem" }}>
                                {averages.difficulty ?? 'N/A'}
                            </div>
                            <strong style={{ justifyContent: 'center', flexDirection: "center", display: "flex", marginTop: "0.5rem" }}> Difficulty </strong>
                        </div>
                        <div style={{ margin: 0, width: "auto", height: "auto", }}>
                            <div style={{ display: "flex", margin: 0, background: colorBox(averages.workRequired, 1), color: "White", borderRadius: "4px", width: "5rem", height: "5rem", justifyContent: 'center', alignItems: 'center', fontSize: "1.5rem" }}>
                                {averages.workRequired ?? 'N/A'}
                            </div>
                            <strong style={{ justifyContent: 'center', flexDirection: "center", display: "flex", marginTop: "0.5rem" }}> Work </strong>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {receivedCourseCart.length == 0
                    ? (<p>Your cart is currently empty!</p>)
                    : (<div>
                        {receivedCourseCart.map((courseInCart, index) => (
                            <ul style={{ padding: "0", listStyle: "None" }}>
                                <li style={{ margin: "1rem", textAlign: "Left" }}
                                    key={index}>
                                    {index + 1} {". "} {getCourse(receivedCourseCart[index]).dept} {getCourse(receivedCourseCart[index]).number}: {getCourse(receivedCourseCart[index]).title}
                                </li>
                            </ul>
                        ))}
                    </div>)
                }
            </div>
            <div>
                <button style={{ margin: "1rem", marginTop: "0", textAlign: "Left", background: "#000080", color: "white" }}
                    onClick={() => handleCourseReplacement()}
                >
                    Copy these courses into your cart
                </button>
            </div>
        </div>
    );
}

export default Receipt;
