import React, { useState } from 'react';

export default function Screen4() {
  const [count, setCount] = useState(0);

  return (
    <document>
      <alertTemplate>
        <text style={{ tvTextStyle: 'title2' }}>Count: {count}</text>
        <text>Counter implemented with React Hooks</text>
        <button onSelect={() => setCount(count + 1)}>
          <text>+1</text>
        </button>
      </alertTemplate>
    </document>
  );
}
