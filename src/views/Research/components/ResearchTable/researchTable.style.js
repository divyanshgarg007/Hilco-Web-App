import styled from 'styled-components'

const MyDiv = styled.div`
position: relative;
.count_box{
    display: flex;
    align-items:center;
    column-gap: 20px;
    margin-bottom: 10px;
}
.count_box h5{
    font-size: 16px;
    text-transform: uppercase;
    color: #000;
    font-weight: 600;
    font-family: "Poppins",sans-serif;
}
.count_box p{
    font-size: 14px;
    color: #333;
    font-weight: 500;
    font-family: "Poppins",sans-serif;
}
.button_group{
    display: flex;
    align-items:center;
    column-gap: 20px;
    margin-bottom: 20px;
}
.button_group a{
    background: #176de5;
    font-size: 14px;
    text-transform: capitalize;
    font-family: "Poppins",sans-serif;
    padding: 6px 16px;
    border-radius: 4px;
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    line-height: 1.75;
}
.column_setting{
    color: #000;
    position: absolute;
    right: 0;
    z-index: 1111;
}
`
export default MyDiv
