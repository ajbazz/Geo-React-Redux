import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDetails } from '../../actions';
import Popup from "reactjs-popup";
import Rating from "./rating";
import Avatar from "../avatar";
import styled from "styled-components";
import { Modal } from "../styles.js";

const Label = styled.span`
  font-size: 14px;
  color: #000;
  font-weight: bold;
`;

const ModalDetails = styled.div`
  display: inline-block;
  vertical-align: top;
  text-align: left;
  font-size: 14px;
  margin-right: 15px;
  &.name {
    margin-top: 20px;
  }
  & .pad {
    padding: 15px 0 15px 0;
  } 
  & .detail {
    display: table-cell;
    padding-right: 10px;
    min-width: 60px;
    line-height: 20px;
  }
`;

const ModalDetailsHead = styled(ModalDetails)`
  font-size: 24px;
  > div:last-child {
    font-size: 18px;
    margin-top: 25px;
    
    a {
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  }
`;

class PopupDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
      expand: false
    }
  }

  componentDidMount() {
    this.getDetail();
  }
  
  openModal() {
    this.setState({ open: true });
    setTimeout( () => {
        this.setState({expand: true });
      }, 10);
  }

  closeModal() {
    this.setState({ open: false });
    this.props.closed();
  }

  getDetail() {
    const { dispatch, wmId } = this.props;
    dispatch(getDetails(wmId));
    this.openModal();
  };

  render() {
    const { detail, logo, rating, ratePercent } = this.props;
    let i = 0;
    
    return (
      <Popup
        open={this.state.open}
        modal
        closeOnDocumentClick
        onClose={this.closeModal.bind(this)}
        contentStyle={{ boxShadow: "5px 5px", borderRadius: "10px", width: "70%" }}
      >
        <Modal style={!this.state.expand?{maxHeight: '0'}:{maxHeight:'500px'}}>
          <div className="close" onClick={this.closeModal.bind(this)}>
            &times;
          </div>
          {detail &&
            <div>
              <div className="header">
              <ModalDetailsHead><Avatar img={logo} style={{ display: 'inline-block' }} /></ModalDetailsHead>
              <ModalDetailsHead className="name">{detail.name}
                <Rating rated={rating} ratedPercent={ratePercent} clazz="larger"/>
                {detail.website && 
                  <div style={{paddingLeft: "5px"}}>
                    <a href={detail.website} target="_blank" rel="noopener noreferrer">{detail.website}</a>
                  </div>
                }
              </ModalDetailsHead> 
              </div>

              <div className="content">
                <ModalDetails>
                  <div className="detail"><Label>Address:</Label></div>
                  <div className="detail">
                    {detail.address || "Not Available"}<br />
                    {detail.city}, {detail.state}
                  </div>
                  <ModalDetails>
                    <div className="pad detail"><Label>Phone:</Label></div>
                    <div className="pad detail">{detail.phone_number}</div>
                  </ModalDetails>
                </ModalDetails>

                <ModalDetails>
                  <div className="detail" style={{padding: 0}}><Label>Hours:</Label></div>
                  <div className="detail"> 
                    {
                      Object.keys(detail.business_hours).map(function(item){return (
                        <div key={i++} >
                          <div className="detail" style={{minWidth: "80px", textTransform: "capitalize"}}>{item}:</div>
                           <div className="detail">{detail.business_hours[item].open || 'Closed'} - {detail.business_hours[item].close}</div>
                        </div>
                      );
                    })
                    }
                  </div>
                </ModalDetails>
              </div>
            </div>
          }
        </Modal>
      </Popup>
    )
  }
}

const mapStateToProps = state => state.detail;

PopupDetails.propTypes = {
  detail: PropTypes.object,
  error: PropTypes.object,
  dispatch: PropTypes.any
};

PopupDetails.defaultProps = {
  detail: {},
  error: {}
};

export default connect(mapStateToProps)(PopupDetails);




