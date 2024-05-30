import { Paper } from "@mui/material";

export default function PaperComponent({ children, height }) {
  const style = {
    backgroundColor: "#fff",
    padding: 3,
    textAlign: "left",
  };
  if (height !== "") style.height = height;
  return <Paper sx={style}>{children}</Paper>;
}
