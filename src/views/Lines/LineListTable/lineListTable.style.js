import styled from 'styled-components'

const MyDiv = styled.div`
margin-top:130px;
margin-bottom: 100px;
position: relative;
.page_heading{
    background: #f6f6f6;
    border-bottom: 1px solid #ddd;
    box-shadow: 0px 2px 2px 0px rgb(50 50 50 / 10%);
    top: 50px;
    position: fixed;
    left: 0;
    z-index: 111;
    width: 100%;
}
.page_heading p{
    margin: 0;
    text-align: left;
    padding: 10px 30px;
    font-size: 20px;
    color: #555;
    font-weight: 600;
    text-transform: uppercase;
    font-family: "Poppins",sans-serif;
}
.column_setting{
    color: #000;
    position: absolute;
    right: 0;
    z-index: 1111;
}
.ka-cell{
    padding: 5px 10px!important;
}
`
export default MyDiv
