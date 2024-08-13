import PropTypes from "prop-types";
const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
      {children}
    </div>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
