import {useState} from "react";

const FileInput = ({setFileList, loaded}) => {
    return (
        <div>
            <input disabled={!loaded} type="file" accept="video/*" onChange={event => setFileList(event.target.files)}/>
        </div>
    );
};

export default FileInput;
