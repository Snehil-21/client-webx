import React from "react";
import styled from "styled-components";
import { Image } from "cloudinary-react";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/Product";

export const WishlistCard = ({ id, name, price, pic }) => {
  const dispatch = useDispatch();
  const customerEmail = useSelector((state) => state.Auth.email);

  const handleClick = async () => {
    await dispatch(productActions.removeWishlistProduct(customerEmail, id));
  };

  return (
    <Wrapper>
      <Card>
        <Image
          style={{ width: "120px", borderRadius: "6px" }}
          cloudName="cloudSnehil"
          publicId={`https://res.cloudinary.com/cloudsnehil/image/upload/v1635787798/${pic}`}
        />
        <Details>
          <h4>{name}</h4>
          <p>Rs. {price}</p>
        </Details>

        <RemoveButton onClick={handleClick}>Remove</RemoveButton>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RemoveButton = styled.button`
  font-size: 12px;
  background: transparent;
  border: 1px solid beige;
  border-radius: 12px;
  background: salmon;
  color: white;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 36px;

  @media (max-width: 640px) {
    flex-direction: row;
    margin-left: 0;
    gap: 24px;
  }
`;
