import React from 'react';
import Layout from '../../components/Layout';
import LiveClock from '../../components/LiveClock';

async function fetchTime(): Promise<string> {
  return new Date().toISOString();
}

export default async function SSRPage(): Promise<JSX.Element> {
  const time: string = await fetchTime();
  return (
    <Layout>
      <h1>Server-Side Rendering (SSR) Page</h1>
      <p>This page was rendered on the server at: {time}</p>
      <LiveClock />
    </Layout>
  );
}
