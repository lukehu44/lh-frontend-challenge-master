import Nav from "../components/Nav";
import Courses from "../components/Courses";
import Cart from "../components/Cart";
import ViewCart from "./ViewCart";

function Home({ courses, courseCart, setCourseCart, courseCartState, setcourseCartState }) {
    return (
        <div style={{ background: "White", minHeight: "100vh", width: "100%", minWidth: "100vw", boxSizing: "border-box" }}>
            <style> {`
            .mainLayout {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 1rem;
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 1.5rem;
                }

                .containerCart {
                    display: block;
                    position: sticky;
                    top: 5.8rem;
                    height: calc(100vh - 6.8rem);
                    overflow: visible;
                    display: flex;
                    flex-direction: column;
                }

                @media (max-width: 768px) {
                    .mainLayout {
                        display: block;
                        padding: 0.5rem;
                    }

                    .containerCart {
                        display: none;
                    }
                }
            `}</style>
            <Nav courseCart={courseCart} />
            <div className="mainLayout">
                <div style={{ minWidth: 0 }}>
                    <Courses courses={courses} cart={courseCartState} setCart={setcourseCartState} courseCart={courseCart} setCourseCart={setCourseCart}
                    />
                </div>
                <aside className="containerCart">
                    <div style={{ minWidth: 0, height: "100%" }}>
                        <Cart courses={courses} courseCart={courseCart} setCourseCart={setCourseCart} courseCartState={courseCartState} setcourseCartState={setcourseCartState} />
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Home;
