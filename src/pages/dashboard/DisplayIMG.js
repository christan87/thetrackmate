import React from "react";
import { useAuth } from "../../contexts/AuthFirebaseContext";
import Avatar from '@material-ui/core/Avatar';

export default function DisplayIMG(props){
    const { currentUser } = useAuth();
    return(
        <div className="d-flex justify-content-around">
            {!currentUser?
                <></>
                :
                <>{currentUser.photoURL?
                    <img src={props.imgURL} alt="profile picture" width="100" height="100" style={{borderRadius: "50%"}}  className="my-3"/>
                    :
                    <Avatar src="/broken-image.jpg" style={{width: "100px", height: "100px"}} className="my-3" />
                }</>
            }
        </div>
    )
}