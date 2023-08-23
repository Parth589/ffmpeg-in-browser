import {FFmpeg} from '@ffmpeg/ffmpeg';
import {fetchFile, toBlobURL} from '@ffmpeg/util';
import {useRef, useState} from "react";
import Hero from "./Hero.jsx";

export default function App() {
    // const [loaded, setLoaded] = useState(false);
    // const ffmpegRef = new FFmpeg();
    // const videoRef = useRef(null);
    // const messageRef = useRef(null);
    //
    // const load = async () => {
    //     const ffmpeg = ffmpegRef;
    //     const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.2/dist/esm";
    //     await ffmpeg.load({
    //         coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    //         wasmURL: await toBlobURL(
    //             `${baseURL}/ffmpeg-core.wasm`,
    //             "application/wasm"
    //         ),
    //         workerURL: await toBlobURL(
    //             `${baseURL}/ffmpeg-core.worker.js`,
    //             "text/javascript"
    //         ),
    //
    //         // coreURL: `/ffmpeg/ffmpeg-core.js`,
    //         // wasmURL: `/ffmpeg/ffmpeg-core.wasm`,
    //         // workerURL: `/ffmpeg/ffmpeg-core.worker.js`,
    //     });
    //     setLoaded(true);
    // }
    //
    // const transcode = async () => {
    //     const ffmpeg = ffmpegRef.current;
    //     await ffmpeg.writeFile(
    //         "input.avi",
    //         await fetchFile('/video/video-15s.avi')
    //     );
    //     await ffmpeg.exec(['-i', 'input.avi', 'output.mp4']);
    //     const data = await ffmpeg.readFile('output.mp4');
    //     videoRef.current.src =
    //         URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
    // }

    // return (loaded
    //         ? (
    //             <>
    //                 <video ref={videoRef} controls></video>
    //                 <br/>
    //                 <button onClick={transcode}>Transcode avi to mp4</button>
    //                 <p ref={messageRef}></p>
    //             </>
    //         )
    //         : (
    //             <button onClick={load}>Load ffmpeg-core</button>
    //         )
    // );
    return(
        <Hero/>
    );
}
