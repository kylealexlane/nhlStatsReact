import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Typist from 'react-typist';

import { ContentWrapper } from "../../components/ContentWrapper";
import MountainsDark from '../../assets/pngs/mountainsDark.png';

const Wrapper = styled.header`
  ${props => props.theme.flex.center};
  align-items: center;
  color: ${props => props.color || props.theme.colors.mainText};
  background: ${props =>
    props.background || props.theme.colors.mainBackground};
  background-size: contain;
  background-repeat: no-repeat;
  // background-position: 100% 100%;
  // background-image: url(${MountainsDark});
  // height: 200px;
  padding: ${props => props.theme.padding.hundredTwenty} 0
    ${props => props.theme.padding.twentyFour};
  // @media (max-width: ${props => props.theme.breakpoints.md}) {
  //   padding: ${props => props.theme.padding.twentyFour} 0 0;
  // }
`;

const Content = styled(ContentWrapper)`
  ${props => props.theme.flex.spaceBetween};
  flex-direction: row;
`;

const Title = styled.h1`
  padding-bottom: ${props => props.theme.padding.eight};
  text-align: center;
  color: ${props => props.theme.colors.mainText};
`;

const Keywords = styled.h3`
  padding-bottom: ${props => props.theme.padding.twentyFour};
`;

const Description = styled.h4``;

const Header = props => (
  <Wrapper background={props.background} color={props.color}>
    {/*<MountainImage src={MountainsDark}/>*/}
    <Content>
      <React.Fragment>
        <Title>
          <Typist
            cursor={{
              show: true,
              blink: true,
              element: '|',
              hideWhenDone: false,
              hideWhenDoneDelay: 2000,
            }}
            >
            <span>{props.mainHeading} </span>
          </Typist>
        </Title>
        {props.keywords && <Keywords>{props.keywords}</Keywords>}
        {props.description && <Description>{props.description}</Description>}
        {props.children}
      </React.Fragment>
    </Content>
  </Wrapper>
);

Header.propTypes = {
  mainHeading: PropTypes.string.isRequired,
  keywords: PropTypes.string,
  description: PropTypes.string,
  background: PropTypes.func,
  color: PropTypes.func,
  children: PropTypes.node
};

Header.defaultProps = {
  keywords: "",
  description: "",
  background: () => {},
  color: () => {},
  children: null
};

export default Header;
