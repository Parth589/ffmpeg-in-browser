const TextBox = ({value, setValue}) => {
    return (
        <div>
            <label htmlFor="argList"> argument list for ffmpeg: </label>
            <input type="text" id={'argList'} value={value} onChange={event => setValue(event.target.value)}/>
        </div>
    );
};

export default TextBox;
