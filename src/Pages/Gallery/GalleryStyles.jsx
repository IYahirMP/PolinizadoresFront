import { fontSize } from "@mui/system";

export const galleryStyles = {
    presentation:{
      backgroundColor:'#13CE66',
      height:{
        xs: '400px'
      },
      display:'flex',
      justifyContent: 'center',
      alignItems:'center',
      padding: '3%',
    },
    presentationText:{
      color:'#fff',
      width:{
        xs:'80vw',
        md:'60vw'
      },
      fontWeight:'bold',
      textAlign:'center',
      fontSize:{
        xs:'2rem',
        md:'5rem'
      }
    },
    cardBox:{
      backgroundColor: "F5F5F5",
      display:'flex',
      justifyContent:'space-around',
      padding: '5vh 5vw',
      flexWrap: 'wrap'
    },
    pagination:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      flexWrap:'wrap',
      margin:'5vh',
      textAlign:'center'
    }
  }