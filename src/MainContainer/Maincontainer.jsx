
import { useEffect } from "react";
import "../MainContainer/maincontainer.css";
import { Books } from "../BookList"

const Maincontainer = ({ value, buyItem, rentItem, setTotalNumberofBooksinValue }) => {


    useEffect((() => {

        const totalnumberofbooks = Books.reduce((total, book) => total + book.quantity, 0);
        const totalnumberofbooksinValue = value.reduce((total, book) => total + book.quantity, 0);
        const numberofsoldBooks = totalnumberofbooks - totalnumberofbooksinValue;
        setTotalNumberofBooksinValue(numberofsoldBooks);
    }), [value])
    return (
        <div className="book-shelf">
            {value.map((book) => {
                return (
                    <>
                        {book.quantity > 0 ? (<article key={book.id} className="main-article-container">
                            <div className="img-container">
                                <img src={book.img} alt={book.book_title}></img>
                            </div>
                            <h2>{book.book_title}</h2>
                            <h4>{book.author_name}</h4>
                            <span>Available Books : {book.quantity}</span>

                            <div className="button-container">
                                <button onClick={() => buyItem(book.id)}>Buy</button>
                                <button onClick={() => rentItem(book.id)}>Rent</button>
                            </div>
                        </article >) :
                            (<article key={book.id} className="main-article-container" style={{ position: "relative", opacity: "0.3" }}>
                                <h1 style={{ position: "absolute", top: "46%", left: "26%", color: "red", fontSize: "30px", opacity: "1" }}>Out of Stock</h1>
                                <div className="img-container">
                                    <img src={book.img} alt={book.book_title}></img>
                                </div>
                                <h2>{book.book_title}</h2>
                                <h4>{book.author_name}</h4>
                                <span>Available Books : {book.quantity}</span>
                                <div className="button-container">
                                    <button >Buy</button>
                                    <button >Rent</button>
                                </div>
                            </article>)}



                    </>
                )
            })}
        </div >
    )
}

export default Maincontainer;