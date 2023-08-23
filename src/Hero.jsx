import FileInput from "./components/FileInput.jsx";
import {createContext, useEffect, useRef, useState} from "react";
import {FFmpeg} from "@ffmpeg/ffmpeg";
import LoadFiles from "./components/LoadFiles.jsx";
import Video from "./components/Video.jsx";
import TextBox from "./components/TextBox.jsx";
import FileBrowser from "./components/FileBrowser/index.jsx";

export const FFmpegContext = createContext(null);
const Hero = () => {
    const ffmpegRef = useRef(new FFmpeg())
    const ffmpeg = ffmpegRef.current;
    const [loaded, setLoaded] = useState(false);
    const [fileList, setFileList] = useState(null);
    const [ffmpegArgs, setFFmpegArgs] = useState('');

    // Listen to progress event instead of log.
    const execute = async () => {
        ffmpeg.on("progress", ({progress, time}) => {
            console.log(`${progress * 100} %`);
        });
        ffmpeg.on("log", ({message}) => {
            console.log(message);
        });

        console.log('Starting process...')
        const op = await ffmpeg.exec(ffmpegArgs.split(' '));
        if (op === 0) {
            console.log('Finished with No Error');
        }
        console.log('Finish...')
        reloadFileBrowser();
    }

    const effect = async () => {
        await ffmpeg.writeFile(
            fileList[0].name,
            new Uint8Array(await fileList[0].arrayBuffer())
        );
        reloadFileBrowser();
    }
    useEffect(() => {
        if (!(fileList === null || fileList.length === 0)) {
            effect();
        }
    }, [fileList]);
    const [FBReloadState, setFBReloadState] = useState(true);
    const reloadFileBrowser = () => {
        setFBReloadState(prevState => !prevState);
    }
    return (
        <div>
            <FFmpegContext.Provider value={ffmpegRef}>
                {/*<div style={{backgroundColor:'#12FAFA',height:'150vh'}}></div>*/}
                <LoadFiles loaded={loaded} setLoaded={setLoaded}/>
                <FileInput loaded={loaded} fileList={fileList} setFileList={setFileList}/>
                <Video source={fileList === null ? '' : URL.createObjectURL(fileList[0])}/>
                <TextBox value={ffmpegArgs} setValue={setFFmpegArgs}/>
                <button disabled={!loaded} onClick={execute}>Execute</button>
                <FileBrowser FBReloadState={FBReloadState} loaded={loaded} root={'/'}/>
            </FFmpegContext.Provider>
        </div>
    );
};

export default Hero;
