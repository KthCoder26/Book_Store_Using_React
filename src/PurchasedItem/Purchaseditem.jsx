import { RxCross1 } from "react-icons/rx";
import "../PurchasedItem/purchaseditem.css"
import { useEffect } from "react";

export function Purchaseditem({ ClosePurchaseItemBox, purchased_books, setPurchasedbooks, rentPayments, setrentPayments, value, setValue, setTotalAmount, setIsPaymentContainerOpened, setTotalNumberofPurchasedBooks, setTotalNumberofRentedbooks, setopenedCI }) {


    const IncreaseAmount = (prop) => {

        setPurchasedbooks((prevState) => (
            prevState.map((book) => {
                if (book.bookID === prop) {
                    const availableBooks = (value[prop - 1].quantity);
                    if (book.quantity <= availableBooks) {
                        const newQuantity = book.quantity + 1;
                        return {
                            ...book,
                            quantity: newQuantity,
                            amount: (book.amount / book.quantity) * newQuantity,
                        }
                    }
                }
                return book;
            })
        ))


        setValue((prevState) => (
            prevState.map((book) => {
                if (book.id === prop) {
                    if (book.quantity > 0) {
                        return {
                            ...book,
                            quantity: book.quantity - 1,
                        }
                    }
                }
                return book;
            })
        ))

    }

    const DecreaseAmount = (prop) => {
        setPurchasedbooks((prevState) => (
            prevState.map((book) => {
                if (book.bookID === prop) {
                    if (book.quantity > 0) {
                        const Newquantity = book.quantity - 1;
                        return {
                            ...book,
                            quantity: Newquantity,
                            amount: (book.amount / book.quantity) * Newquantity,
                        }
                    }
                }
                return book;
            })
        ))

        setValue((prevState) => (
            prevState.map((book) => (
                book.id === prop ? { ...book, quantity: book.quantity + 1 } : book
            ))
        ))
        setPurchasedbooks((prevState) => (
            prevState.filter((book) => book.quantity !== 0)
        ))

    }

    const IncreaseREPAAmount = (prop) => {

        setValue((prevState) => {
            return prevState.map((book) => {
                if (book.id === prop && book.quantity > 0) {
                    return {
                        ...book,
                        quantity: book.quantity - 1,
                    }
                }
                return book;
            })
        })

        setrentPayments((prevState) => {
            return prevState.map((book) => {
                const availableBooks = value[prop - 1].quantity;
                console.log(availableBooks, book.quantity);
                if (book.bookID === prop && availableBooks > 0) {
                    const rent_of_per_book = (book.amount / book.quantity);
                    const new_quantity = book.quantity + 1;
                    console.log(new_quantity, rent_of_per_book);
                    return {
                        ...book,
                        quantity: new_quantity,
                        amount: rent_of_per_book * new_quantity,
                    }
                }
                return book;
            })
        })
    }

    function DecreaseREPAAmount(prop) {

        setrentPayments((prevState) => {
            return prevState.map((book) => {
                // const availableBooks = value[prop -1].quantity
                if (book.bookID === prop && book.quantity > 0) {
                    const new_quantity = book.quantity - 1;
                    const rent_of_per_book = (book.amount / book.quantity) * new_quantity
                    return {
                        ...book,
                        quantity: new_quantity,
                        amount: rent_of_per_book,
                    }
                }
                return book;
            })
        })

        setValue((prevState) => (
            prevState.map((book) => (
                book.id === prop ? { ...book, quantity: book.quantity + 1 } : book
            ))
        ))
        setrentPayments((prevState) => (
            prevState.filter((book) => book.quantity !== 0)
        ))
    }
    const PaytheAmount = () => {
        setIsPaymentContainerOpened(true);
        setopenedCI(false);
    }

    useEffect((() => {
        const total_purchase_amount = purchased_books.reduce((total, book) => total + book.amount, 0);
        const rentAmount = rentPayments.reduce((acc, book) => acc + book.amount, 0);
        const total = total_purchase_amount + rentAmount;
        setTotalAmount(total);
        const TotalNumberofPurchasedbooks = purchased_books.reduce((total, book) => total + book.quantity, 0);
        const totalNumberofRentedbooks = rentPayments.reduce((total, book) => total + book.quantity, 0);
        setTotalNumberofPurchasedBooks(TotalNumberofPurchasedbooks);
        setTotalNumberofRentedbooks(totalNumberofRentedbooks);
        console.log(TotalNumberofPurchasedbooks, totalNumberofRentedbooks);
    }), [purchased_books, rentPayments])



    return (
        <div className="purchase-rentpayment-container">
            <div className="sign-container">
                <div className="sign-icon" onClick={() => ClosePurchaseItemBox()}>
                    <RxCross1 />
                </div>
            </div>
            {purchased_books.length > 0 && <div className="purchase-container">
                <div className="heading">
                    <h1>Purchased Items</h1>
                </div>
                <div className="purchased-items">
                    {purchased_books.map((book) => {
                        return (
                            <div className="purchased-item">
                                <div className="image-container">
                                    <img src={book.image} alt={book.bookName}></img>
                                </div>
                                <h2>Book Name: {book.bookName}</h2>
                                <h3>Writer: {book.authorName}</h3>
                                <h4 className="total-price">Total Price: ${book.amount}</h4>
                                <div className="button-div">
                                    <button className="button-1" onClick={() => IncreaseAmount(book.bookID)}>+</button>
                                    <span>{book.quantity}</span>
                                    <button className="button-1" onClick={() => DecreaseAmount(book.bookID)}>-</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>}
            {rentPayments.length > 0 && <div className="rentpayment-container">
                <div className="heading">
                    <h1>Rented Items</h1>
                </div>
                <div className="rentpayment-items">
                    {rentPayments.map((book) => {
                        return (
                            <div className="rentpayment-item">
                                <div className="image-container">
                                    <img src={book.image} alt={book.bookName}></img>
                                </div>
                                <h2>Book Name: {book.bookName}</h2>
                                <h3>Writer: {book.authorName}</h3>
                                <h4>Total Price: ${book.amount}</h4>
                                <div className="button-div">
                                    <button className="button-1" onClick={() => IncreaseREPAAmount(book.bookID)}>+</button>
                                    <span>{book.quantity}</span>
                                    <button className="button-1" onClick={() => DecreaseREPAAmount(book.bookID)}>-</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>}
            {(rentPayments.length > 0 || purchased_books.length > 0) && <footer className="pay-button-container">
                <button className="pay-button" onClick={() => PaytheAmount()}>Click here to Pay</button>
            </footer>}
        </div >
    )
}