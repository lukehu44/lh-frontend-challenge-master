import Cart from "../components/Cart";
import ViewCart from "./ViewCart";
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

const Nav = ({ courses, courseCart, setCourseCart, courseCartState, setcourseCartState }) => (
    <nav
        style={{
            backgroundColor: "#000080",
            color: "White",
            width: "100%",
            boxSizing: "border-box",
            padding: "0.75rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 100
        }}>
        <Link to={"/"}>
            <button style={{ display: "flex", alignItems: "center", gap: "1rem", background: "none", color: "white", padding: "0" }}>
                <img src="/images/UPenn_Shield.png" style={{ width: "3rem", margin: "0 -1.5rem 0 0.3rem" }}>
                </img>
                <h2 style={{ margin: 0, fontWeight: 700, fontSize: "1.25rem" }}>
                    Penn Courses</h2>
            </button>
        </Link>
        <div class>
            <Link to={"/viewcart"}>
                <button style={{
                    background: "none",
                    color: "white",
                    border: "none",
                    width: "auto",
                    height: "auto",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                    fontSize: "14px",
                }}>
                    <div>
                        <FaShoppingCart size={18} />
                    </div>
                    <div>
                        <p>
                            Cart ({courseCart ? courseCart.length : 0})
                        </p>
                    </div>
                </button>
            </Link>
        </div>
    </nav>
)

export default Nav
