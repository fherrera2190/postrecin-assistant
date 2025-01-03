interface Props {
  name: string;
  category: string;
}

export const CardBody = ({ name, category }: Props) => {
  return (
    <div className="card__body">
      <p>
        <small className="card__category">{category}</small>
      </p>
      <h5 className="card__name">{name}</h5>
    </div>
  );
};
