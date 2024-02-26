/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { storage } from "../../configs/firebase/firebaseConfig";
import { Line } from "rc-progress";
import { v4 as uuid } from "uuid"

// const layout = css`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
// `;

// const imageLayout = css`
//      display: flex;
//     justify-content: center;
//     align-items: center;
//     margin: 0px auto 20px;
//     box-sizing: border-box;
//     border: 1px solid #dbdbdb;
//     border-radius: 50%;
//     width: 200px;
//     height: 200px;
//     overflow: hidden;
//     cursor: pointer;
//     & > img {
//         height: 100%;
//     }
// `;

// function ImageEx(props) {
//     const [previews, setPreviews] = useState([]);
//     const imgFileRef = useRef();

//     const handleImgFileChange = (e) => {
//         const newPreviews = [];

//         for (let i = 0; i < e.target.files.length; i++) {
//             const fileReader = new FileReader();

//             fileReader.onload = (event) => {
//                 newPreviews[i] = event.target.result;

//                 if (newPreviews.length === e.target.files.length) {
//                     setPreviews([...newPreviews]);
//                 }
//             };

//             fileReader.readAsDataURL(e.target.files[i]);
//         }
//     };

//     return (
//         <div css={layout}>
//             {previews.map((preview, index) => (
//                 <div css={imageLayout} key={index}>
//                     <img src={preview} alt={`미리보기 ${index}`} />
//                 </div>
//             ))}
//             <input style={{ display: 'none' }} type="file" ref={imgFileRef} onChange={handleImgFileChange} multiple={true} />
//             <button onClick={() => imgFileRef.current.click()}>이미지 불러오기</button>
//         </div>
//     );
// };

// export default ImageEx;

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

function ImageEx() {
    const [ urls, setUrls ] = useState([]);
    const [ uploadFiles, setUploadFiles ] = useState([]);
    const [ previews, setPreviews ] = useState([]);
    const [ progressPercent, setProgressPercent ] = useState([]);
    const imgFileRef = useRef();

    useEffect(()=> {
        setUrls(!localStorage.getItem("urls") ? [] : JSON.parse(localStorage.getItem("urls")));
    }, []);

    const handleImgFileChange = (e) => {
        const files = Array.from(e.target.files);
        if(files.length === 0 ) {
            imgFileRef.current.value = "";
            return;
        }

        setUploadFiles(files);

        let promises = []; 

        promises = files.map(file => new Promise((resolve) => {
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                console.log(e.target.result);
                resolve(e.target.result);
            };
            fileReader.readAsDataURL(file);
        }));
        
        // for(let file of e.target.files) {
        //     promises = [...promises, ];
        // }
        // Promise.all(promises)
        // .then(result => {
        //     console.log(result);
        //     setPreviews(result);
        // });

        Promise.all(promises)
        .then(urls => {
            localStorage.setItem("urls", JSON.stringify(urls));
            setUrls(urls);
            setPreviews([]);
        })
    }

    const handleImageUpload = () => {
        const file = uploadFiles[0];
        console.log(uploadFiles);
        const storageRef = ref(storage, `files/test/${uuid()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setProgressPercent(Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100))
            },
            (error) => {},
            () => {
                getDownloadURL(storageRef).then(url => {
                    localStorage.setItem("urls", JSON.stringify([...urls, url]));
                    setPreviews([]);
                })
            }
        );
    }

    return (
        <div css={layout}>
            {urls.map(url => 
                <div css={imageLayout}>
                    <img src={url} alt="" /> 
                </div>
            )}
            {previews.map((preview, index) =>
                <>
                    <div key={index} css={imageLayout}>
                        <img src={preview} alt="" />
                    </div>
                    <Line percent={progressPercent} strokeWidth={4} strokeColor={"#22222"}/>
                </>
            )}
           
           <input style={{display: "none"}} type="file" multiple={true} ref={imgFileRef} onChange={handleImgFileChange} />
           <button onClick={() => imgFileRef.current.click()}>이미지 불러오기</button>
           <button onClick={handleImageUpload}>이미지 업로드</button>
        </div>
    );
}

export default ImageEx;