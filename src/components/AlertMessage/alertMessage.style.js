import styled from 'styled-components'

const MyDiv = styled.div `
.custom_snack{
    width: 100%;
    text-align: center;
    @media(max-width:767px){
        width: 100%;
    }
}
.custom_snack_alert{
    justify-content:center;
    color:#000;
    font-weight:600;
    font-size:1rem;
    text-transform:capitalize;
    box-shadow: 0px 0px 5px 0px #ccc;
}
`

export default MyDiv
