import {gql, useMutation} from "@apollo/client";
import {useQuery} from "@/lib/web/apollo.ts";
import {Mutation} from "@/graphql/types.ts";
import {LIVE_FIELDS} from "@/client/live.ts";
import {VIDEO_FIELDS} from "@/client/video.ts";
import {ACCOUNT_FIELDS} from "@/client/account.ts";

export const DEVICE_FIELDS = gql`
  fragment DeviceFields on Device {
    id
    owner {
      id
    }
    name
    live {
      id
    }
    streamKey
  }
`;

export const GET_DEVICES = (ownerId: string) => gql`
  query GetDevices {
    devices(ownerId: "${ownerId}") {
      ...DeviceFields
      owner {
        ...AccountFields
      }
      live {
        ...LiveFields
        video {
          ...VideoFields
        }
      }
    }
  }
  ${ACCOUNT_FIELDS}
  ${DEVICE_FIELDS}
  ${LIVE_FIELDS}
  ${VIDEO_FIELDS}
`;

export function useDevices(ownerId: string) {
  return useQuery(GET_DEVICES(ownerId));
}


const CREATE_DEVICE = gql`
  mutation CreateChatUser($creation: DeviceCreation) {
    createDevice(creation: $creation) {
      ...DeviceFields
    }
  }
  ${DEVICE_FIELDS}
`;

export function useCreateDevice() {
  const [createDevice, {loading, error}] = useMutation<Mutation>(CREATE_DEVICE);
  return {createDevice, loading, error};
}
