import styled from 'styled-components'

const MyDiv = styled.div`
.dialog_title{
    padding: 10px 0px;
    font-size: 20px;
    font-weight: 600;
    font-family: "Poppins",sans-serif;
}
.dialog_header{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.dialog_content{
    padding: 0;
}
.dialog_box{
    padding: 0px 20px;
}
.icon{
 color: #000;
 padding: 0;
}
.d-flex{
    display: flex;
    width: 100%
    justify-content: end;
    column-gap: 20px;
}
.card_box{
    border: solid 1px darkgrey;
    background-color: #fff;
    border-radius: 5px;
    padding: 5px 8px;
    margin-top: 10px;
}
.card_box p{
    font-weight: 500;
    color: #555;
    font-size: 14px;
    font-family: "Poppins",sans-serif;
}
.mb-20{
    margin:0px 0px 20px 0px;
}
.dragList{
    list-style: none;
    padding: 0;
}
`
export default MyDiv
