import React from 'react';
import { withRouter } from 'react-router-dom';
import { TwitterTweetEmbed } from 'react-twitter-embed';
// import TweetEmbed from 'react-tweet-embed'
import InstagramEmbed from 'react-instagram-embed'
import {
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Button,
  Table,
  TabContent,
  TabPane,
  FormGroup,
  Label,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Media
} from 'reactstrap';
import classnames from 'classnames';
import './HomePage.css';
import Pagination from '../../atoms/Pagination/Pagination';
import axios from 'axios';
import NewWindow from 'react-new-window'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersPagination: {
        count: 1500,
        offset: 0,
        limit: 10,
        open: false
      },
      sort_order: 'ASC',
      sort_column: 'currency_id',
      socialNetworks: [],
      posts: []
    };
  }

  componentDidMount = () => {
    axios.get('http://207.180.216.94/api/v1/users/me')
      .then(response => {
        this.setState({ userID: response.data.data.id })
        axios.get('http://207.180.216.94/api/v1/users/' + response.data.data.id + '/sleeves')
          .then(response1 => {
            this.setState({
              socialNetworks: response1.data.data.items
            })
          })
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          this.props.history.push('/login');
        }
      });
  }

  getPost = (SocialNetwork) => {
    axios.get('http://207.180.216.94/api/v1/users/' + this.state.userID + '/posts?networkName=' + SocialNetwork)
      .then(response => {
        this.setState({
          posts: response.data.data.rows
        })
      })
  }

  renderButtons = () => {
    var elem = [];
    var socialNetworkList = this.state.socialNetworks;
    for (var index = 0; index < socialNetworkList.length; index++) {
      const element = socialNetworkList[index].SocialNetwork.name;
      elem.push(
        <a href="#" onClick={() => this.onButtonClick(element)}>{element}</a>
      )
    }
    return elem;
  }

  onButtonClick = element => {
    this.getPost(element)
    this.setState({
      selectedNetwork: element
    })
  }

  renderPost = () => {
    var elem = [];
    var postList = this.state.posts;
    const selectedNetwork = this.state.selectedNetwork
    console.log(this.state.posts)
    for (var index = 0; index < postList.length; index++) {
      const element = postList[index];
      if (selectedNetwork === 'TWITTER') {
        elem.push(
          <TwitterTweetEmbed key={index} tweetId={element.id_post} />
        )
      } else
        if (selectedNetwork === 'INSTAGRAM') {
          console.log(element.id_post)
          elem.push(
            <InstagramEmbed
              key={index}
              url={JSON.parse(element.data).link}
            />
          )
        }

    }
    return elem;
  }

  render() {
    return (
      <div style={{ color: '#fff' }}>
        <Navbar color="light" light expand="md">
          <Container>
            <NavbarBrand href="/" style={{ color: '#fff' }}>Social media</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Container>
          <br />
          <div>
            <a style={{ padding: '5px', border: '1px solid #00BCD4', color: '#00BCD4', marginRight: '5px' }} href="#" onClick={() => this.setState({ open: true })}>Instagram</a>
            <a style={{ padding: '5px', border: '1px solid #00BCD4', color: '#00BCD4', marginRight: '5px' }} href="#">Facebook</a>
            <a style={{ padding: '5px', border: '1px solid #00BCD4', color: '#00BCD4', marginRight: '5px' }} href="#">Linkedin</a>
            <a style={{ padding: '5px', border: '1px solid #00BCD4', color: '#00BCD4', marginRight: '5px' }} href="#">Twitter</a>
          </div>
          {this.state.open ?
            <NewWindow center="screen" url="https://www.instagram.com/oauth/authorize/?client_id=5df48e0684bc4e349f2f093cd9cf953c&redirect_uri=http://207.180.216.94/api/v1/users/register_access_token/&response_type=code" />
            : null}

          <div style={{ padding: '0 15px' }}>
            <br />
            <Row>
              <Col md="9">
                <this.renderPost />
              </Col>
              <Col md="3">

              </Col >
            </Row >
          </div >
          {/* <Media object src="log.png" width="100%" alt="Generic placeholder image" /> */}
        </Container>
      </div >
    );
  }
}

export default withRouter(HomePage);