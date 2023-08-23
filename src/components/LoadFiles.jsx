import {toBlobURL} from "@ffmpeg/util";
import {useContext, useState} from "react";
import {FFmpegContext} from "../Hero.jsx";

const LoadFiles = ({loaded, setLoaded}) => {
    const ffmpegRef = useContext(FFmpegContext);
    const [loading, setLoading] = useState(false);
    const handleLoadBtnClick = async () => {
        setLoading(true);
        const ffmpeg = ffmpegRef.current;
        const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.2/dist/esm";
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
            wasmURL: await toBlobURL(
                `${baseURL}/ffmpeg-core.wasm`,
                "application/wasm"
            ),
            workerURL: await toBlobURL(
                `${baseURL}/ffmpeg-core.worker.js`,
                "text/javascript"
            ),

            // coreURL: `/ffmpeg/ffmpeg-core.js`,
            // wasmURL: `/ffmpeg/ffmpeg-core.wasm`,
            // workerURL: `/ffmpeg/ffmpeg-core.worker.js`,
        });
        setLoaded(true);
        setLoading(false);
    }
    return (
        <div>
            {loaded ? 'Files loaded' : loading ? 'Loading...' : 'Click button to load essential files ~32MB'}
            <button disabled={loaded || loading} onClick={handleLoadBtnClick}>Load files</button>
        </div>
    );
};

export default LoadFiles;
