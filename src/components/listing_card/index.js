import React, { Component } from "react";
import PropTypes from 'prop-types';
import Avatar from "../avatar";
import PopupDetails from "./popupDetails";
import Rating from "./rating";
import styled from "styled-components";
import get from "lodash.get";

const CardWrapper = styled.div`
  width: 90%;
  height: 70px;
  display: flex;
  margin-bottom: 10px;
  border: 1px #ecefef;
  border-radius: 5px;
  background-color: #fff;
  padding: 14px;
`;

const Details = styled.div`
  padding-top: 9px;
  margin-left: 18px;
`;

const LocaleHeader = styled.div`
  font-size: 12px;
  color: #a0a0a0;
  padding-bottom: 6px;
`;

const NameHeader = styled.div`
  font-size: 14px;
  color: #000;
  font-weight: bold;
`;

export class ListingCard extends Component {
  constructor(props) {
    super();
    this.state = {
      openDetails: false
    }
    this.detailsClosed = this.detailsClosed.bind(this);
  }
  
  roundNumber(num) {
    let rd = Math.round(num * 10) / 10;
    return rd.toFixed(1);
  }

  getPercent(num) {
    let rated = parseFloat(this.roundNumber(num));
    return `${Math.round(rated / 5 * 100)}%`;
  }

  detailsClosed() {
    this.setState({openDetails: false})
  }

  openDetails() {
    this.setState({openDetails: true})
  }

  render() {
    const { listing } = this.props;
    const avatarImg = `${get(listing, "avatar_image.small_url")}`
    const ratePercent = this.getPercent(listing.rating);
    const rate = this.roundNumber(listing.rating);
    const dist = this.roundNumber(listing.distance)

    return (
      <CardWrapper onClick={this.openDetails.bind(this)}>
        <Avatar img={avatarImg} />
        <Details>
          <LocaleHeader> {listing.city}, {listing.state} | {dist}mi </LocaleHeader>
          <NameHeader> {listing.name} </NameHeader>
          <Rating rated={rate} ratedPercent={ratePercent} />
        </Details>
      
        { this.state.openDetails &&
          <PopupDetails wmId={listing.wmid} rating={rate} ratePercent={ratePercent} closed={this.detailsClosed} logo={avatarImg} />
        }
      </CardWrapper>
    );
  }
}

ListingCard.propTypes = {
  listing: PropTypes.object,
  error: PropTypes.object
};

ListingCard.defaultProps = {
  listing: {},
  error: {}
};

export default ListingCard;