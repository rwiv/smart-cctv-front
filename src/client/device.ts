import {gql, useMutation} from "@apollo/client";
import {useQuery} from "@/lib/web/apollo.ts";
import {Mutation} from "@/graphql/types.ts";
import {LIVE_FIELDS} from "@/client/live.ts";
import {VIDEO_FIELDS} from "@/client/video.ts";
import {ACCOUNT_FIELDS} from "@/client/account.ts";

export const IOT_DEVICE_FIELDS = gql`
  fragment IotDeviceFields on IotDevice {
    id
    owner {
      id
    }
    name
    live {
      id
    }
    accessKey
  }
`;

export const GET_IOT_DEVICES = (ownerId: string) => gql`
  query GetIotDevices {
    iotDevices(ownerId: "${ownerId}") {
      ...IotDeviceFields
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
  ${IOT_DEVICE_FIELDS}
  ${LIVE_FIELDS}
  ${VIDEO_FIELDS}
`;

export function useIotDevices(ownerId: string) {
  return useQuery(GET_IOT_DEVICES(ownerId));
}


const CREATE_IOT_DEVICE = gql`
  mutation CreateChatUser($creation: IotDeviceCreation) {
    createIotDevice(creation: $creation) {
      ...IotDeviceFields
    }
  }
  ${IOT_DEVICE_FIELDS}
`;

export function useCreateIotDevice() {
  const [createIotDevice, {loading, error}] = useMutation<Mutation>(CREATE_IOT_DEVICE);
  return {createIotDevice, loading, error};
}
