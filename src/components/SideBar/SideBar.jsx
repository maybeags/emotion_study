/** @jsxImportSource @emotion/react */

import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import * as S from "./style";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MENUS } from "../../constants/menu";

function SideBar() {
    const [ isShow, setShow ] = useState(false);
    // const menus = useMemo(() => MENUS, []); 얘 쓸 필요 없어졌다. 나중에 확인해볼 것. 왜 없어도 되는지.

    return (
        <aside css={S.layout(isShow)}>
            <button css={S.toggleButton} onClick={() => setShow(!isShow)}>
                {isShow ? <FaCaretLeft /> : <FaCaretRight /> }
            </button>
            <ul css={S.menuList}>
                {MENUS.map(menu => 
                    <Link css={S.menuItem} to={menu.path} key={menu.id} onClick={() => setShow(false)}>
                        <li>{menu.name}</li>
                    </Link>)
                }
            </ul>
        </aside>
    );
}

export default SideBar;