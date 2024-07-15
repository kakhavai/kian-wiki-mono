import React from 'react';

const FantasyAbout: React.FC<{ lastUpdated: string }> = async ({
  lastUpdated,
}): Promise<React.JSX.Element> => {
  return (
    <div>
      <h2>About This Data</h2>
      <p>
        This data is gathered from recent football games and processed using
        machine learning algorithms. Please note that this is an alpha version
        and the projections should not be taken too seriously. The data was last
        updated {lastUpdated}.
      </p>
    </div>
  );
};

export default FantasyAbout;
