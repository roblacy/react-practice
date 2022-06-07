// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// added this to get rid of warning that env not configured to support act()
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html
globalThis.IS_REACT_ACT_ENVIRONMENT = true;