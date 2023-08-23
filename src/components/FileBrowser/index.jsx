import {createElement, useContext, useEffect, useRef, useState} from "react";
import {FFmpegContext} from "../../Hero.jsx";
import DirItem from "./DirItem.jsx";
import {downloadWithProgress} from "@ffmpeg/util";

const Index = ({root = '/', loaded, FBReloadState}) => {
    const ffmpegRef = useContext(FFmpegContext);
    const ffmpeg = ffmpegRef.current;
    const [currentDir, setCurrentDir] = useState(root);
    const [dirContents, setDirContents] = useState([]);
    const effect = async () => {
        const contents = await ffmpeg.listDir(currentDir);
        console.log('reloading file browser...');
        setDirContents(contents);
    }
    useEffect(() => {
        if (loaded)
            effect();
    }, [loaded, currentDir, FBReloadState])
    const downloadFile = async (filePath) => {
        const ffmpeg = ffmpegRef.current;
        const data = await ffmpeg.readFile(filePath);

        //     a workaround to save files in user disk
        const link = document.createElement("a");

// Create a blog object with the file content which you want to add to the file
        const file = new Blob([data.buffer]);

// Add file content in the object URL
        link.href = URL.createObjectURL(file);

// Add file name
        const fileType = filePath.split('.').pop();
        link.download = `sample.${fileType}`;

// Add click event to <a> tag to save file.
        link.click();

    }

    const newFolderInputRef = useRef(null);
    const handleNewFolderClick = async () => {
        const folderName = newFolderInputRef.current.value;
        const folderPath = currentDir + '/' + folderName;
        console.log({folderPath});
        const success = await ffmpeg.createDir(folderPath);
        if (success)
            setDirContents(prevState => ([...prevState, {name: folderName, isDir: true}]))
        else
            console.log('something went wrong');
    }
    return (
        <div>
            currentDir: {currentDir}
            {
                !loaded ? (
                        <span>Load initial files to use file browser.</span>
                    )
                    : (
                        <div>
                            <label htmlFor={'newFolderName'}>new folder</label>
                            <input ref={newFolderInputRef} type="text" id="newFolderName"/>
                            <button onClick={handleNewFolderClick}>make new folder</button>
                            {dirContents.map((e) => {
                                return <DirItem key={e.name} {...e} currentDir={currentDir}
                                                setCurrentDir={setCurrentDir}
                                                downloadFile={downloadFile}/>
                            })}
                        </div>
                    )
            }
        </div>
    );
};

export default Index;
