import { Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DateSelect({ selectedDate, visit, setVisit, id }) {
  return (
    <>
      <Typography variant="h6">Date du rendez-vous</Typography>
      <DatePicker
        value={selectedDate}
        onChange={(newValue) => setVisit({ ...visit, date: newValue })}
        minDate={id === "new" ? new Date() : null}
      />
    </>
  );
}
