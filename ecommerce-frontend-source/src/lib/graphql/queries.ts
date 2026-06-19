import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts($categoryId: ID, $search: String, $limit: Int, $offset: Int) {
    products(categoryId: $categoryId, search: $search, limit: $limit, offset: $offset) {
      id
      name
      price
      compareAtPrice
      stock
      images
      soldCount
    }
  }
`;

export const GET_BANNERS_BY_POSITION = gql`
  query GetBannersByPosition($position: BannerPosition!) {
    bannersByPosition(position: $position) {
      id
      title
      imageUrl
      linkType
      linkValue
      type
      displayOrder
    }
  }
`;
