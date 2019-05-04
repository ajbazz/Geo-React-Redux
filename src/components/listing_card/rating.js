import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  StarRating
} from '../styles';

const Stars = styled.div`
  padding: 0;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 0;
`;

const StarTopLayer = styled(Stars)`  
  color: #00cdbe;
  z-index: 1;
  width: ${props => props.percent};
`;

const StarText = styled.span`
  font-size: 12px;
  color: #9c9c9c;
  font-weight: bold;
`;

const Rating = ({ rated, ratedPercent, clazz }) => (
    <StarRating className={clazz}>
      <StarTopLayer percent={ratedPercent}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></StarTopLayer>
      <Stars><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><StarText>{rated}</StarText></Stars>
    </StarRating>
);

Rating.propTypes = {
  rated: PropTypes.string,
  ratedPercent: PropTypes.string,
  clazz: PropTypes.string
};

Rating.defaultProps = {
  rated: "0",
  ratedPercent: "0%",
  clazz: ""
};

export default Rating;
