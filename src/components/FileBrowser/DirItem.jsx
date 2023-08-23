import React, {useContext, useEffect, useState} from 'react';
import {FFmpegContext} from "../../Hero.jsx";

const DirItem = ({name, isDir, currentDir, setCurrentDir, downloadFile}) => {
    const fileExtension = name.slice(((name.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
    const filetype = fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' ? 'image' : fileExtension === 'mp4' || fileExtension === 'webm' ? 'video' : 'unknown';
    const ffmpegRef = useContext(FFmpegContext);
    const ffmpeg = ffmpegRef.current;
    let [src, setSrc] = useState('');
    const getSrc = async () => {
        if (isDir) return ''
        const filepath = currentDir + '/' + name;
        console.log({filepath});
        const data = await ffmpeg.readFile(filepath);
        setSrc(URL.createObjectURL(new Blob([data.buffer])))
    }
    useEffect(() => {
        getSrc();
        return () => {
            URL.revokeObjectURL(src);
        };
    },[]);
    return (
        <div style={{cursor: 'pointer'}} onClick={async () => {
            if (isDir) {
                if (name === '.') {
                    console.log('doing nothing');
                } else if (name === "..") {
                    console.log('popin out')
                    setCurrentDir(prevState => {
                        let lastIndex = prevState.lastIndexOf("/");
                        let newPath = prevState.substring(0, lastIndex);
                        if (newPath === '') {
                            return prevState;
                        }
                        console.log(newPath);
                        return newPath;
                    });
                } else
                    setCurrentDir(currentDir + "/" + name);
            } else {
                downloadFile(currentDir + '/' + name);
            }
        }}>
            {name}
            {isDir ? 'Directory' : 'File'}
            {
                !isDir && (<>
                    {
                        filetype === "image" ? (<img src={src}></img>) : (filetype === "video") ?
                            <video controls src={src}></video> : <></>
                    }
                </>)
            }
        </div>
    );
};

export default DirItem;
