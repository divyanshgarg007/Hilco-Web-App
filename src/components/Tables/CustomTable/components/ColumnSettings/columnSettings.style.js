import styled from 'styled-components'

const MyDiv = styled.div`
position:relative;
.close_drawer{
    position:absolute;
    right: 0;
    z-index: 111;
    color: #000;
}
.ka{
    border: solid 1px #cecece;
    margin:50px 20px;
}
.ka-thead-cell{
    font-weight: 600;
    color: #000;
    font-size: 15px;
    font-family: "Poppins",sans-serif;
    background-color: #eee;
    padding: 0px 20px 5px;
    border-right: 1px solid #cecece;
}
.ka-thead-cell:last-child{
    border-right: 0;
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
tbody .ka-row:nth-of-type(odd){
    background-color: #f3f3f3;
}
.ka-cell{
    color: #333;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
    padding: 0px 20px;
}
input[type="checkbox" i]{

}
`
export default MyDiv
