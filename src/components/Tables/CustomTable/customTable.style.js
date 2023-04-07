import styled from 'styled-components'

const MyDiv = styled.div`
.ka{
    border: solid 1px #cecece;
}
.ka-table-wrapper{
    border-bottom: solid 1px #cecece;
}
.ka-thead-cell{
    font-weight: 600;
    color: #000;
    font-size: 15px;
    font-family: "Poppins",sans-serif;
    background-color: #eee;
    padding: 0px 10px;
    border-right: 1px solid #cecece;
}
.ka-thead-cell:last-child{
    border-right: 0;
}
.ka-thead-row:nth-child(2) .ka-thead-fixed{
    padding-bottom: 5px;
}
.ka-thead{
    border-bottom: solid 1px #cecece;
}
.ka-row{
    border-top: 0;
    border-bottom: 1px solid #cecece;
}
.ka-row:last-child{
    border-bottom: 0;
}
.ka-cell{
    border-right: 1px solid #cecece;
}
.ka-cell:last-child{
    border-right: 0;
}
tbody .ka-row:nth-of-type(even){
    background-color: #f3f3f3;
}
.ka-cell{
    color: #333;
    font-size: 14px;
    // padding: 3px 10px;
    padding: 0px 10px;
    line-height: 20px;
    word-break: break-all;
}
.ka-paging-sizes-active{
    align-items: center;
    padding: 10px;
}

.ka-row-selected{
    background-color: #F7FcFd!important;
}
.ka-input{
    border: 1px solid #b1b1b1;
    height: 30px;
    padding: 0px 10px;
    border-radius: 4px;
}
.ka-input:focus-visible{
    outline: 0;
}
.ka-paging-page-index, .ka-paging-size{
    min-width: 32px;
    height: 32px;
    padding: 0px 6px;
    line-height: 30px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-family: "Poppins",sans-serif;
}
.ka-paging-page-index-active, .ka-paging-size-active{
    color: #fff;
    background-color: #333;
    border: 1px solid transparent;
    font-weight: 600;
}
.icon_btn svg{
    width: 18px;
    height: 18px;
}
.icon_btn_flag{
    width: 24px;
    height: 24px;
}
.edit{
    color: #333;
}
.delete{
    color: #a43738;
}
.cell_btn{
    color: #000;
}
.checked{
    color: #279a24;
}
`
export default MyDiv
