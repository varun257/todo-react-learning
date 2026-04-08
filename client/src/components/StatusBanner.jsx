import { Alert, Snackbar } from '@mui/material';

function StatusBanner({ error, onClose }) {
  return (
    <Snackbar open={Boolean(error)} autoHideDuration={3500} onClose={onClose}>
      <Alert onClose={onClose} severity="error" variant="filled" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
}

export default StatusBanner;
