import styled from 'styled-components'

const MyDiv = styled.div`
.wrapper_box{
    background-color: #fff;
    border: solid 1px #cecece;
    border-radius: 5px;
    padding: 20px;
}
.heading{
    font-weight: 600;
    color: #000;
    font-size: 15px;
    font-family: "Poppins",sans-serif;
}
.top_grid{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}
.card_box{
    border: solid 1px darkgrey;
    background-color: #fff;
    border-radius: 5px;
    padding: 5px 8px;
}
.check_data .MuiFormControlLabel-label{
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.card_box p{
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.dragList{
    list-style: none;
    padding: 0;
}
.drag_box{
    align-items: center;
    margin-bottom: 10px;
}
`
export default MyDiv
