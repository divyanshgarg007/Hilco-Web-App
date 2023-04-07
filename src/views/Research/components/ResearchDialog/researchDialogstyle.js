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
.heading{
    font-size: 15px;
    font-weight: 600;
    font-family: "Poppins",sans-serif;
    color: #38648c;
}
.d-flex{
    display: flex;
    width: 100%
}
.label{
    font-size: 14px;
    font-weight: 600;
    font-family: "Poppins",sans-serif;
    color: #333;
    min-width: 130px;
}
.label_data{
    font-size: 14px;
    font-weight: 400;
    font-family: "Poppins",sans-serif;
    color: #333;
}
.label_cost{
    font-size: 14px;
    font-weight: 600;
    font-family: "Poppins",sans-serif;
    color: #333;
}
`
export default MyDiv
