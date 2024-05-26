import { Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DateSelect({ selectedDate, setSelectedDate }) {
  return (
    <>
      <Typography variant="h6">Date du rendez-vous</Typography>
      <DatePicker
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        minDate={new Date()}
      />
    </>
  );
}
