import { useEffect, useState } from "react";
import "../RentedItem/renteditem.css";

export function Renteditem({ setValue, rentPayments, setrentPayments, value, setTotalNumberofBooksinValue}) {
    // const DeleteRentedBook = (prop) => {
    //     setrentPayments((prevState) => (
    //         prevState.map((book) => (
    //             book.bookID === prop ? { ...book, quantity: book.quantity - 1 } : book
    //         )))
    //     )


    //     const newValue = rentPayments.filter((book) => book.bookID !== prop);
    //     setrentPayments(newValue);

    //     setValue((prevState) => (
    //         prevState.map((book) => (
    //             book.id === prop ? { ...book, quantity: book.quantity + 1 } : book
    //         ))
    //     ))
    // }
    useEffect((() => {
        const totalNumberofRentedbooks = rentPayments.reduce((total, book) => total + book.quantity, 0);
        setTotalNumberofBooksinValue(totalNumberofRentedbooks);
    }), [rentPayments])
        
    return (
        <div className="rented-books-wrapper">
            <div className="rented-books-track">
                {rentPayments.map((book) => {
                    return (
                        <div className="rented-card" key={book.bookID}>
                            <div className="image-container">
                                <img src={book.image}></img>
                            </div>
                            <h3>Renting {book.bookName}</h3>
                            <p>Written by {book.authorName}</p>
                            <p>Number of books :- {book.quantity}/p>
                            
                        </div>
                    )
                })}
            </div>
        </div>

    )
}
