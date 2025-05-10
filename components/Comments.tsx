"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/providers/auth-provider";
import { formatDistanceToNow } from "date-fns";
import { addCommentToProduct } from "@/app/actions/product";
import { useToast } from "@/components/ui/use-toast";
import { IComment } from "@/models/product";

interface CommentsProps {
  productId: string;
  comments: IComment[];
}

export default function Comments({
  productId,
  comments: initialComments,
}: CommentsProps) {
  const [comments, setComments] = useState<IComment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const { state } = useAuthContext();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    if (!state.is_Verfied) {
      toast({
        title: "Please login to comment",
        variant: "destructive",
      });
      return;
    }

    try {
      const comment = await addCommentToProduct(productId, newComment);
      setComments([...comments, comment]);
      setNewComment("");
      toast({
        title: "Comment added successfully",
      });
    } catch (error) {
      toast({
        title: "Failed to add comment",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      {/* Comments List */}
      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div
            key={comment?._id}
            className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{comment?.createdBy}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {comment?.createdAt &&
                    formatDistanceToNow(new Date(comment?.createdAt), {
                      addSuffix: true,
                    })}
                </p>
              </div>
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {comment?.content}
            </p>
          </div>
        ))}
      </div>

      {/* Add Comment Form */}
      {state?.is_Verfied ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setNewComment(e.target.value)
            }
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={!newComment.trim() || isLoading}>
            {isLoading ? "Adding..." : "Add Comment"}
          </Button>
        </form>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          Please login to leave a comment
        </p>
      )}
    </div>
  );
}
