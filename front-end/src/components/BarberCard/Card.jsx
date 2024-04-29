import "./card.css"

const Card = (props) => {
    return (
        <div className={props.color === "dark" ? 'barbers__column dark' : 'barbers__column'} onClick={props.onClick}
             key={props.barber.id}>
            <img src={props.barber.avatar} alt=""/>
            <h3 className='barbers__name'>{props.barber.name}</h3>
            <div className='barbers__workingTime'>
                <span>{props.barber.from_to}</span>
            </div>
        </div>
    );
};

export default Card;