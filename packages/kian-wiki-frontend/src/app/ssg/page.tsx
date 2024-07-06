import React from 'react';

// /app/ssg/page.tsx
export default function SsgPage(): React.JSX.Element {
  const time: string = new Date().toISOString();

  return (
    <div>
      <h1>Static Generation Page</h1>
      <p>Time: {time}</p>
    </div>
  );
}
