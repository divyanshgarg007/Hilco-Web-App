import styled from 'styled-components'

const MyDiv = styled.div`
position: relative;
.wrapper{
    height: 60vh;
    overflow-y: scroll;
    border: 1px solid #ddd;
    border-radius: 5px !important;
}
.accordion_box{
    box-shadow: none;
    margin-bottom: 15px !important;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    margin: 8px!important;
    border-radius: 4px!important;
}
.accordion_box::before{
    background-color: transparent;
}
.accordion_details{
    background: #fff;
    border-top: 1px solid #cecece;
    padding: 15px 16px 16px;
}
.list_item{
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 3px 5px 0 #eee;
    padding: 5px 5px 5px 15px;
    margin-bottom: 10px;
    position: relative;
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
    top: 0;
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
.list_item .MuiTouchRipple-root{
    display: none;
}
.list_item button .MuiTouchRipple-root{
    display: block;
}
.label_title{
    font-weight: 600;
    color: #333;
    font-size: 16px;
    font-family: "Poppins",sans-serif;
}
.accordion_item .MuiAccordionSummary-content{
    display: block;
    margin: 5px 0px;
}
.add_all{
    position: absolute;
    top: 50%;
    left: -20px;
    background: #176de5;
    color: #fff;
}
.add_all:hover{
    background: #176de5;
    color: #fff;
}
.accordion_box .MuiAccordionSummary-root.Mui-expanded{
    min-height:48px;
}

`
export default MyDiv
