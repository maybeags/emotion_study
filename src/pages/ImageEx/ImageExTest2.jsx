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
    margin: 0px auto 20px;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    overflow: hidden;
    cursor: pointer;
    & > img {
        height: 100%;
    }
`;

function ImageEx(props) {
    const [previews, setPreviews] = useState([]);
    const imgFileRef = useRef();

    const handleImgFileChange = (e) => {
        const fileReader = new FileReader();

        if (e.target.files.length === 0) {
            return;
        }

        const newPreviews = [];

        for (let i = 0; i < e.target.files.length; i++) {
            fileReader.onload = (event) => {
                newPreviews.push(event.target.result);
                if (newPreviews.length === e.target.files.length) {
                    setPreviews(newPreviews);
                }
            };

            fileReader.readAsDataURL(e.target.files[i]);
        }
    };

    return (
        <div css={layout}>
            {previews.map((preview, index) => (
                <div css={imageLayout} key={index}>
                    <img src={preview} alt={`미리보기 ${index}`} />
                </div>
            ))}
            <input style={{ display: 'none' }} type="file" ref={imgFileRef} onChange={handleImgFileChange} multiple={true} />
            <button onClick={() => imgFileRef.current.click()}>이미지 불러오기</button>
        </div>
    );
};

export default ImageEx;