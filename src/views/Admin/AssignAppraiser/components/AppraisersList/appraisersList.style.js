import styled from 'styled-components'

const MyDiv = styled.div`
position:relative;
.wrapper{
    // height: 60vh;
    // overflow-y: scroll;
    // padding: 0px 30px 0px 0px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 3px 5px 0 #eee;
}
.wrapper ul {
    padding: 0px 30px 0px 0px;
    border-right: 1px solid #cecece;
}
.list_item{
    padding: 3px 5px 0px 15px;
    border-bottom: 1px solid #ddd;
}
.list_item:hover {
    background: #2e6da4;
    border-color: #2e6da4;
}
.list_item:first-child:hover {
    border-top-left-radius: 5px;
}
.list_item:last-child:hover {
    border-bottom-left-radius: 5px;
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
    padding: 3px;
}
.add_item{
    background: #2e6da4;
    border-color: #2e6da4;
}
.add_item .label_name span{
    color: #fff;
}
.add_item button{
    color: #fff;
}
.list_btn{
    padding: 0;
}
.list_btn:hover{
    background-color: transparent;
}
.list_item .MuiTouchRipple-root{
    display: none;
}
.list_item button .MuiTouchRipple-root{
    display: block;
}
.add_all{
    position: absolute;
    top: 50%;
    right: -30px;
    background: #176de5;
    color: #fff;
}
.add_all:hover{
    background: #176de5;
    color: #fff;
}
`
export default MyDiv
