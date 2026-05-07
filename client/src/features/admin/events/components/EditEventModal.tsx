import type { Event } from "@api/events";
import EventForm, { EventFormMode } from "./EventForm";

interface Props {
  open: boolean;
  event: Event;
  onClose: () => void;
}

const EditEventModal = ({ open, event, onClose }: Props) => (
  <EventForm
    mode={EventFormMode.edit}
    open={open}
    onClose={onClose}
    event={event}
  />
);

export default EditEventModal;
