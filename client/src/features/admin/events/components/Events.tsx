import { Box } from "@mui/material";
import { useState } from "react";

import { useAdminEvents } from "@features/admin/events/hooks/useAdminEvents";
import CreateEventModal from "./CreateEventModal";
import EventsHeader from "./EventsHeader";
import EventsTable from "./EventsTable";

const Events = () => {
  const { data: events, isLoading, isError } = useAdminEvents();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box className="py-8">
      <EventsHeader count={events?.length} onAdd={() => setModalOpen(true)} />
      <CreateEventModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <EventsTable events={events} isLoading={isLoading} isError={isError} />
    </Box>
  );
};

export default Events;
