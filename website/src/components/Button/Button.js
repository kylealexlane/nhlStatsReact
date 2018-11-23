import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  border-radius: 5px;
  padding: ${props => props.theme.padding.eight}
    ${props => props.theme.padding.sixteen};
  letter-spacing: 0.5px;
  transition: 0.3s all;
  cursor: pointer;
`;

const StyledPrimaryButton = StyledButton.extend`
  color: ${props => props.theme.colors.mainText};
  background-color: ${props => props.theme.colors.mainBackground};
  border-color: ${props => props.theme.colors.mainText};
  margin-right: 4px;
  margin-left: 4px;
  :hover,
  :focus,
  :active {
    background-color: ${props => props.theme.colors.mainText};
    // border-color: ${props => props.theme.colors.mainText};
    color: ${props => props.theme.colors.mainBackground};
  }
`;

const StyledBorderButton = styled.button`
  padding: ${props => props.theme.padding.eight}
    ${props => props.theme.padding.sixteen};
  letter-spacing: 0.5px;
  transition: 0.3s all;
  cursor: pointer;
  color: ${props => props.theme.colors.mainText};
  background-color: transparent;
  border-color: ${props => props.theme.colors.secondaryText};
  border-right-color: ${props => props.theme.colors.secondaryText};
  border-left-color: ${props => props.theme.colors.secondaryText};
  border-width: 0px;
  border-right-width: ${props => props.middleButton ? '1px': '0px'};
  border-left-width: ${props => props.middleButton ? '1px': '0px'};
  border-style: solid;
  :hover,
  :focus,
  :active {
    background-color: ${props => props.theme.colors.mainText};
    border-radius: 0px;
    border-color: ${props => props.theme.colors.mainText};
    color: ${props => props.theme.colors.mainBackground};
  }
`;

const StyledSecondaryButton = StyledButton.extend``;

const StyledDefaultButton = StyledButton.extend`
  color: ${props => props.theme.colors.text.black};
  background-color: ${props => props.theme.colors.background.white};
  :hover,
  :focus,
  :active {
    color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const PrimaryButton = props => (
  <StyledPrimaryButton type="primary" size="large">
    {props.children}
  </StyledPrimaryButton>
);

const BorderButton = props => (
  <StyledBorderButton middleButton={props.middleButton} size="large">
    {props.children}
  </StyledBorderButton>
);

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired
};

const SecondaryButton = props => (
  <StyledSecondaryButton size="large">{props.children}</StyledSecondaryButton>
);

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired
};

const DefaultButton = props => (
  <StyledDefaultButton size="large">{props.children}</StyledDefaultButton>
);

DefaultButton.propTypes = {
  children: PropTypes.node.isRequired
};

export { PrimaryButton, SecondaryButton, DefaultButton, BorderButton };
