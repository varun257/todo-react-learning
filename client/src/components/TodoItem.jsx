import { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function TodoItem({ todo, onToggle, onDelete, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(todo.id, { title: title.trim(), description: description.trim(), completed: todo.completed });
    setIsEditing(false);
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 170 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
            <Chip
              size="small"
              label={todo.completed ? 'Completed' : 'Active'}
              color={todo.completed ? 'success' : 'primary'}
            />
          </Stack>
          <Typography variant="caption">{new Date(todo.updatedAt).toLocaleString()}</Typography>
        </Stack>

        {isEditing ? (
          <Stack spacing={1}>
            <TextField size="small" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextField
              size="small"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
        ) : (
          <>
            <Typography variant="h6" sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {todo.description || 'No description'}
            </Typography>
          </>
        )}
      </CardContent>

      <CardActions>
        {isEditing ? (
          <Button onClick={handleSave} variant="contained" size="small">
            Save
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)} size="small">
            Edit
          </Button>
        )}
        <Button color="error" onClick={() => onDelete(todo.id)} size="small">
          Delete
        </Button>
        <Button size="small" component={RouterLink} to={`/todos/${todo.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default TodoItem;
