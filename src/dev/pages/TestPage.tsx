import {useEffect, useRef} from "react";
import Hls from "hls.js";

export function TestPage() {

  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!Hls.isSupported()) {
      console.log("not supported");
      return;
    }

    const hls = new Hls({
      // startLevel을 -1로 설정해야 최초 play 시 bandwidth에 맞는 화질을 채택함
      startLevel: -1,
      // liveDurationInfinity: true
    });
    // const liveUrl1 = "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8";
    const liveUrl1 = "http://localhost:8081/hls/hello.m3u8";
    // const m3u8Url = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
    hls.loadSource(liveUrl1);
    hls.attachMedia(ref.current as any);
    hls.on(Hls.Events.MANIFEST_PARSED, async () => {
      console.log("play");
      const video = ref.current;
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
    });
  }, []);

  return (
    <div>
      <video ref={ref} controls />
    </div>
  )
}