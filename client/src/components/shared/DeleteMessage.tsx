interface Props {
  name: string;
}

const DeleteMessage = ({ name }: Props) => (
  <>
    Are you sure you want to delete{" "}
    <strong style={{ color: "white" }}>{name}</strong>? This action cannot be
    undone.
  </>
);

export default DeleteMessage;
