/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState } from "react";

const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const imageLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid #dbdbdb;
    width: 300px;
    height: 300px;
    overflow: hidden;
    & > img {
        width: 100%;
    }
`;

function ImageEx(props) {
    const [ preview, setPreview ] = useState("");
    const imgFileRef = useRef();

    const handleImgFileChange = (e) => {
        const fileReader = new FileReader();

        if(e.target.files.length === 0) {
            return;
        }

        fileReader.onload = (e) => {
            setPreview(e.target.result);
        };

        fileReader.readAsDataURL(e.target.files[0]);
    }

    return (
        <div css={layout}>
           <div css={imageLayout}>
                <img src={preview} alt="" /> 
           </div>
           <div css={imageLayout}>
                <img src={preview} alt="" /> 
           </div>
           <div css={imageLayout}>
                <img src={preview} alt="" /> 
           </div>
           <input style={{display: "none"}} type="file" ref={imgFileRef} onChange={handleImgFileChange} multiple={true} />
           <button onClick={() => imgFileRef.current.click()}>이미지 불러오기</button>
        </div>
    );
}

export default ImageEx;