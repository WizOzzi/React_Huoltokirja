import './App.css'

const Message = ({message, isPositive }) => {

    let tyyli = '';

    if (isPositive === true){
        tyyli = "pos"
       
        // message="Onnistui!"
    }
    else{
        tyyli = "neg"
       // message="Epäonnistui!"
    }

    return(
        <div className={tyyli}>
        {message}
        </div>
        
       
    )
   
}
export default Message