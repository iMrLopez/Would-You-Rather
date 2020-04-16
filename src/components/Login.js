import React, { PureComponent } from 'react';
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends PureComponent {
  state = {
    redirectToReferrer: false
  }

  constructor(props) {
    super(props);
    this.state = {userId : ''};
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUser(event) {
    this.setState({userId: event.target.value});
  }

  async handleSubmit(event) {
    const { userId } = this.state;
    const { authenticate } = this.props;
    event.preventDefault();

    if (userId) {
      await authenticate(userId);
      this.setState(() => ({
        redirectToReferrer: true
      }));
    } else {
      alert('Please select a user before.');
    }
  }

  render() {
    const { users } = this.props;
    const { userId } = this.state;

    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="userSelect">Select User</Label>
              <Input 
                  id="userSelect"
                  type="select"
                  name="select"
                  value={userId}
                  onChange={this.handleChangeUser}
              >
                <option value="" disabled>Please select</option>
                {
                  Object.keys(users).map(user =>
                  <option key={user} value={user}>
                    {users[user].name}
                  </option>)
                }
              </Input>
            </FormGroup>
            <input disabled={userId === ''} type="submit" value="Log in" />
          </Form>
        </Col>
      </Row>
    );
  }
}

Login.propTypes = {
  users: PropTypes.object.isRequired,
  authenticate: PropTypes.func.isRequired
};

function mapStateToProps ({ users }) {
  return {
    users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: (id) => {
      dispatch(setAuthedUser(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
