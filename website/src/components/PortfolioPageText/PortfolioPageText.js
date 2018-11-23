import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Text = styled.p``;

const Group = styled.div`
  margin-bottom: ${props => props.theme.padding.thirtyTwo};
`;

const Heading = styled.h3`
  margin-bottom: ${props => props.theme.padding.sixteen};
`;

const SubHeading = styled.h4`
  margin-bottom: ${props => props.theme.padding.eight};
`;

const MainText = props => <Text>{props.children}</Text>;

MainText.propTypes = {
  children: PropTypes.node.isRequired
};

const TextGroup = props => (
  <Group>
    <Heading>{props.heading}</Heading>
    {props.children}
  </Group>
);

TextGroup.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.node.isRequired
};

TextGroup.defaultProps = {
  heading: ""
};

const MainTextSubHeading = props => <SubHeading>{props.children}</SubHeading>;

MainTextSubHeading.propTypes = {
  children: PropTypes.node.isRequired
};

export { MainText, TextGroup, MainTextSubHeading };
