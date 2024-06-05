import {useEffect, useRef, useState} from "react";
import Hls, {HlsConfig, Level} from "hls.js";
import {getCamNginxAddress} from "@/client/address.ts";

interface VideoPlayerProps {
  name: string,
  isLive: boolean,
}

export function VideoPlayerContent({name, isLive}: VideoPlayerProps) {

  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls>(new Hls());
  const [levels, setLevels] = useState<Level[]>([]);
  // const [curLevel, setCurLevel] = useState<Level>();

  useEffect(() => {
    console.log(levels);
  }, [levels]);

  useEffect(() => {
    initHls();

    // videoRef.current?.addEventListener("play", () => {
    //   // 재개 시 최신 segment를 새롭게 load
    //   if (videoRef.current?.currentTime ?? -1 > 0) {
    //     initHls();
    //   }
    // });
    //
    // videoRef.current?.addEventListener("pause", () => {
    //   // 일시 정지 시 segment loading stop
    //   hlsRef.current.stopLoad();
    // });

    // window.addEventListener("focus", () => {
    //   resetHls();
    // })
    //
    // window.addEventListener("blur", () => {
    //   hlsRef.current.stopLoad();
    // })
  }, []);

  // const onSelectLevel = (levelIdx: number) => {
  //   hlsRef.current.currentLevel = levelIdx;
  // }

  const initHls = async () => {
    if (!Hls.isSupported()) {
      console.log("not supported");
      return;
    }

    const userConfig: Partial<HlsConfig> = {
      startLevel: -1, // startLevel을 -1로 설정해야 최초 play 시 bandwidth에 맞는 화질을 채택함
    }
    if (isLive) {
      // 앞에 1개의 segment 여분을 남겨두고 시작. 즉, 3번째 hls segment부터 시작
      // userConfig.liveSyncDurationCount = 1;
      userConfig.liveSyncDurationCount = 2;
    }
    const hls = new Hls(userConfig);
    hlsRef.current = hls;

    const camNginxAddr = await getCamNginxAddress();
    const indexUrl = `${camNginxAddr}/hls/${name}/index.m3u8`;
    hls.loadSource(indexUrl);
    hls.attachMedia(videoRef.current as any);
    hls.on(Hls.Events.MANIFEST_PARSED, async () => {
      setLevels(hls.levels)
      const video = videoRef.current;
      if (video === null) return;

      // refer: https://developer.chrome.com/blog/autoplay?hl=ko#webaudio
      // 유저의 미디어 참여 지수가 임계값을 넘으면(이전에 재생한 적이 있으면) 자동실행된다
      // 그렇지 않아 자동실행에 실패했다면 mute 후 자동실행하면 된다
      try {
        await video.play();
      } catch (e) {
        video.muted = true;
        await video.play();
      }
      console.log("play");
    });

    // hls.on(Hls.Events.LEVEL_LOADED, async (_, data) => {
    //   setCurLevel(hls.levels[data.level]);
    // });
  }

  // const resetHls = () => {
  //   hlsRef.current.destroy();
  //   initHls();
  // }
  //
  // const onTest = () => {
  //   console.log(levels)
  //   console.log(hlsRef.current.loadLevel)
  // }

  return (
    <div>
      <video ref={videoRef} css={{width: 1280, height: 720}} controls />
      {/*<div className="m-3">*/}
        {/*{curLevel && (*/}
        {/*  <div>current quality: {curLevel?.height + "p"}</div>*/}
        {/*)}*/}
        {/*{levels.map((level, idx) => (*/}
        {/*  <span key={idx}>*/}
        {/*    <Button onClick={() => onSelectLevel(idx)}>{level.height}p</Button>*/}
        {/*  </span>*/}
        {/*))}*/}
        {/*<div>*/}
        {/*  <Button onClick={onTest}>test</Button>*/}
        {/*</div>*/}
      {/*</div>*/}
    </div>
  )
}
