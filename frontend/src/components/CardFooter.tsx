interface Props {
  price: number;
}

export const CardFooter = ({ price }: Props) => {
  return (
    <div className="card__footer">
      <h5 className="card__price">
        <b>${price}</b>
      </h5>
    </div>
  );
};
