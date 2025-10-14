import "../RentedItem/rentingtimecontainer.css";
import { RxCross1 } from "react-icons/rx";
export const RentingTimeContainer = ({ bookID, rentingTimePeriod, rentingPeriod, setrentingPeriod, closeDownRentTPContainer }) => {

    return (
        <div className="rent-timeperiod">
            <div className="details">
                <h1>Rent-Timeperiod</h1>
                <h3>How long do you want to keep this book with you?</h3>
                <form onSubmit={(e) => rentingTimePeriod(e, bookID)}>
                    <input className="time-period" type="number" value={rentingPeriod} onChange={(e) => setrentingPeriod(e.target.value)}></input>
                    <button className="tp-button">submit</button>
                </form>
                <h5>**we have a allowance period of 5 months, can't give you the allowance to hold this book for more than 5 months.Need to pay 10% of book price as a security fee.</h5>
            </div>
            <div className="cross-icon" onClick={() => closeDownRentTPContainer(bookID)}>
                <RxCross1 />
            </div>
        </div>
    )
}