import styled from 'styled-components'

const MyDiv = styled.div`
position:relative;
.wrapper{
    height: 60vh;
    overflow-y: scroll;
    padding: 0px 30px 0px 0px;
}
.wrapper ul {
    padding: 0px 30px 0px 0px;
    border-right: 1px solid #cecece;
}
.list_item{
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 3px 5px 0 #eee;
    padding: 5px;
    margin-bottom: 15px;
    position: relative;
}
.list_item:hover {
    background: #2e6da4;
    border-color: #2e6da4;
}
.label_name{
    margin: 0;
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
    display: block;
    text-align: center;
}
.list_item img{
    width: 100%;
    height: 120px;
    object-fit: cover;
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
    right: 0;
    background: #176de5;
    color: #fff;
}
.add_all:hover{
    background: #176de5;
    color: #fff;
}
`
export default MyDiv
