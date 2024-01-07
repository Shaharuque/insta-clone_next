"use client"
import React from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog2"
import SubmitButton from './SubmitButton';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deletePost } from '@/lib/actions';
import { Button } from './ui/button';

type props = {
    post: any
    modalOpen: boolean,
    handleDeleteConfimeModal: () => void
}
const DeleteConfirmation = ({ post, modalOpen, handleDeleteConfimeModal }: props) => {
    const { userId } = post
    const router = useRouter();
    const path = `/dashboard/p/${post._id}`
    return (
        <Dialog open={modalOpen}
            onOpenChange={(isOpen) => !isOpen && router.push(`/dashboard`)}>

            <DialogContent className="dialogContent w-[300px]">
                <DialogHeader className=" py-2 w-full">
                    <DialogTitle className="mx-auto font-normal text-sm">
                        Are you sure want to delete the post ?
                    </DialogTitle>
                </DialogHeader>
                <div className='grid grid-cols-2 gap-2 mb-5 px-2'>
                    <form
                        action={async (formData: FormData) => {
                            const postId = formData.get("postId");
                            console.log(post, postId, userId);

                            const result = await deletePost(post, postId, userId);
                            console.log("result will be", result);
                            toast.success('Deleted successfully')
                            router.back();
                        }}
                    >
                        <input type="hidden" name="postId" value={post._id} />
                        <Button type='submit' variant={"destructive"} className="text-sm font-bold disabled:cursor-not-allowed w-full p-3">
                            Confime
                        </Button>
                    </form>
                    <Button className="font-bold text-sm" onClick={handleDeleteConfimeModal}>
                        No
                    </Button>
                </div>


            </DialogContent>
        </Dialog>
    );
};

export default DeleteConfirmation;