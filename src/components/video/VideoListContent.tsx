import {useEffect, useState} from "react";
import {HStack, VStack} from "@/lib/style/layouts.tsx";
import {TEXT1} from "@/styles/colors.ts";
import {getCamApiAddress, getCamNginxAddress} from "@/client/address.ts";
import {Link} from "react-router-dom";

interface Video {
  filename: string,
  thumbnailUrl: string,
  indexUrl: string,
  isLive: boolean,
}

function toVideo(filenames: string[], endpoint: string): Video[] {
  return filenames.map(filename => ({
    filename,
    thumbnailUrl: `${endpoint}/hls/${filename}/thumb.jpg`,
    indexUrl: `${endpoint}/hls/${filename}/index`,
    isLive: filename === "live",
  }))
}

export function VideoListContent() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const camApiAddr = await getCamApiAddress();
    const camNginxAddr = await getCamNginxAddress();
    console.log(camApiAddr);
    console.log(camNginxAddr);

    const res = await fetch(`${camApiAddr}/records`);
    const filenames: string[] = await res.json();
    const videos = toVideo(filenames,camNginxAddr);
    setVideos(videos);
  }

  return (
    <div>
      <HStack>
        {videos.map((video, idx) => (
          <VideoItem key={idx} video={video} />
        ))}
      </HStack>
    </div>
  )
}

function VideoItem({video}: { video: Video }) {
  return (
    <div>
      <Link to={video.filename}>
        {video.isLive ? (
          <div css={{width: 320, height: 180, background: "#eeeeee"}}>
            <div css={{color: "#000000", fontSize: "1.1rem", fontWeight: 500}}>
              Live Streaming...
            </div>
          </div>
        ) : (
          <img
            css={{width: 320, height: 180}}
            src={video.thumbnailUrl}
            alt="live_thumbnail"
          />
        )}
      </Link>
      <HStack gap={10} className="m-2">
        {/*<img*/}
        {/*  className="mt-1"*/}
        {/*  css={iconStyle}*/}
        {/*  src={`${consts.endpoint}${video.owner.avatarUrl}`}*/}
        {/*  alt="avatar_url"*/}
        {/*/>*/}
        <VStack gap={1}>
          <Link to={video.filename}>
            <div css={{color: TEXT1, fontSize: "1.1rem", fontWeight: 500}}>{video.filename}</div>
          </Link>
        </VStack>
      </HStack>
    </div>
  )
}
