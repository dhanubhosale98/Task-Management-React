import { useContext, useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import {
  Paperclip,
  Link,
  Smile,
  MoreHorizontal,
  ThumbsUp,
  Reply,
  Pencil,
  Trash2,
  Send,
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import api from "@/api/api";
import { useForm } from "react-hook-form";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const initialComments = [
  {
    id: 1,
    user: "Dhanashri Bhosale",
    initials: "DB",
    time: "2 days ago",
    content:
      "I have started working on this feature. Will push the initial code by today EOD.",
    avatar: "",
    likes: 0,
  },
];

function CommentItem({
  comment,
  onLike,
  viewDrawerData,
  comments,
  setComments,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [editedCommentText, setEditedCommentText] = useState(comment.text);
  const deleteComments = async () => {
    try {
      await api.post(`/comments/delete/${comment._id}`);
      toast.add({ type: "success", title: "Comment deleted Successfully." });

      let newCom = comments.filter((x) => x._id != comment._id);
      setComments(newCom);
      setIsEdit(false);
    } catch (error) {
      toast.add({
        title: error.message,
      });
      console.log(error.message, "rooorrrr");
    }
  };

  let { register, handleSubmit, control, getValues, setValue } = useForm({
    defaultValues: {
      comment: comment?.text ?? "",
    },
  });
  const onCommentEdit = async (data) => {
    try {
      const resp = await api.post(`/comments/edit/${comment._id}`, {
        text: editedCommentText,
      });
      setEditedCommentText(resp.data.data.text);
      let commentResp = await api.get(`/comments/${viewDrawerData._id}`);
      setComments(commentResp.data.data);

      toast.add({ type: "success", title: "Comment Updated Successfully." });
      setIsEdit(false);
    } catch (error) {}
    console.log(error, "................data");
  };

  const onCancelEdit = () => {
    setIsEdit(false);
    setEditedCommentText(comment.text);
  };
  return (
    <div className="group flex gap-3 py-5">
      {/* Avatar */}{" "}
      <Avatar className="h-9 w-9 shrink-0">
        {" "}
        <AvatarImage src={comment.avatar} />
        <AvatarFallback className="bg-primary/10 font-medium text-primary">
          {getInitials(
            comment.createdBy?.firstName,
            comment.createdBy?.lastName,
          )}
        </AvatarFallback>
      </Avatar>
      {/* Comment Content */}
      <div className="min-w-0 flex-1">
        {/* User + Time */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">
            {comment.createdBy?.firstName + " " + comment.createdBy?.lastName}
          </span>

          <span className="text-xs text-muted-foreground">
            {formatCommentTime(comment?.createdAt)}
          </span>
        </div>

        {/* Comment Text */}

        {isEdit ? (
          <FieldGroup>
            <Field>
              <Input
                value={editedCommentText}
                onChange={(event) => setEditedCommentText(event.target.value)}
                placeholder="Edit Comment"
              />
            </Field>
          </FieldGroup>
        ) : (
          <p className="mt-2 text-sm leading-6 text-foreground">
            {comment?.text}
          </p>
        )}

        {/* Actions */}
        <div className="mt-3 flex items-center gap-1">
          {/* Reply */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <Reply className="h-3.5 w-3.5" />
            Reply
          </Button>

          {/* Edit + Delete */}

          <span className="text-muted-foreground">•</span>

          {/* condition for edit or done button */}
          {isEdit ? (
            <Button
              onClick={() => onCommentEdit()}
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <Pencil className="h-3.5 w-3.5" />
              Done
            </Button>
          ) : (
            <Button
              onClick={() => {setIsEdit(true);setEditedCommentText(comment.text)}}
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </Button>
          )}

          {/* condition for cancel button */}
          {isEdit ? (
            <div>
              {" "}
              <span className="text-muted-foreground">•</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onCancelEdit}
                className="h-8 gap-1.5 px-2 text-xs text-muted-foreground hover:text-destructive"
              >
                Cancel
              </Button>
            </div>
          ) : (
            ""
          )}
          <span className="text-muted-foreground">•</span>

          <Button
            variant="ghost"
            size="sm"
            onClick={deleteComments}
            className="h-8 gap-1.5 px-2 text-xs text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </Button>

          {/* Like */}

          <>
            <span className="text-muted-foreground">•</span>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(comment._id)}
              className="h-8 gap-1.5 px-2 text-xs text-primary"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              {comment.likes}
            </Button>
          </>

          {/* More */}
          {/* <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default function CommentsSection({ viewDrawerData }) {
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState("");
  const { user, login, logout } = useContext(AuthContext);

  useEffect(() => {
    getAllComments();
    console.log(viewDrawerData, "........view drawer data");
  }, []);

  const getAllComments = async () => {
    try {
      let comment = await api.get(`/comments/${viewDrawerData._id}`);
      console.log(comment.data.data, "....comment from backend" );
     let cd=comment.data.data.map((x)=> {return {...x,likes:0}});
     console.log(cd,"..............cd")
      setComments(cd);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async () => {
    const text = commentText.trim();

    if (!text) {
      return;
    }
    const newComment = {
      createdBy: user._id,
      text: text,
      taskId: viewDrawerData._id,
      parent: null,
    };

    try {
      let result = await api.post(`/comments`, newComment);
      console.log(result, "...new comment");
      setComments((previous) => [...previous, {...result.data.data,likes:0}]);
      setCommentText("");
    } catch (error) {
      console.log(error, "...error");
    }
  };

  const handleLike = (commentId) => {
    setComments((previous) =>
      previous.map((comment) =>
        comment._id === commentId
          ? {
              ...comment,
              likes: comment.likes + 1,
            }
          : comment,
      ),
    );
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      {/* =========================
COMMENTS HEADER
========================== */}{" "}
      <div className="shrink-0 px-1 pb-2">
        {" "}
        <h3 className="text-lg font-semibold">
          Comments ({comments.length}){" "}
        </h3>{" "}
      </div>
      {/* =========================
      SCROLLABLE COMMENTS
  ========================== */}
      <div className=" flex-1 overflow-y-auto pr-2">
        <div className="divide-y">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onLike={handleLike}
              viewDrawerData={viewDrawerData}
              comments={comments}
              setComments={setComments}
            />
          ))}
        </div>
      </div>
      {/* =========================
      FIXED COMMENT COMPOSER
  ========================== */}
      <div className="shrink-0 border-t pt-3">
        {/* Textarea + Send */}
        <div className="relative">
          <Textarea
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="Add a comment..."
            className="
          min-h-[60px]
          max-h-[100px]
          resize-none
          border
          pr-14
          text-sm
          shadow-none
          focus-visible:ring-1
        "
          />

          <Button
            onClick={handleAddComment}
            disabled={!commentText.trim()}
            size="icon"
            className="
          absolute
          bottom-2
          right-2
          h-7
          w-7
        "
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Attachment / Link / Smile */}
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
          >
            <Link className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export const formatCommentTime = (date) => {
  const commentDate = new Date(date);
  const now = new Date();

  const diffMs = now - commentDate;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  // Less than 1 minute
  if (seconds < 60) {
    return "Just now";
  }

  // Less than 1 hour
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  // Same calendar day
  if (
    commentDate.getFullYear() === now.getFullYear() &&
    commentDate.getMonth() === now.getMonth() &&
    commentDate.getDate() === now.getDate()
  ) {
    return `Today at ${commentDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }

  // Yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (
    commentDate.getFullYear() === yesterday.getFullYear() &&
    commentDate.getMonth() === yesterday.getMonth() &&
    commentDate.getDate() === yesterday.getDate()
  ) {
    return `Yesterday at ${commentDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }

  // Days ago
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days < 7) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  // Older than 7 days
  return commentDate.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getInitials = (firstName = "", lastName = "") => {
  const firstInitial = firstName.trim().charAt(0);
  const lastInitial = lastName.trim().charAt(0);

  return `${firstInitial}${lastInitial}`.toUpperCase();
};
