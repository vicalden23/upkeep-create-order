import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class WorkOrders extends Component {

  render() {
    return (
      <div>
        <Button>
          <Link to='/'>
            Create Work Order
          </Link>
        </Button>
        <h4> All Orders </h4>
      </div>
    );
  }
}

export default WorkOrders;
