import {gql} from "@apollo/client";

export const VIDEO_FIELDS = gql`
  fragment VideoFields on Video {
    id
    device {
      id
    }
    title
    thumbnailUrl
    createdAt
  }
`;
