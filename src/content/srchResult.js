//import axios from "axios"
import {SongsList} from '../Context/AppContext'
import { useContext, useState } from 'react'
import axios from "axios"

function SrchResult(props){
    const baseURL = "https://imusify-server.herokuapp.com";
    const arrRslt = props.data
  
    const [isShow,setIsShow]=useState(true)
    // const [songToAdd,setSongToAdd]=useState({})

    const setIsDisplayConfirmWin = useContext(SongsList)[5]
    const setConfirmTxt = useContext(SongsList)[6]
    const setConfirmAction = useContext(SongsList)[7]
    const setSongId = useContext(SongsList)[1]   
    const songId = useContext(SongsList)[11]   
    
    const addSong = async (e)=>{
        debugger
        const trackId = e.target.parentElement.id.split('_')[1]
        const iSong = arrRslt.results[trackId]
        // setSongToAdd(arrRslt.results[trackId])
         setSongId(trackId)
        
        setConfirmTxt('Are you sure you want to add'+ iSong.title +'?')
        setConfirmAction(()=>addToList)
        setIsDisplayConfirmWin(true)
    }   

    function addToList(songId){
        const iSong = arrRslt.results[songId]
        const response = axios.post(`${baseURL}/api/songs/newsong`,{
            user_id : 0, 
            playlist_id : 0, 
            name : iSong.title, 
            videoSrc : iSong.url, 
            thumbnail : iSong.thumbnail.url, 
            uploadedAt : iSong.uploadedAt, 
            duration_formatted : iSong.duration_formatted, 
            isActive:true               
        })
        .then(({response})=>{

          console.log("response: "+ response)
          window.location.reload(true)
          // if(response.status===200){
          //     alert("Song seccesssfully added")
          // }
        })
        .catch((err)=> console.log(err))       
        console.log("newSong",iSong)
        setIsDisplayConfirmWin(false)
    }

    return(<>
        {isShow && <div className="SrchResult">
            {arrRslt.results.map((song, i) => {
                return (
                    <div className="songSrchItem" id={"item_"+i}>
                    <div onClick={addSong}><img width={20} height={20} alt="" src={song.thumbnail.url}/>&nbsp;{song.title.substring(0,50)+'...'}</div>
                    <div className="material-icons" onClick={addSong}>add</div>
                    </div>
                    );
                })}
            <div onClick={()=>setIsShow(false)}> X Close </div>
        </div>}
    </>
    )
 }

 export default SrchResult