import styled from 'styled-components'

const MyDiv = styled.div`
.wrapper{
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 3px 5px 0 #eee;
}
.wrapper ul {
    padding-top: 0px!important;
}
.list_item{
    padding: 3px 5px 0px 15px;
    border-bottom: 1px solid #ddd;
}
.list_item:hover {
    background: #2e6da4;
    border-color: #2e6da4;
}
.list_item:hover .label_name span {
    color: #fff;
}
.list_item:hover button {
    color: #fff;
}
.list_item .label_name span{
    font-weight: 500;
    color: #333;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.list_item button{
    color: #333;
    position: absolute;
    right: 0;
    top: 2px;
    padding: 2px;
}
.list_btn{
    padding: 0;
}
.list_item .MuiTouchRipple-root{
    display: none;
}
.list_item button .MuiTouchRipple-root{
    display: block;
}
`
export default MyDiv
