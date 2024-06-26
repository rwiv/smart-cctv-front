import {useMyInfo} from "@/hooks/common/useMyInfo.ts";
import {useDevices} from "@/client/device.ts";
import {useEffect} from "react";
import {consts} from "@/configures/consts.ts";
import {iconStyle} from "@/styles/globalStyles.ts";
import {HStack, VStack} from "@/lib/style/layouts.tsx";
import {TEXT1, TEXT3} from "@/styles/colors.ts";
import {Device} from "@/graphql/types.ts";

export function DeviceContent() {
  const {myInfo} = useMyInfo();
  const devicesData = useDevices(myInfo?.id ?? "");

  useEffect(() => {
    console.log(devicesData.data?.devices)
  }, [devicesData]);

  return (
    <div>
      <HStack>
        {devicesData.data?.devices?.map(device => (
          <DeviceItem key={device.id} device={device} />
        ))}
      </HStack>
    </div>
  )
}

function DeviceItem({device}: { device: Device }) {
  const thumbnailUrl = device.live?.video?.thumbnailUrl;
  return (
    <div>
      <a href="https://example.com">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt="live_thumbnail"/>
        ) : (
          <div css={{width: 320, height: 180, background: "#eeeeee"}} />
        )}
      </a>
      <HStack gap={10} className="m-2">
        <img
          className="mt-1"
          css={iconStyle}
          src={`${consts.endpoint}${device.owner.avatarUrl}`}
          alt="avatar_url"
        />
        <VStack gap={1}>
          <div css={{color: TEXT1, fontSize: "1.1rem", fontWeight: 500}}>{device.name}</div>
          <div css={{color: TEXT3, fontSize: "1rem", fontWeight: 500}}>{device.owner.nickname}</div>
        </VStack>
      </HStack>
    </div>
  )
}
