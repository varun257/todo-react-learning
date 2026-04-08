import { useRef, useState } from 'react';
import { Button, Card, CardContent, Stack, TextField } from '@mui/material';

function TodoInput({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // useRef gives direct access to DOM element for autofocus behavior.
  const titleInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      titleInputRef.current?.focus();
      return;
    }

    onCreate({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
    titleInputRef.current?.focus();
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              inputRef={titleInputRef}
              required
              label="Todo title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              sx={{ flex: 1 }}
            />
            <TextField
              label="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              sx={{ flex: 2 }}
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}

export default TodoInput;
