export default {
  testEnvironment: 'jsdom', 
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Ігнорування стилів (не працює)
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};
