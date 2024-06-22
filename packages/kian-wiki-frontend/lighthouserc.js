module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn run start',
      url: ['http://localhost:3000'],
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 1 }],
        'categories:accessibility': ['error', { minScore: 1 }],
      },
    },
    upload: {
      // ...
    },
  },
};
