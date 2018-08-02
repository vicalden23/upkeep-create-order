import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css'

class WorkOrders extends Component {
  constructor(props) {
    super(props)

    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    axios.post('https://api.onupkeep.com/api/v2/auth/', {
      email:'test+0726@onupkeep.com',
      password: 'testing'
    })
    .then((auth) => {
      let options = {
        method: 'GET',
        headers: { 'Session-Token': auth.data.result.sessionToken },
        url: 'https://api.onupkeep.com/api/v2/work-orders'
      }
      
      axios(options)
      .then((result) => {
        this.setState({
          orders: result.data.results
        })
      })
    })
  }

  render() {
    return (
      <div className='order-container'>
        <div className='title'>
          <h4>Work Orders</h4>
          <Link to='/' className='link'>
            Create Work Order
          </Link>
        </div>
        <div className='order-list'>
          {
            this.state.orders.length ? this.state.orders.map((order, i) => {
              return (
                <div className='order-card' key={i}>
                  <p className='status'>{order.status}</p>
                  <h3>{order.title}</h3>
                  <p>{order.description}</p>
                </div>
              )
            })

            : ''
          }
        </div>
      </div>
    );
  }
}

export default WorkOrders;
