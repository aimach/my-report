import { Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function DateSelectComponent({
  selectedDate,
  visit,
  setVisit,
  action,
}) {
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Date du rendez-vous
      </Typography>
      <DateCalendar
        value={selectedDate}
        onChange={(newValue) => setVisit({ ...visit, date: newValue })}
        required
        views={["month", "day"]}
        disabled={action === "see"}
      />
    </>
  );
}
