import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const MarginTopDiv = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-top: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const flexCenterMedia = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;



const styles = theme => ({
  root: {
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  routeCentered: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  tabsRoot: {
    borderBottom: '0px solid transparent',
    // width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    // display: 'flex',
  },
  tabsIndicator: {
    backgroundColor: '#fafafa',
  },
  tabRoot: {
    zIndex: 1000,
    textTransform: 'initial',
    minWidth: 0,
    // maxWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    color: '#5f6368',
    marginRight: 3,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#fafafa',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#fafafa',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#fafafa',
    },
  },
  tabSelected: {},
  typography: {
    padding: 2,
  },
});

class AboutMeTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.callback ? this.props.callback(event, value) : null;
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <MarginTopDiv>
        <div className={classes.root}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
          >
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Who Am I?"
            />
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="On Rainy Days"
            />
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="The Good Stuff"
            />
            {/*<Tab*/}
              {/*disableRipple*/}
              {/*classes={{ root: classes.tabRoot, selected: classes.tabSelected }}*/}
              {/*label="Happy Hip"*/}
            {/*/>*/}
          </Tabs>
        </div>
      </MarginTopDiv>
    );
  }
}

AboutMeTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutMeTabs);