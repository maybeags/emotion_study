// /** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
// import { useRef, useState } from "react";

// const layout = css`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
// `;

// const imgLayout = css`
//     box-sizing: border-box;
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     border: 1px solid #dbdbdb;
//     border-radius: 50%;
//     margin-bottom: 20px;
//     width: 300px;
//     height: 300px;
//     overflow: hidden;

//     & > img {
//         width: 100%;
//     }
// `;

// function ImageEx3() {
//     const fileInputRef = useRef(); //                       1. 버튼 클릭을 하면 파일 불러오는 창이 떠야 한다 -> button에 onClick 추가하고 useRef() -> 상수명을 onClick에 할당
//     // const fileInput = document.querySelector("input")이 위와 같다.
//     const imgIdRef = useRef(0);                           //  7. 객체 생성 할 수 있게끔 ref를 하나 더 만들어준다 -> 배열 안에 밑의 객체가 들어갈 것이다
//     const [ loadImages, setLoadImages ] = useState([]); //  5. dataURL이 하나가 아니기 때문에 배열로 useState를 받아준다 -> 6. 그랬는데 객체 형태로 넣어줄 것이다
   
//     /**
//     *{
//         id: 1,
//         file: file객체,
//         dataURL: ""
//     } 
//     */
   
//     const handleFileChange = (e) => { //                     2. 이벤트 때 어떤 객체가 들어오는지 확인하기 위해서 console.log(e) 확인 -> onchange라는 이벤트 발생하고, target 확인해보면 file이 존재함을 확인 -> value 확인하니까 경로 있음 -> 경로보다 중요한건 filelist다. 그래서 e.target.files가 있더라 그 filelist를 사용해야함.
//         // console.log(e);
//         const  { files } = e.target; //                     3. files는 그냥 쓸 수 없기 때문에 반복 돌려야 한다. 그래서 array로 바꿔줄 것
//         const fileArray = Array.from(files);

//         if(fileArray.length === 0) {
//             return;                     //                  4. fileArray의 길이가 0이면 빈 그대로 return해라.
//         }
        

//         console.log(fileArray.map(file => file.name));//    13. 또한 promises 안에 file 객체를 담기 전에 fileArray를 확인하기 위해 console.log를 찍어본다.

//         let promises = [];
        
//         promises = fileArray.map(file => new Promise(resolve => {//    8. promise들을 담을 promise 배열을 생성
//             const loadImage = {                       //     14. loadImage 객체 생성하는데 id 순서가 꼬이지 않도록 Promise 생성 될 때 위치
//                 id: imgIdRef.current += 1,
//                 file,
//                 dataURL: ""
//             };
//             console.log("onload");
//             console.log(file.name);
//             const fileReader = new FileReader();

//             fileReader.onload = (e) => {              //    10. fileReader를 map 안으로 이동(filereader는 초반부에 버튼 눌렀을 때 불러오기 창 만들기 위해서 생성했었으나 promise 안으로 이동 시킨 것)
                
//                 resolve({                             //    15. 근데 dataurl은 불러오기가 완료되어야 대입 가능하기 때문에 resolve 내에 dataurl e.target.result로 입력. - spread 사용해서 코드가 저럼
//                     ...loadImage,
//                     dataURL: e.target.result
//                 });                  
//             }
//             console.log(loadImage.dataURL);

//             fileReader.readAsDataURL(file);          //     12. fileReader.readAsDataURL을 실행해야 위의 onload가 일어난다. 근데 밑에 쓴 이유는 위에 미리 정의해둬야 하기 때문 // map이 여러 번 돌면 여러 개의 promise들이 생길 건데, 얘네는 순서대로 돌게 될텐데, 첫 시도에 첫번째 파일을 불러올 때 onload가 동작해야함. 이를 확인하기 위해 console.log(file.name)을 쳐본다.
//         }) );          

//         Promise.all(promises)                        //     9. promises를 생성했다는 건, 복수의 Promise들이 있기 때문에 이를 all로 모아서 동기로 후처리를 할 수 있게 됨, then도 쓸 수 있다
//         .then(result => {
//             setLoadImages(result);
//         });


//     }
//                                                         //  alt의 역할 : 로드 실패했을 때, 시각 장애인 등이 어떤 이미지 파일인지 확인할 수 있도록 함
//     return (
//         <div css={layout}>
//             {loadImages.map(loadImage => 
//                  <div css={imgLayout} key={loadImage.id}>
//                     <img src={loadImage.dataUrl} alt={loadImage.file.name} />
//                 </div>
//             )}
           
            
//             <input type="file" style={{display: "none"}} multiple={true} ref={fileInputRef} onChange={handleFileChange}  />
//             <button onClick={() => fileInputRef.current.click()}>불러오기</button>
//         </div>
//     );
// }

// export default ImageEx3;

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState } from "react";

const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const imgLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 300px;
    height: 300px;
    overflow: hidden;

    & > img {
        width: 100%;
    }
`;

function ImageEx3() {
    const fileInputRef = useRef();
    const imageIdRef = useRef(0);
    const [ loadImages, setLoadImages ] = useState([]);

    /**
     * {
     *      id: 1,
     *      file: file객체,
     *      dataURL: ""
     * }
     */

    const handleFileChange = (e) => {
        const { files } = e.target;
        const fileArray = Array.from(files);

        if(fileArray.length === 0) {
            return;
        }

        console.log(fileArray.map(file => file.name));

        let promises = [];

        promises = fileArray.map(file => new Promise(resolve => {
            const loadImage = {
                id: imageIdRef.current += 1,
                file,
                dataURL: ""
            };

            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                resolve({
                    ...loadImage,
                    dataURL: e.target.result
                });
            }

            fileReader.readAsDataURL(file);
        }));

        Promise.all(promises)
        .then(result => {
            console.log(result)
            setLoadImages(result);
        });
    }

    return (
        <div css={layout}>
            {loadImages.map(loadImage => 
                <div css={imgLayout} key={loadImage.id}>
                    <img src={loadImage.dataURL} alt={loadImage.file.name} />
                </div>)
            }
            
            <input type="file" style={{display: "none"}} multiple={true} ref={fileInputRef} onChange={handleFileChange} />
            <button onClick={() => fileInputRef.current.click()}>불러오기</button>
        </div>
    );
}

export default ImageEx3;