import Maincontainer from "./MainContainer/Maincontainer";
import Navbar from "./Navbar/Navbar";
import { useEffect, useState } from "react";
import { Purchaseditem } from "./PurchasedItem/Purchaseditem";
import { Renteditem } from "./RentedItem/Renteditem";
import { Books } from "./BookList";
import { RentingTimeContainer } from "./RentedItem/RentingTimeContainer";
import PaymentContainer from "./PaymentContainer/Paymentcontainer";
function App() {

    const [openedRI, setopenedRI] = useState(false);
    const [openedCI, setopenedCI] = useState(false);
    // const [IsmainContainerOpened, setMainContainer] = useState(true);
    // const [closeCIBox, setcloseCIBox] = useState(false);
    const [closedRentTPContainer, setClosedDownRentTPContainer] = useState(true);
    const [value, setValue] = useState(Books);
    const [rentingPeriod, setrentingPeriod] = useState("");
    // const [rented_books, setRentedBooks] = useState([]);
    const [bookID, setBookID] = useState();
    const [Issubmitted, setIssubmitted] = useState(false);
    const [purchased_books, setPurchasedbooks] = useState([]);
    const [rentPayments, setrentPayments] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [ispaymentContainerOpened, setIsPaymentContainerOpened] = useState(false);
    const [goBacktoPurchaseContainer, setGoBacktoPurchaseContainer] = useState(true);
    const [goBacktoMainContainer, setGoBacktoMainContainer] = useState(true);
    const [TotalNumberofPurchasedBooks, setTotalNumberofPurchasedBooks] = useState(0);
    const [TotalNumberofRentedbooks, setTotalNumberofRentedbooks] = useState(0);
    const [TotalNumberofBooksinValue, setTotalNumberofBooksinValue] = useState(0);

    function openRentedItem() {
      if(openedRI === false){
        // setMainContainer(false);
        setopenedRI(true);
        setopenedCI(false);
      }
      else{
        // setMainContainer(true);
        setopenedRI(false);
      }
    }
    function openCartItem() {
        if(openedCI === false){
          setopenedCI(true);
          setopenedRI(false);
        }
        else{
          setopenedCI(false);
        }
    }

     function buyItem(prop) {
        
        (closedRentTPContainer && setValue((prevState) => (
          prevState.map((book)=> (
            book.id === prop ? {...book, quantity: book.quantity > 0 ? book.quantity - 1 : 0 } : book
          ))
        )))

        // here, we're seeing how to use if/else statement inside usestate function.
        (closedRentTPContainer && setPurchasedbooks((prevState) => {
          const existingIndex = prevState.findIndex((book) => book.bookID === prop);

          if(existingIndex !== -1){
            const UpdatedValues = [...prevState];
            UpdatedValues[existingIndex] = {
              ...UpdatedValues[existingIndex],
              quantity : UpdatedValues[existingIndex].quantity + 1,
              amount: UpdatedValues[existingIndex].amount * (UpdatedValues[existingIndex].quantity + 1),
            }
            return UpdatedValues;
          }
          else{
            return[
              ...prevState,
              {
                bookID : Books[prop-1].id,
                authorName : Books[prop - 1].author_name,
                bookName : Books[prop-1].book_title,
                quantity : 1,
                amount: Books[prop-1].amount,
                image: Books[prop-1].img,
              }
            ] 
          }
        }));
    }

    function rentItem(prop) {
      setClosedDownRentTPContainer(false);
      
        (closedRentTPContainer && setValue((prevState) => (
            prevState.map((book) => (
                book.id === prop ? { ...book, quantity: book.quantity > 0 ? book.quantity - 1 : 0 } : book
            ))
        )))

        setBookID(prop);
        setrentingPeriod("");
        
        (closedRentTPContainer && setrentPayments((prevState) => {
          const existingIndex = prevState.findIndex((book) => book.bookID === prop);

          if(existingIndex !== -1) // -1 means hasn't found any index value which means no value similar to that prop exist
          {
            const UpdatedValues = [...prevState]; // first need to update the value
            const Newquantity = UpdatedValues[existingIndex].quantity + 1;
            UpdatedValues[existingIndex] = {
              ...UpdatedValues[existingIndex],
              quantity: Newquantity,
              amount : (UpdatedValues[existingIndex].amount * 0.1) + UpdatedValues[existingIndex].quantity +1,
            }
            return UpdatedValues;
          }
          else{

            return [
              ...prevState,
              {
                bookID : Books[prop-1].id,
                authorName : Books[prop - 1].author_name,
                bookName : Books[prop-1].book_title,
                quantity : 1,
                period: 0,
                amount: Books[prop-1].amount * 0.1,
                image: Books[prop-1].img,
              }
            ]
            
          }
        }))

    }

    function ClosePurchaseItemBox(){
        setopenedCI(false);
        setIsPaymentContainerOpened(false);
        setGoBacktoMainContainer(true);
    }
    function closeDownRentTPContainer(prop) {
        if(rentingPeriod === "" ){
          setClosedDownRentTPContainer(true);
          const filteredRentedItems = rentPayments.filter((book) => book.bookID !== prop);
          setrentPayments(filteredRentedItems);
          setValue((prevState)=> (
            prevState.map((book) => (
              book.id === prop ? {...book, quantity: book.quantity + 1} : book
            ))
          ))
        }
        else if(!Issubmitted){
          alert("Need to click submit button first before clicking the cross button");
        }
        else{
          setClosedDownRentTPContainer(true);
        }
    }

    function rentingTimePeriod(e, bookID) {
        e.preventDefault();
        let value = Number(rentingPeriod);

        if (value > 0 && value < 6) {
            // value = 0;
            // console.log(rentPayments[bookID].period)
            setClosedDownRentTPContainer(true);
            
        }
        else if(value !== NaN){
            alert("we have only allowance period of 5 months");
        }
    }

    useEffect(() => {
      if (bookID ) {
        // let value = Number(rentingPeriod);
        setrentPayments((prevState) =>
        prevState.map((book) =>
        book.bookID === bookID ? 
        { ...book, 
        period: Number(rentingPeriod), 
        } : book
      )
    );
  }
}, [bookID, rentingPeriod]);

    let content = "";

    if(!closedRentTPContainer){
      content = (
        <>
          <Maincontainer  value={value} buyItem={buyItem} rentItem={rentItem}   setTotalNumberofBooksinValue={setTotalNumberofBooksinValue}/>
          <RentingTimeContainer bookID={bookID}  rentingTimePeriod={rentingTimePeriod} rentingPeriod={rentingPeriod} setrentingPeriod={setrentingPeriod} closeDownRentTPContainer={closeDownRentTPContainer}/>
        </>
      )
    }
    else if(openedRI){
      content= <Renteditem setValue={setValue} rentPayments={rentPayments} setrentPayments={setrentPayments} value={value}/>
    }
    else if(openedCI){
      content = <Purchaseditem ClosePurchaseItemBox={ClosePurchaseItemBox} purchased_books={purchased_books}  setPurchasedbooks={setPurchasedbooks}  rentPayments={rentPayments} setrentPayments={setrentPayments} value={value} setValue={setValue} setTotalAmount={setTotalAmount} setIsPaymentContainerOpened={setIsPaymentContainerOpened}  setTotalNumberofRentedbooks={setTotalNumberofRentedbooks} setTotalNumberofPurchasedBooks={setTotalNumberofPurchasedBooks} setopenedCI={setopenedCI}/>
    }
    else if( ispaymentContainerOpened){
      content = <PaymentContainer setGoBacktoPurchaseContainer={setGoBacktoPurchaseContainer} setGoBacktoMainContainer={setGoBacktoMainContainer} setIsPaymentContainerOpened={setIsPaymentContainerOpened} goBacktoPurchaseContainer={goBacktoPurchaseContainer} goBacktoMainContainer={goBacktoMainContainer}  totalAmount={totalAmount} setopenedCI={setopenedCI}/>   
          
    } 
    else if(goBacktoMainContainer){
      content = <Maincontainer value={value} buyItem={buyItem} rentItem={rentItem} setTotalNumberofBooksinValue={setTotalNumberofBooksinValue}/>
    } 
    else if(goBacktoPurchaseContainer){
      content = <Purchaseditem ClosePurchaseItemBox={ClosePurchaseItemBox} purchased_books={purchased_books}  setPurchasedbooks={setPurchasedbooks}  rentPayments={rentPayments} setrentPayments={setrentPayments} value={value} setValue={setValue} setTotalAmount={setTotalAmount} setIsPaymentContainerOpened={setIsPaymentContainerOpened}  setTotalNumberofRentedbooks={setTotalNumberofRentedbooks} setTotalNumberofPurchasedBooks={setTotalNumberofPurchasedBooks} setopenedCI={setopenedCI}/>
    }
    else {
      content = <Maincontainer  value={value} setValue={setValue} buyItem={buyItem} rentItem={rentItem}  setTotalNumberofBooksinValue={setTotalNumberofBooksinValue}/>
    }

  return (
    <div className="App">
      <Navbar openRentedItem={openRentedItem} openCartItem={openCartItem} TotalNumberofPurchasedBooks={TotalNumberofPurchasedBooks} TotalNumberofRentedbooks={TotalNumberofRentedbooks} TotalNumberofBooksinValue={TotalNumberofBooksinValue} openedCI={openedCI}/>
      {content }
    </div>
  )
}

export default App;
