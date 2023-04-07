import styled from 'styled-components'

const MyDiv = styled.div`
.custom_header{
    background: #282828;
    height: 50px;
    border-bottom: 4px solid #e61718;
    color: #fff;
    width: 100%;
    box-shadow: none!important;
    position: fixed;
    z-index: 99;
    top: 0px;
}
.custom_toolbar{
    min-height: 45px;
    padding: 0 20px 0 0;
}
.custom_toolbar img{
    width: 55px;
    height: 55px;
    object-fit: contain;
}
.menu_box{
    margin-left: 20px;
    height: 50px;
    align-items: center;
}
.menu_items{
    color: #fff;
    text-transform: capitalize;
    margin: 0 20px;
    font-size: 14px;
}
.text_font {
    font-family: "Poppins",sans-serif;
}
.logout_user{
    font-size: 14px;
    cursor: pointer;
}
.menuitem {
    display: inline-flex;
    padding: 0px;
    margin: 0px 10px 0px 0px;
}
.menuitem a{
    color: #fff;
    line-height: 46px;
    font-weight:400;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    font-family: "Poppins",sans-serif;
    font-size: 14px;
}
.menuitem a svg{
    margin-left: 6px;
    width: 0.7em;
    height: 0.7em;
}
.menuitem:hover{
    background:#000;
}
.activeMenu{
    background-color: #000;
}

`
export default MyDiv
