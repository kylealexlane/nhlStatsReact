import PropTypes from "prop-types";

export const portfolioData = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
  gridImage: PropTypes.string.isRequired
});
