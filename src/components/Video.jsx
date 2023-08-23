const Video = ({source}) => {
    return (
        <div>
            <video src={source} controls></video>
        </div>
    );
};

export default Video;
