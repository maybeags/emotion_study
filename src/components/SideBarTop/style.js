import { css } from "@emotion/react";

export const layout = (isShow) => css`
    box-sizing: border-box;
    position: fixed;
    top: ${isShow ? "-82px" : "0px"};
    right: 0px;
    z-index: 99;
    border-right: 1px solid #dbdbdb;
    width: 50%;
    height: 80px;
    transition: top 0.5s ease-in-out;
    background-color: white;
    box-shadow: 0px 0px 3px 1px #000022;
`;

export const toggleButton = css`
    box-sizing: border-box;
    position: absolute;
    transform: translateX(-100%);
    top: 80px;
    right: -5.2%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border: 1px solid #dbdbdb;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    width: 50px;
    height: 20px;
    background-color: white;
    cursor: pointer;
    &:hover {
        background-color: #eee;
    }
    &:active {
        background-color: #aaa;
    }
`;

export const menuList = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const menuItem = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 10px;

    border: 1px solid #dbdbdb;
    border-radius: 5px;
    width: 200px;
    height: 50px;
    color: black;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    &:hover {
        background-color: #eee;
    }
    &:active {
        background-color: #dbdbdb;
    }
`;