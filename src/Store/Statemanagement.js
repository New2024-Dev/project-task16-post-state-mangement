import { create } from "zustand"

const Statemanagement = create((set)=>({
    Arrayofobjects: [
        {Pluspic: "/assets/Imgas/plus.svg", countnum: 12, 
            Minuspic: "/assets/Imgas/minus.svg",
                Profilpic: "/assets/Imgas/amyrobson.png", profilname: "amyrobson", 
                Time: "1 month ago", 
                Replypic: "/assets/Imgas/reply.svg",
                Replyword: "Reply", Comment: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well." ,
                id: 1,
                 comments: []},
        
            {Pluspic: "/assets/Imgas/plus.svg", countnum: 5, 
            Minuspic: "/assets/Imgas/minus.svg",
                Profilpic: "/assets/Imgas/maxblagun.png", profilname: "maxblagun", 
                Time: "2 weeks ago", 
                Replypic: "/assets/Imgas/reply.svg",
                Replyword: "Reply", Comment: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            id: 2, 
            comments: [
                {Pluspic: "/assets/Imgas/plus.svg", countnum: 4, 
            Minuspic: "/assets/Imgas/minus.svg",
                Profilpic: "/assets/Imgas/image-ramsesmiron.png", profilname: "ramsesmiron",
                 Time: "2 weeks ago", 
                Replypic: "/assets/Imgas/reply.svg",
                Replyword: "Reply", commentcontent: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            commentid: 1 
            }
            ]}],
            inc: (id, commentid = null) => set((state) => ({
                Arrayofobjects: state.Arrayofobjects.map(item => {
                    if (item.id === id) {
                        if (commentid) {
                            // Increment count for specific comment in the array of comments
                            return {
                                ...item,
                                comments: item.comments.map(comment =>
                                    comment.commentid === commentid
                                        ? { ...comment, countnum: comment.countnum + 1 }
                                        : comment
                                )
                            };
                        } else {
                            // Increment count for the main post
                            return { ...item, countnum: item.countnum + 1 };
                        }
                    }
                    return item;
                })
            })),
        
            dec: (id, commentid = null) => set((state) => ({
                Arrayofobjects: state.Arrayofobjects.map(item => {
                    if (item.id === id) {
                        if (commentid) {
                            // Decrement count for specific comment in the array of comments
                            return {
                                ...item,
                                comments: item.comments.map(comment =>
                                    comment.commentid === commentid
                                        ? { ...comment, countnum: comment.countnum - 1 }
                                        : comment
                                )
                            };
                        } else {
                            // Decrement count for the main post
                            return { ...item, countnum: item.countnum - 1 };
                        }
                    }
                    return item;
                })
            })),
            addnewcomment: (newPostObject) => set((state)=>({Arrayofobjects: [...state.Arrayofobjects, newPostObject]})),
            removecommentbyid:(ID)=> set((state)=>({Arrayofobjects: state.Arrayofobjects.filter(item=>item.id !== ID)})),

            replyVisibleForId: null, // new state to track which comment's reply box is visible
            toggleReplyBox: (id) => set((state) => ({
                replyVisibleForId: state.replyVisibleForId === id ? null : id
            })),
            addReply: (id, replyObject) => set((state) => ({
                Arrayofobjects: state.Arrayofobjects.map(item =>
                    item.id === id ? { ...item, comments: [...item.comments, replyObject] } : item
                )
            })), 
            
            removecomment: (id) => set((state) => ({
                Arrayofobjects: state.Arrayofobjects.map(item => ({
                    ...item,
                    comments: item.comments.filter(comment => comment.commentid !== id)
                }))
            })),


            editingCommentId: null,
  toggleEditing: (id) => set((state) => ({
    editingCommentId: state.editingCommentId === id ? null : id,
  })),
  
  updateComment: (commentid, newCommentContent) => set((state) => ({
    Arrayofobjects: state.Arrayofobjects.map((item) => ({
      ...item,
      comments: item.comments.map((comment) =>
        comment.commentid === commentid
          ? { ...comment, commentcontent: newCommentContent }
          : comment
      ),
    })),
  })),

}))

export default Statemanagement