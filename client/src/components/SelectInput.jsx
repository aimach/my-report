import { Select, MenuItem, Typography } from "@mui/material";

export default function SelectInput({
  label,
  list,
  type,
  visit,
  onChangeFunction,
  selectedItem,
  action,
}) {
  return (
    <>
      {type === "client" && (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          {label}
        </Typography>
      )}
      <Select
        labelId={`${type}Id`}
        id={`${type}Select`}
        value={selectedItem}
        onChange={(event) =>
          onChangeFunction({ ...visit, [type]: event.target.value })
        }
        fullWidth
        sx={{ mt: 2 }}
        required
        disabled={action === "see"}
      >
        <MenuItem key="new" value="new">
          Sélectionner un {type}
        </MenuItem>
        ;
        {list &&
          list.map((element) => {
            return (
              <MenuItem key={element._id} value={element._id}>
                {type === "client" &&
                  element.firstname +
                    " " +
                    element.lastname +
                    " - " +
                    element.address}
                {type === "article" &&
                  element.name + " - " + element.price + "€"}
              </MenuItem>
            );
          })}
      </Select>
    </>
  );
}
