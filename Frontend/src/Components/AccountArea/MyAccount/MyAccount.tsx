import OrderHistory from "../OrderHistory/OrderHistory";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import "./MyAccount.css";

function MyAccount(): JSX.Element {
    return (
        <div className="MyAccount">
			<>
            <PersonalInfo></PersonalInfo>
            <hr></hr>
            <OrderHistory></OrderHistory>
            </>
        </div>
    );
}

export default MyAccount;
