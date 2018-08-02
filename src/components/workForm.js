import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
	Button,
	FormGroup,
	ControlLabel,
	FormControl,
	ButtonToolbar,
	ToggleButtonGroup,
	ToggleButton
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';
import '../App.css'

class WorkForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			sessionToken: '',
			title: '',
			description: '',
			priority: 0,
			dueDate: '',
			displayDate: moment()
		}

		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDescription = this.handleDescription.bind(this);
		this.handleSelectedDate = this.handleSelectedDate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlePriority = this.handlePriority.bind(this);
	}

	handleTitleChange() {
		this.setState({
			title: this.title.value
		})
	}

	handleDescription() {
		this.setState({
			description: this.description.value
		})
	}

	handlePriority(priority) {
		this.setState({
			priority: priority
		})
	}

	handleSelectedDate(date) {
		this.setState({
			dueDate: new Date(date.format()).getTime()
		})
	}

	handleDateChange(date) {
		this.setState({
			displayDate: date
		})
	}

	handleSubmit(ev) {
		if (this.state.title) {
			ev.preventDefault()
			let data = {
				title: this.state.title,
				description: this.state.description,
				dueDate: this.state.dueDate,
				priority: this.state.priority
			}

			let options = {
				method: 'POST',
				headers: { 'Session-Token': this.state.sessionToken },
				data: data,
				url: 'https://api.onupkeep.com/api/v2/work-orders/'
			}

			axios(options)
			.then((result) => {
				console.log(result)
			})
			.catch((err) => {
				console.log(err)
			})
		}
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
			<div className='container'>
				<div className='title'>
					<h4>Create A Work Order</h4>
	        <Link to='/orders' className='link'>
	          View All Orders
	        </Link>
				</div>
				<form>
					<FormGroup>
						<ControlLabel>Title *required</ControlLabel>
						<FormControl 
							required='true' 
							componentClass='input'
							inputRef={input => this.title = input}
							onChange={this.handleTitleChange}
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Description</ControlLabel>
						<FormControl 
							componentClass='textarea'
							inputRef={text => this.description = text}
							onChange={this.handleDescription}
						/>
					</FormGroup>

					<div className='group'>
						<ControlLabel>Priority</ControlLabel>
						<ButtonToolbar>
						  <ToggleButtonGroup type='radio' name='priority' defaultValue={0}
						  	onChange={this.handlePriority}
						  	className='group'
						  >
						    <ToggleButton className='priority' value={0}>0</ToggleButton>
						    <ToggleButton className='priority' value={1}>1</ToggleButton>
						    <ToggleButton className='priority' value={2}>2</ToggleButton>
						    <ToggleButton className='priority' value={3}>3</ToggleButton>
						  </ToggleButtonGroup>
						</ButtonToolbar>

						<ControlLabel>Due Date</ControlLabel>
						<DatePicker
							selected={this.state.displayDate}
							onSelect={this.handleSelectedDate}
					    onChange={this.handleDateChange}
					    className='date-select'
						/>
					</div>

					<div className='submit-form'>
						<Button
							className='submit-button'
							type='submit'
							onClick={this.handleSubmit}> 
							PLACE ORDER
						</Button>
					</div>
				</form>
			</div>
		)
	}
}

export default WorkForm;
