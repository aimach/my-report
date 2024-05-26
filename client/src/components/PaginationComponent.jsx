import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationComponent({
  pageNb,
  currentPage,
  setCurrentPage,
}) {
  return (
    <Stack
      spacing={2}
      sx={{
        pt: { xs: 8, sm: 8 },
      }}
    >
      <Pagination
        count={pageNb}
        page={currentPage}
        color="primary"
        onChange={(_, page) => setCurrentPage(page)}
      />
    </Stack>
  );
}
