import { FaBook } from "react-icons/fa";
import { FaCartFlatbed } from "react-icons/fa6";
import "../Navbar/navbar.css"

function Navbar({ openCartItem, openRentedItem, TotalNumberofPurchasedBooks, TotalNumberofRentedbooks, TotalNumberofBooksinValue, openedCI }) {


    return (
        <nav>
            <h2>Book Store</h2>
            <div className="nav-container">
                <div className="rent-box">
                    <FaBook onClick={() => openRentedItem()} className="book-icon" />
                </div>
                <div className="purchase-box">
                    <FaCartFlatbed onClick={() => openCartItem()} className="cart-icon" />
                    {openedCI ? ((TotalNumberofRentedbooks + TotalNumberofPurchasedBooks) === 0 ? <p className="purchase-quantity"></p> : <p className="purchase-quantity">{TotalNumberofRentedbooks + TotalNumberofPurchasedBooks}</p>) : (TotalNumberofBooksinValue === 0 ? <p className="purchase-quantity"></p> : <p className="purchase-quantity">{TotalNumberofBooksinValue}</p>)}
                </div>

            </div>
        </nav>
    )
}

export default Navbar;