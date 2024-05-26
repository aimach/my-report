import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function SelectInput({
  label,
  list,
  type,
  onChangeFunction,
  selectedItem,
}) {
  return (
    <>
      {type === "client" && <Typography variant="h6">{label}</Typography>}

      <Select
        labelId={`${type}Id`}
        id={`${type}Select`}
        value={selectedItem}
        onChange={(event) => onChangeFunction(event.target.value)}
        fullWidth
      >
        {list &&
          list.map((element) => {
            return (
              <MenuItem key={element._id} value={element._id}>
                {type === "client" &&
                  element.firstname + " " + element.lastname}
                {type === "article" &&
                  element.name + " - " + element.price + "€"}
              </MenuItem>
            );
          })}
      </Select>
    </>
  );
}
