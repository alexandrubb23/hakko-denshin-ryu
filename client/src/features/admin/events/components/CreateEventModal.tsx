import EventForm, { EventFormMode } from "./EventForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateEventModal = ({ open, onClose }: Props) => (
  <EventForm mode={EventFormMode.create} open={open} onClose={onClose} />
);

export default CreateEventModal;
