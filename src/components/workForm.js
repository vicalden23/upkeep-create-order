import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
	Button,
	Radio,
	FormGroup,
	ControlLabel,
	FormControl
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";

class WorkForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			sessionToken: '',
			title: '',
			description: '',
			priority: 0,
			dueDate: moment()
		}

		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this)
	}



	handleDateChange(date) {
		this.setState({
			dueDate: date
		})
	}

	handleSubmit() {
		let headers = {
			'Session-Token': this.state.sessionToken
		}

		let data = {
			title: this.state.title,
			description: this.state.description,
			dueDate: this.state.dueDate,
			priority: this.state.priority
		}

		axios.post('https://api.onupkeep.com/api/v2/work-orders/', data, {headers})
		.then((result) => {
			console.log(result)
		})
		.catch((err) => console.log(err))
	}

	componentDidMount() {
    axios.post('https://api.onupkeep.com/api/v2/auth/', {
      email:'test+0726@onupkeep.com',
      password: 'testing'
    })
    .then((auth) => {
      this.setState({
        sessionToken: auth.data.result.sessionToken
      })
    })
  }

	render() {
		return (
			<div>
	      <Button>
	          <Link to='/orders'>
	            View All Orders
	          </Link>
	        </Button>
				<form>
					<FormGroup>
						<ControlLabel>Title *required</ControlLabel>
						<FormControl required='true' componentClass='input' />
					</FormGroup>
					<FormGroup>
						<ControlLabel>Description</ControlLabel>
						<FormControl componentClass='textarea' />
					</FormGroup>
					<FormGroup>
						<Radio name='priority' inline>
							0
						</Radio>
						<Radio name='priority' inline>
							1
						</Radio>
						<Radio name='priority' inline>
							2
						</Radio>
						<Radio name='priority' inline>
							3
						</Radio>
					</FormGroup>
					<DatePicker
						selected={this.state.dueDate}
				    onChange={this.handleDateChange}
					/>

					<Button 
						type='submit'
						onClick={this.handleSubmit}> 
						Submit 
					</Button>
				</form>
			</div>
		)
	}
}

export default WorkForm;
