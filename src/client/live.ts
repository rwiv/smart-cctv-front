import {gql} from "@apollo/client";

export const LIVE_FIELDS = gql`
  fragment LiveFields on Live {
    id
    device {
      id
    }
    video {
      id
    }
    title
    viewerCnt
  }
`;
