import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class ChartModal extends React.Component {

	constructor() {
		super();
		this.state = {
			showModal: false
		};
	}

	close() {
		this.setState({ showModal: false });
	}

	open() {
		this.setState({ showModal: true });
	}

	render() {
		return (
      <div>
        <Button
            bsStyle="primary"
            bsSize="large"
            onClick={ this.open.bind(this) }
          >
            Launch demo modal
          </Button>

          <Modal show={ this.state.showModal } onHide={ this.close.bind(this) }>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <div id="graph" style={{height: '300px'}} ></div>
            </Modal.Body>
          </Modal>
      </div>
    );
	}
}

export default ChartModal;
