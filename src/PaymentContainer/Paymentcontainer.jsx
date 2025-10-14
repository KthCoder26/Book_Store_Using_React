import "../PaymentContainer/paymentcontainer.css";
import { RxCross1 } from "react-icons/rx";
import { FaAngleDoubleLeft } from "react-icons/fa";

function PaymentContainer({ setGoBacktoPurchaseContainer, setGoBacktoMainContainer, setIsPaymentContainerOpened, goBacktoPurchaseContainer, goBacktoMainContainer, totalAmount, setopenedCI }) {

    const GotoPurchaseContainer = () => {
        setopenedCI(true);
        setGoBacktoMainContainer(false);

    }

    const GotoMainContainer = () => {
        setopenedCI(false);
        setIsPaymentContainerOpened(false);
        setGoBacktoMainContainer(true);
    }

    return (
        <div className="payment-container">
            <div className="sign-container">
                <div className="left-sign-container" onClick={() => GotoPurchaseContainer()}>
                    <FaAngleDoubleLeft />
                </div>
                <div className="cross-sign-container" onClick={() => GotoMainContainer()}>
                    <RxCross1 />
                </div>
            </div>
            <h1>Total Amount you need to Pay is ${totalAmount}. </h1>
            <h3>We would like to see you again in our Book Store. Thank you for visiting our Store.</h3>
        </div>
    )
}

export default PaymentContainer;