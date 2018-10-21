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
  Media
} from 'reactstrap';
import classnames from 'classnames';
import './HomePage.css';
import Pagination from '../../atoms/Pagination/Pagination';
import axios from 'axios';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersPagination: {
        count: 1500,
        offset: 0,
        limit: 10
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
    console.log(this.state.socialNetworks.length)
    for (var index = 0; index < socialNetworkList.length; index++) {
      const element = socialNetworkList[index].name;
      elem.push(
        <a onClick={this.onButtonClick(element)}>{element}</a>
      )
    }
    return elem;
  }

  onButtonClick = () => {
    this.getPost(element.SocialNetwork.name)
    this.setState({
      selectedNetwork: element.SocialNetwork.name
    })
  }

  renderPost = () => {
    var elem = [];
    var postList = this.state.posts;
    console.log(this.state.posts.length)
    for (var index = 0; index < postList.length; index++) {
      const element = postList[index];
      if (selectedNetwork === 'TWITTER') {
        elem.push(
          <TwitterTweetEmbed key={index} tweetId={element.id_post} />
        )
      } else
        if (selectedNetwork === 'INSTAGRAM') {
          elem.push(
            <InstagramEmbed
              key={index}
              url={'https://instagr.am/p/' + element.id_post}
            />
          )
        }

    }
    return elem;
  }

  render() {
    return (
      <div style={{ color: '#fff' }}>

        <Navbar light expand="md">
          <Col md="4">
            <NavbarBrand href="/">
              <this.renderButtons />
            </NavbarBrand>
          </Col>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Col md="10">
              <Media object src="log.png" width="100%" alt="gsv" />
            </Col>
            <Col md="2">
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Collapse>
        </Navbar>

        <div style={{ padding: '0 15px' }}>
          <br />
          <Row>
            <Col md="3">
              <this.renderPost />
              {/* <InstagramEmbed
                url='https://instagr.am/p/BlWXjaFFghd/'
              />*/}
            </Col>
            <Col md="9">
              <Row>
                <Col md="8">
                  <div className="m-auto toggleDiv" style={{ display: 'table' }}>
                    <div className="buttonsToggleDiv">
                      <Button className="classification" color="primary" onClick={this.toggleInvestment}>Global Investable Market</Button>
                      <Button className="classification" color="primary" onClick={this.toggleClassification}>Classification</Button>
                      <Button className="classification" color="primary" onClick={this.toggleCoin}>Coin or Token</Button>
                    </div>
                    <Collapse isOpen={this.state.toggleInvestment}>
                      <Card className="classificationToggleCard">
                        <CardBody className="classificationToggleCardBody">
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio1" />{' '}
                              <span>GIM 600</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio1" />{' '}
                              <span>GIM 100</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio1" />{' '}
                              <span>GIM 50</span>
                            </Label>
                          </FormGroup>
                        </CardBody>
                      </Card>
                    </Collapse>
                    <Collapse isOpen={this.state.toggleClassification}>
                      <Card className="classificationToggleCard">
                        <CardBody className="classificationToggleCardBody">
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Blockchain Infrastructure</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Financial Services</span>
                            </Label>
                          </FormGroup>

                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Trading and Exchanges</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Computing and AI</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Network and Communications</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Gaming and VR</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Commerce and Advertising</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Media and Content</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Funding and Venture Capital</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />{' '}
                              <span>Tokenization</span>
                            </Label>
                          </FormGroup>
                        </CardBody>
                      </Card>
                    </Collapse>
                    <Collapse isOpen={this.state.toggleCoin}>
                      <Card className="classificationToggleCard">
                        <CardBody className="classificationToggleCardBody">
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio3" />{' '}
                              <span>Coin</span>
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio3" />{' '}
                              <span>Token</span>
                            </Label>
                          </FormGroup>
                        </CardBody>
                      </Card>
                    </Collapse>
                  </div>
                  <br />

                  < div style={{ display: 'table', margin: 'auto', color: '#000' }}>
                    <Pagination
                      count={this.state.ordersPagination.count}
                      offset={this.state.ordersPagination.offset}
                      limit={this.state.ordersPagination.limit}
                      changePage={this.loadTableData}
                    />
                  </div >
                  <br /> <br />
                </Col >
                <Col md="4">
                  <Card body inverse color="info">
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button color="secondary">Button</Button>
                  </Card>
                  <br />
                  <Card body inverse color="warning">
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button color="secondary">Button</Button>
                  </Card>
                  <br />
                  <Card body inverse color="danger">
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button color="secondary">Button</Button>
                  </Card>
                </Col>
              </Row >
              <Row>
                <Col>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggleTab('1'); }}
                      >
                        Behavioral Finance
            </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggleTab('2'); }}
                      >
                        Performance Appraisals
            </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggleTab('3'); }}
                      >
                        ICO's/ITO's calender
            </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '4' })}
                        onClick={() => { this.toggleTab('4'); }}
                      >
                        Oversight rules and regulations
            </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          Cognitive Errors are basic statistical, information-processing, or memory errors that can cause decision to deviation from the rational decisions from traditional finance. Cognitive Errors can be thought of as blind spots or distortions in traders head. They stem from faulty reasoning so better information, education, and advice ca often correct for them: they can be moderated, and we are hoping that at GSV we’ll help users with data and information.<br /><br />
                          <span style={{ color: '#1c9cf3' }}>Conservatism Bias</span> – traders tend to maintain their prior views, forecasts or believes despite availability and release of new material information. The traders will  be tend slower adopting to new information and they might not adequately incorporate it into decision making. Conservatism will cause traders to overweight their initial beliefs about probabilities and outcomes and under-react to new information. Traders may correct for this bias by assigning higher probability to newer information.<br /><br />
                          <span style={{ color: '#1c9cf3' }}>Confirmation Bias</span> – is a belief perseverance bias in which traders tend to look for and notice what confirms their beliefs, and to ignore or undervalue what contradicts their beliefs. Traders often place greater weight on information that supports their beliefs. One way to correct for this bias is actively seeking out information that challenges trader’s beliefs.<br /><br />
                          <span style={{ color: '#1c9cf3' }}>Representativeness Bias</span> – is a belief perseverance bias too in which traders tend to #1 classify new information based on the past experiences & would wrongfully classify certain investments, or #2 they might mistakenly believe that a small sample is a representative of the true ‘population’ value. Even well-informed decisions can lead to unfavorable results; however, making the extra effort (taking time) to gather ‘complete’ information, positive or negative will likely result in better decisions. Traders may correct this bias by viewing a periodic table of investments returns by calendar month.<br /><br />
                          <span style={{ color: '#1c9cf3' }}>Illusion of Control Bias</span> – guidelines for overcoming illusion of control is by recognizing that successful investing is a probabilistic activity of any investment outcome is a function of a rather complex global trading processes and broad capital markets activity. Write a trading journal, traders should maintain records of their transactions, including keeping track of remarks and important features of each investment made.<br /><br />
                          <span style={{ color: '#1c9cf3' }}>Hindsight Bias</span> – is a selective perception bias as traders may see ‘past’ events as having been predictable and reasonable to expect. The outcomes that did occur are more readily evident that outcomes that did not occur. To alleviate the discomfort associated with the unexpected, traders tend to view things that have already happened as being relatively inevitable and predictable. A way to correct this the hindsight bias for traders to stay disciplined and honor their decision making process.<br /><br />
                          <span style={{ color: '#1c9cf3' }}>Framing Bias</span> – is an information processing bias in which a trader answers a question differently based on the way in which is asked ‘framed’. How information is processed might be influenced how the question is framed. For instance traders might take opposing views even though outcomes are identical (70% chance of success) or (30% chance of failure) merely in the way questions are framed. This is often related to short term price fluctuation and we suggest for traders to focus on their strategic decision making processes.<br /><br />
                          <span style={{ color: '#1c9cf3' }}>Availability Bias</span> – is an information processing bias in which people take a ‘heuristic’ approach to estimating probability of an outcome based on how easily the outcome comes to mind. Easily recalled outcomes are often perceived as being more likely than those that are harder to RECALL or UNDERSTAND. The traders have to be open minded to overcome the availability bias and explore options and investment suggestions that do not come naturally to them, widen their investment opportunity set, fail to diversify their positions across the opportunity set.<br />
                          <hr style={{ borderTop: '1px solid rgba(255,255,255,0.4)' }} />
                          Emotional biases arise spontaneously as a result of attitudes and feelings. Although an ‘emotion’ has no specific definition, it is often viewed as a mental state (of traders) that arises spontaneously rather than through conscious effort. Emotional biases are harder to correct than cognitive errors because they originate from impulse or intuition rather than conscious calculations.<br /><br />
                          <span style={{ color: '#1c9cf3' }}>Loss Aversion Bias</span> – is emotional bias exhibited by traders whereabout they exhibit risk-eversion tendencies. It was presented through a prospect theory (strongly prefer avoid losses as opposed to achieving gains) and further in practice by trader as the disposition effect. Loss averse traders tend to sell their winners (investments) realizing positive P&L. Also loss averse investors are likely to respond by continuing to hold the losing investments unfortunately. The idea of actually losing money is so painful that the first reaction is to hold the investment until it breaks even. The investor is acting based on emotions, not cognitive reasoning. Goal based investing can be used to prevent this bias and traders can install target ROR or stop loss trading instructions.<br /><br />
                          <span style={{ color: '#1c9cf3' }}>Overconfidence Bias</span> – is a bias in which people demonstrate unwarranted faith in their own intuitive reasoning, judgements and or cognitive abilities and it might be the result of overestimating knowledge levels, abilities and access to information (all of three factors should be evaluated separately). Overconfidence bias may be intensified when combined with self-attribution bias when traders take credit for successes and assign  responsibility for failures. Traders tend to overestimate their abilities (sometimes) and expected returns and underestimate  risks that might result in poorly diversified portfolios and excessive trading. Investors can mitigate for these tendencies by performing post-investment analysis on both successful and unsuccessful trades.<br /><br />
                          <span style={{ color: '#1c9cf3' }}>Self-Control Bias</span> – is a self-discipline problem in which people tend deviate from their investment objectives in pursuit of tempting short term gains. There is inherent conflict between short term satisfaction and achievement of some long term gains. This is especially reflected in the volatility of investments whereby traders are likely to accept too much risk ‘volatility’ in their attempt to generate higher returns. Goal based investing is recommended to correct for this bias with traders forming investment layers targeting risk exposures in constructing their portfolios.<br /><br />
                          <span style={{ color: '#1c9cf3' }}>Status Quo Bias</span> – is an emotional bias in which traders do nothing and maintain the status quo instead of making a change in regard to their investment decision. This is especially relevant with the existing positions when traders are more comfortable keeping things the same than with change and thus not look for trading opportunities. Traders should have a goal in mind researching a particular number of new trades and fundamentally analyzing new options to invest.<br /><br />
                          <span style={{ color: '#1c9cf3' }}>Endowment Bias</span> – is an emotional bias in which traders value an asset more when they hold rights to than when they do not. Endowment bias swill often result in traders irrationally holding the assets they own. This might be especially relevant when financial goals are in jeopardy, our emotional attachment must be moderated. Traders may believe they understand the characteristics of the investments they already own and may be reluctant to purchase assets which they have less experience. Traders can mitigate this bias by focusing on the investment selection process and quantitative measures (provided by our app!).<br /><br />
                          <span style={{ color: '#1c9cf3' }}>Regret Aversion Bias</span> – is an emotional bias in which people tend to avoid making decisions that will result in action out of fear that the decision will turn out poorly. Traders at times will try to avoid the pain of regret associate with bad decision. Regret aversion can keep traders out of a market that has recently generated sharp losses or gains. Having experienced losses, traders might think that continued investing is not prudent yet a periods of depressed prices may represent great buying opportunities. Regret aversion may also persuade traders to stay out of the stock market due to a fear of getting in the high point. One way to correct for this bias is to keep track of the Average Weighted Cost of the traded assets, and also formulate exit points and the notional amount.<br /><br />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <span style={{ color: '#1c9cf3' }}>Sharpe Ratio</span> - the Sharpe ratio is the average return (measured over certain time period) earned in excess of the risk-free rate per unit of volatility or total risk measured by standard deviation. Subtracting the risk-free rate from the mean return, the performance associated with risk-taking activities can be isolated. One intuition of this calculation is that a portfolio engaging in “zero risk” investment, such as the purchase of U.S. Treasury bills (for which the expected return is the risk-free rate), has a Sharpe ratio of exactly zero. Generally, the greater the value of the Sharpe ratio, the more attractive the risk-adjusted return. The Sharpe Ratio was developed by Nobel laureate William F. Sharpe. Although the Sharpe ratio is often used to compare the change in a portfolio's overall risk-return characteristics when a new asset or asset class is added to it, however it is also a standardized unit of measure that is used for comparison purposes among cryptocurrency coins.<br /><br />
                          <span style={{ color: '#1c9cf3' }}>Sortino Ratio</span> - The Sortino ratio improves upon the Sharpe ratio by isolating downside volatility from total volatility by dividing excess return by the downside deviation. The Sortino ratio is a variation of the Sharpe ratio that differentiates harmful volatility from total overall volatility by using the asset's standard deviation of negative asset returns, called downside deviation. The Sortino ratio takes the asset's return and subtracts the risk-free rate, and then divides that amount by the asset's downside deviation. The ratio was named after Frank A. Sortino. he Sortino ratio is a useful way for investors, analysts and portfolio managers to evaluate an investment's return for a given level of bad risk (when price declines) and it shouldn’t be penalized for the positive rally in price.<br /><br />
                          <span style={{ color: '#1c9cf3' }}>Treynor Measure</span> – The Treynor Measure is risk-adjusted measurement of return, based on systematic risk not securities volatility. It indicates how much return an investment, such as a portfolio of cryptocurrencies, a mutual fund or exchange, earned for the amount of risk the investment assumed. The Treynor ratio shares similarities with the Sharpe ratio, however the difference between the two metrics is that the Treynor ratio utilizes beta, or market risk measured by the Global Investable Market 600, to measure volatility instead of using total risk (standard deviation) like the Sharpe ratio. Ultimately, the ratio attempts to measure how successful an investment is in providing investors compensation for taking on investment risk. The Treynor ratio is reliant upon beta – that is, the sensitivity of an investment to movements in the market – to judge risk. The premise behind this ratio is that investors must be compensated for the risk inherent to the entire market (as represented by beta), because diversification will not remove it. All else equal, a higher Treynor ratio is better.<br /><br />
                          <span style={{ color: '#1c9cf3' }}>Return Over Maximum Drawdown (ROMAD)</span> - return over maximum drawdown is a more nuanced way of looking at crytpocurrency performance. Drawdown is the difference between a let’s say coin’s point of maximum return (the “high-water” mark) and any subsequent low point of performance. Maximum drawdown, also called Max DD or MDD, is the largest difference between a high point and a low point. Maximum drawdown is becoming the preferred way of expressing the risk of a non-normal distribution investments (cryptocurrency) for investors who believe that observed loss patterns over longer periods of time are the best available proxy for actual exposure.<br />
                          <hr style={{ borderTop: '1px solid rgba(255,255,255,0.4)' }} />
                          <span style={{ color: '#1c9cf3' }}>Risk Attribution</span><br />
                          In today’s environment more than ever, risk attribution is becoming critical to understanding portfolio composition. This is especially prevalent in the crytpocurrency space where encryption assets can be either divided into as base-layers blackchain type infrastructure protocols (utility) or are decentralized applications (DApps) usually built on top of a smart contract platforms. Being able to decompartmentalize both the order and type of risk will become increasingly more important as users begin to draw conclusions from their portfolios.<br /><br />
                          Prudent investors now want to know how much systemic risk is reflected by their portfolio holdings in real time and possibly evaluate how each of the crypto coins / asset tokens may contribute to their total risk. Luckily as part of the Crypto Dashboard installation, we are proposed two unique formulations that are meant to address this specific concern are will help users track both absolute level risk (all coins) and thiir marginal contribution (single coin) represented by two risk metrics: Marginal Contribution to Total Risk (MCTR) and Absolute Contribution Total Risk (ACTR).<br /><br />
                          Traders must be aware that in conventional finance portfolio managers have been practicing these techniques for over 40 years. At Grange Square Ventures INC., we are delighted to extend these concepts of total portfolio volatility to all of our users, successfully modeling their portfolio volatilities on our network! By calculating the standard deviations of all cryptocurrencies  (daily log difference of returns) we are able to compute a whole suite of risk statistics on individual asset tokens along with measures total portfolio risk exposures.<br /><br />
                          Risk can be decomposed (understood better) by measuring MCTR  and ACTR portfolio metrics for all GSV client users. The Marginal Contributions to Total Risk can be viewed as asset token market return sensitivity (beta) in a context of total portfolio standard deviation and are effectively representation of individual contributions to total portfolio risk.<br /><br />
                          On the other hand, we can extend this concept further by accounting for the notional amount of investments in the FIAT terms providing an aggregate calculation score called ACTR. This metric is merely a summation of the individual risk contribution and is calculated by multiplying MCTR by % weight. We are hoping that these two formulations will give our users an indication how much portfolio risk (price volatility) they inherently carry on their books and how much each of their positions is contributing to their total risk.
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">
                          <h4>Tab 3 Contents</h4>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="4">
                      <Row>
                        <Col sm="12">
                          <h4>Tab 4 Contents</h4>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
            </Col >
          </Row >
        </div >
        {/* <Media object src="log.png" width="100%" alt="Generic placeholder image" /> */}
      </div >
    );
  }
}

export default withRouter(HomePage);