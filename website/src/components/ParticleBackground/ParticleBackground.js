import React from "react";
import styled, { withTheme } from "styled-components";
import Particles from 'react-particles-js';

const StyledParticles = styled(Particles)`
    position: absolute;
    height: 100vh;
    width: 100%;
    // z-index: -100;
`;

class ParticleBackground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dotsFreq: this.props.numParticles ? this.props.numParticles : 7,
      color: this.props.color ? this.props.color : '#fafafa'
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.color !== this.props.color) {
      this.setState({ color: nextProps.color });
    }
    if(nextProps.numParticles !== this.props.numParticles) {
      this.setState({ dotsFreq: nextProps.numParticles });
    }
  }

  render() {
    return (
      <React.Fragment>
        <StyledParticles params={{
          particles: {
            number: {
              value: this.state.dotsFreq,
              density: {
                enable: true,
                value_area: 800,
              }
            },
            color: {
              value: this.state.color
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: this.state.color
              },
              polygon: {
                nb_sides: 5
              },
            },
            size: {
              value: 4,
              random: true,
              anim: {
                enable: false,
                speed: 80,
                size_min: 0.1,
                sync: false
              }
            },
            line_linked: {
              enable: true,
              distance: 300,
              color: this.state.color,
              opacity: 0.1,
              width: 1
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: false,
                  mode: "repulse"
                },
                onclick: {
                  enable: true,
                  mode: "push"
                },
                resize: true
              },
              modes: {
                grab: {
                  distance: 800,
                  line_linked: {
                    opacity: 1
                  }
                },
                bubble: {
                  distance: 800,
                  size: 80,
                  duration: 2,
                  opacity: 0.8,
                  speed: 3
                },
                repulse: {
                  distance: 400,
                  duration: 0.4
                },
                push: {
                  particles_nb: 4
                },
                remove: {
                  particles_nb: 2
                }
              }
            },
          }}}
        />
      </React.Fragment>
    );
  }
}

export default withTheme(ParticleBackground);