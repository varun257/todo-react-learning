import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import TodoItem from './TodoItem';

describe('TodoItem', () => {
  it('calls toggle when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(
      <MemoryRouter>
        <TodoItem
          todo={{
            id: '1',
            title: 'Learn Redux',
            description: 'Practice slice',
            completed: false,
            updatedAt: new Date().toISOString(),
          }}
          onToggle={onToggle}
          onDelete={vi.fn()}
          onSave={vi.fn()}
        />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith('1');
  });
});
