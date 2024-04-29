import "./background.css"
import mainBG from "../../assets/MainBackground.jpg"
const Background = () => {
    return (
        <div className="main_background">
            <span>
                <h2>It’s TrimTime!</h2>
                <h2>Book your Trim</h2>
            </span>
            <div className="background_image">
                <img src={mainBG} alt=""/>
            </div>
        </div>
    );
};
export default Background;