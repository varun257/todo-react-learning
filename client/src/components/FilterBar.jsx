import { Button, Chip, Stack, TextField } from '@mui/material';

const filterConfig = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

function FilterBar({ filter, searchTerm, onFilterChange, onSearchChange, onClearCompleted }) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {filterConfig.map((item) => (
          <Chip
            key={item.value}
            label={item.label}
            color={filter === item.value ? 'primary' : 'default'}
            onClick={() => onFilterChange(item.value)}
            clickable
          />
        ))}
      </Stack>

      <TextField
        size="small"
        label="Search todos"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        sx={{ flexGrow: 1 }}
      />

      <Button color="secondary" variant="outlined" onClick={onClearCompleted}>
        Clear Completed
      </Button>
    </Stack>
  );
}

export default FilterBar;
