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
    padding: 20px 0px 10px;
}
.dialog_box{
    padding: 0px 20px;
}
.icon{
 color: #000;
}
.d-flex{
    display: flex;
    width: 100%
    justify-content: end;
    column-gap: 20px;
}
.mb-20{
    margin-bottom:20px;
}
.label{
    font-size: 14px;
    font-weight: 500;
    font-family: "Poppins",sans-serif;
    color: #333;
}
`
export default MyDiv
