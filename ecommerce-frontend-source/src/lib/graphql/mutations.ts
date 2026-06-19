import { gql } from "@apollo/client";

export const PLACE_ORDER = gql`
  mutation PlaceOrder($input: PlaceOrderInput!) {
    placeOrder(input: $input) {
      id
      totalAmount
      status
      paymentStatus
    }
  }
`;

export const ADMIN_UPDATE_ORDER_STATUS = gql`
  mutation AdminUpdateOrderStatus($orderId: ID!, $status: OrderStatus!) {
    adminUpdateOrderStatus(orderId: $orderId, status: $status) {
      id
      status
    }
  }
`;
