import CreatePromotion from "../CreatePromotion/CreatePromotion";
import PromotionList from "../PromotionList/PromotionList";
import "./Promotions.css";

function Promotions(): JSX.Element {
    return (
        <div className="Promotions scrollbar">
			<CreatePromotion></CreatePromotion>
            <PromotionList></PromotionList>
        </div>
    );
}

export default Promotions;
