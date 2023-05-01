import "../styles/cardComponentStyles.css";

interface CardProps {
  image: string;
  text: string;
}

const Card = ({ image, text }: CardProps) => {
  return (
    <div className="card" data-testid="rental-card">
      <img src={image} alt="Card Image" />
      <div className="card-text">{text}</div>
    </div>
  );
};

export default Card;
