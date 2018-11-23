import React from "react";
import styled, { keyframes } from "styled-components";
import { fadeInRight, fadeInLeft, fadeOutLeft, fadeOutRight } from 'react-animations';
import IpadMMS from '../../assets/oldImages/IpadMMSTasks.png';

const width = window.outerWidth <= 300 ? 150 : 250;
const height = width * 1.51;
const multiplier = 1.7;
const timer = 1000;

const Wrapper = styled.div`
  height: ${height*multiplier}px;
  width: ${width*multiplier}px;
  margin-top: 32px;
  margin-bottom: 32px;
`;

const Phone = styled.img`
  width: 100%;
  height: 100%;
  // @media (max-width: ${props => props.theme.breakpoints.sm}) {
  //   width: 50%;
  //   margin-bottom: ${props => props.theme.padding.sixteen};
  // }
`;

const fadeInAnimationRight = keyframes`${fadeInRight}`;

const FadeInAnimationRight = styled.div`
  ${props => props.theme.flex.flexColumnCenter};
  animation: ${timer/1000}s ${fadeInAnimationRight};
`;

const fadeOutAnimationRight = keyframes`${fadeOutRight}`;

const FadeOutAnimationRight = styled.div`
  ${props => props.theme.flex.flexColumnCenter};
  animation: ${timer/1000}s ${fadeOutAnimationRight};
`;

const fadeOutAnimationLeft = keyframes`${fadeOutLeft}`;

const FadeOutAnimationLeft = styled.div`
  ${props => props.theme.flex.flexColumnCenter};
  animation: ${timer/1000}s ${fadeOutAnimationLeft};
`;

const fadeInAnimationLeft = keyframes`${fadeInLeft}`;

const FadeInAnimationLeft = styled.div`
  ${props => props.theme.flex.flexColumnCenter};
  animation: ${timer/1000}s ${fadeInAnimationLeft};
`;

class Ipad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animLeft: this.props.animation === 'left' ? true : false,
      fadeOut: false,
      pic: this.props.pic ? this.props.pic : IpadMMS,
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.pic !== this.props.pic) {
      this.setState({ fadeOut: true });
      setTimeout(() => {
        this.setState({ fadeOut: false, pic: nextProps.pic });
      }, timer);

    }
  }

  render() {
    return (
      <Wrapper>
        {this.state.animLeft ?
          this.state.fadeOut ?
            <FadeOutAnimationLeft>
              <Phone src={this.state.pic}/>
            </FadeOutAnimationLeft>
            :
            <FadeInAnimationLeft>
              <Phone src={this.state.pic}/>
            </FadeInAnimationLeft>
          :
          this.state.fadeOut ?
            <FadeOutAnimationRight>
              <Phone src={this.state.pic}/>
            </FadeOutAnimationRight>
            :
            <FadeInAnimationRight>
              <Phone src={this.state.pic}/>
            </FadeInAnimationRight>
        }
      </Wrapper>
    );
  }
}



// const MobilePhone = props => (
//   <Wrapper>
//     {props.animation === 'left' ?
//       <FadeInAnimationLeft>
//         <Phone src={props.pic? props.pic : IphoneSA} />
//       </FadeInAnimationLeft>
//       :
//       <FadeInAnimationRight>
//         <Phone src={props.pic? props.pic : IphoneSA} />
//       </FadeInAnimationRight>
//     }
//
//   </Wrapper>
// );

// ExternalLinks.propTypes = {
//     mainHeading: PropTypes.string.isRequired,
//     keywords: PropTypes.string,
//     description: PropTypes.string,
//     background: PropTypes.func,
//     color: PropTypes.func,
//     children: PropTypes.node
// };
//
// ExternalLinks.defaultProps = {
//     keywords: "",
//     description: "",
//     background: () => {},
//     color: () => {},
//     children: null
// };

export default Ipad;