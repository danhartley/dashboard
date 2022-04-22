module.exports = {
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
};

// See: https://www.smashingmagazine.com/2020/07/react-apps-testing-library/