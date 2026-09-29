import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";

interface Props {
  name: string;
}

const DeleteMessage = ({ name }: Props) => (
  <FormattedMessage
    id="shared.delete.message"
    values={{ name: <strong style={{ color: "white" }}>{name}</strong> }}
  />
);

export default DeleteMessage;
