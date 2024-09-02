import Statemanagement from "../../Store/Statemanagement"
import "./Comentshow.css"
import { useState } from "react"
import Plusicon from "/assets/Imgas/plus.svg"
import Minusicon from "/assets/Imgas/minus.svg"
import Replyicon from "/assets/Imgas/reply.svg"
import Amyimg from "/assets/Imgas/amyrobson.png"
import Maximg from "/assets/Imgas/maxblagun.png"


function Comentshow(){
    const {Arrayofobjects, inc, dec, addnewcomment, removecommentbyid,
         replyVisibleForId, toggleReplyBox, addReply, 
         removecomment,editingCommentId, toggleEditing,
          updateComment} = Statemanagement();
    
         const [commentvalue, setcommentvalue] = useState("");

    const [replyValue, setReplyValue] = useState("");

    const [editValue, setEditValue] = useState("");

    function handleReplyChange(event) {
        setReplyValue(event.target.value);
    }

    function handleReplySubmit(parentId) {
        const newReply = {
            Pluspic: Plusicon, countnum: 0, Minuspic: Minusicon,
            Profilpic: Amyimg, profilname: "Aya", 
            Time: "now", Replypic: Replyicon,
            Replyword: "Reply", commentcontent: replyValue, 
            commentid: Arrayofobjects.length + 1 
        };
        addReply(parentId, newReply);
        setReplyValue(""); // Clear input after submission
        toggleReplyBox(parentId); // Close the reply box after submission
    }
    
    

    function postSendChange(event){
        setcommentvalue(event.target.value)
    }

    function postSendClick(){
        const newPostObject = {
            Pluspic: Plusicon, countnum: 0, Minuspic: Minusicon,
                Profilpic: Amyimg, profilname: "Aya", 
                Time: "now", Replypic: Replyicon,
                Replyword: "Reply", Comment: commentvalue,
                 id: Arrayofobjects.length +1, comments: []};
                 addnewcomment(newPostObject);
    };

    function deleteBtnClick(id){
        removecommentbyid(id)
    }

    function Deletecommentbtn(commentid){
        removecomment(commentid)
    }

    
    return(
        <div>
        {Arrayofobjects.map((item)=> {
            return(
                <div>
                <div id="maindiv">
                <div id="counterdiv">
                    <button onClick={() => inc(item.id)} ><img src={item.Pluspic}/></button>
                    <label id="number">{item.countnum}</label>
                    <button onClick={() => dec(item.id)} ><img src={item.Minuspic}/></button>
                </div>
    
                <div id="profilmain">
                    <div id="profildiv">
                        <img src={item.Profilpic} />
                        <h3 id="headname">{item.profilname}</h3>
                        <span id="time">{item.Time}</span>
                        
                        {item.profilname == 'Aya'?
                        <button className="deletebtn" uniqid={item.id}
                        onClick={() => deleteBtnClick(item.id)}>Delete</button>:
                        null}
                        
    
                        <button id="reply" onClick={() => toggleReplyBox(item.id)}>
                            <img src={item.Replypic}/>{item.Replyword}</button>
                    </div>
    
                    <div id="pargdiv">
                        <p id="parg">{item.Comment}</p>
                    </div>
    
                </div>
            </div> 
             
            {replyVisibleForId === item.id && (

        <div id="replydiv">
        <input value={replyValue} onChange={handleReplyChange}
        placeholder="Add new reply" />
        <button onClick={() => handleReplySubmit(item.id)}
        >Reply</button>
        </div>

                        )}

                         {/* Render replies */}
                    {item.comments && item.comments.map((reply) => (
                        <div key={reply.commentid} className="reply">
                            
                            <div id="maincommentdiv">
        <div id="commentdiv">
            <div id="counterdiv">
                <button onClick={() => inc(item.id, reply.commentid)}
                ><img src={reply.Pluspic}/></button>
                <label id="number">{reply.countnum}</label>
                <button onClick={() => dec(item.id, reply.commentid)}
                 ><img src={reply.Minuspic}/></button>
            </div>

            <div id="profilcommentmain">
                <div id="profilcommentdiv">
                    <img src={reply.Profilpic} />
                    <h3 id="headname">{reply.profilname}</h3>
                    <span id="time">{reply.Time}</span>
                    
                    
                    <button className="deletecommentbtn" 
                    onClick={() => Deletecommentbtn(reply.commentid)}
                    
                    >Delete</button>
                    

                    {editingCommentId === reply.commentid ? (
                    <button id="cancelbtn"
                     onClick={() => toggleEditing(reply.commentid)}>
                     Cancel</button>
                        ) : (
                        <button id="replycomment" onClick={() => {
                         toggleEditing(reply.commentid);
                        setEditValue(reply.commentcontent);}}>
                        Edit</button>
                                 )}

                    
                </div> 


                <div id="pargcommentdiv">
               
                {editingCommentId === reply.commentid ? (
                    <>
                     <input id="editinput"
                     value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                        />
                    <button id="updatebtn" onClick={() => {
                  updateComment(reply.commentid, editValue);
                  toggleEditing(null); }}>
                        Update</button>
                         </>
                     ) : (
                  
                    <p id="pargcomment">{reply.commentcontent}</p>)}
                </div>

            </div>
        </div>

        </div>


                            
                        </div>
                    ))}

            </div>
            )
            
        })}

<div id="senddiv">
            <input value={commentvalue} onChange={postSendChange}
            id="input" placeholder="Add a comment"></input>
            <button id="butt" onClick={postSendClick}>Send</button>
        </div>
        </div>

    )
}

export default Comentshow
