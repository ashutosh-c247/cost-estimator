import PropTypes from "prop-types";
const MainLayout = ({ children }) => (
  <div className="p-8 bg-gray-100 flex items-center justify-center site-wrapper ">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl ">
      {children}
    </div>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
