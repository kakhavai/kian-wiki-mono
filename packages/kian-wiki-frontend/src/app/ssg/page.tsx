import Layout from '../../components/common/Layout';
import LiveClock from '../../components/LiveClock';

interface ISSGPageProps {
  params: { time: string };
}

// The page component itself
export default function SSGPage({ params }: ISSGPageProps): JSX.Element {
  return (
    <Layout>
      <h1>Static Site Generation (SSG) Page</h1>
      <p>This page was generated at build time: {params.time}</p>
      <LiveClock />
    </Layout>
  );
}

// This function runs at build time to generate the static params
export function generateStaticParams(): [{ time: string }] {
  return [{ time: new Date().toISOString() }]; // Empty array because we're not generating dynamic routes
}
