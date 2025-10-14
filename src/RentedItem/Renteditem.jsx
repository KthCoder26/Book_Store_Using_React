import { useEffect, useState } from "react";
import "../RentedItem/renteditem.css";

export function Renteditem({ setValue, rentPayments, setrentPayments, value }) {
    const DeleteRentedBook = (prop) => {
        setrentPayments((prevState) => (
            prevState.map((book) => (
                book.bookID === prop ? { ...book, quantity: book.quantity - 1 } : book
            )))
        )


        const newValue = rentPayments.filter((book) => book.bookID !== prop);
        setrentPayments(newValue);

        setValue((prevState) => (
            prevState.map((book) => (
                book.id === prop ? { ...book, quantity: book.quantity + 1 } : book
            ))
        ))
    }
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
                            <button className="delete-rented-book" onClick={() => DeleteRentedBook(book.bookID)}>Delete Item</button>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}