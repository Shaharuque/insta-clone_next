"use client";

import Error from "@/components/Error";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMount from "@/hooks/useMount";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ImageSlider } from "./ImageSlider";
import ShadCnCarousel from "./ShadCnCarousel";
import { InfoIcon } from "lucide-react";
import { updatePost } from "@/lib/actions";

type props = {
    postId: string;
    post: any;
    parsedImages: any;
};

function EditPost({ postId, post, parsedImages }: props) {
    const {content,userId}=post?.post
    const mount = useMount();
    const pathname = usePathname();
    const isEditPage = pathname === `/dashboard/p/${postId}/edit`;
    const router = useRouter();

        const formSchema = z.object({
          caption: z.string().optional()
      })
       
        // 1. Define your form.
        const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
            caption: content,
          },
        })


    if (!mount) return null;

    return (
        <Dialog open={isEditPage} onOpenChange={(open) => !open && router.back()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='font-normal flex items-center gap-1'>Edit Info <InfoIcon size={18} color="gray"/></DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <div className="h-96 md:h-[400px] overflow-hidden rounded-md">
                        <AspectRatio ratio={1 / 1} className="relative h-full">
                            {/* <Image
                                    src="http://res.cloudinary.com/dshvfqndm/image/upload/v1693295751/o2wi75xbu8wbp2ql5i2b.jpg"
                                    alt="Post preview"
                                    fill
                                    className="rounded-md object-cover"
                                /> */}

                            {/* <ShadCnCarousel images={parsedImages}/> */}

                            <ImageSlider multiImage={parsedImages} images={post?.post?.files} />
                        </AspectRatio>
                    </div>
                    <form
                        className="space-y-4"
                        onSubmit={form.handleSubmit(async (values) => {
                            // console.log(values)
                              const res = await updatePost(values?.caption,postId, userId);
                              router.push(`/dashboard`);
                              if (res) {
                                return toast.success("Updated successfully");
                              }
                        })}
                    >
                        <FormField
                            control={form.control}
                            name="caption"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="caption">Caption</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="caption"
                                            id="caption"
                                            placeholder="Write a caption..."
                                            {...field}
                                            className="text-[12px] focus:outline-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            Done
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default EditPost;







//Instagram like
// "use client";

// import Error from "@/components/Error";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Button } from "@/components/ui/button";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog2";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import useMount from "@/hooks/useMount";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { usePathname, useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { z } from "zod";
// import { ImageSlider } from "./ImageSlider";
// import ShadCnCarousel from "./ShadCnCarousel";
// import Link from "next/link";
// import UserAvatar from "./UserAvatar";

// type props = {
//     postId: string;
//     post: any;
//     parsedImages: any;
// };


// function EditPost({ postId, post, parsedImages }: props) {
//     const mount = useMount();
//     const pathname = usePathname();
//     const isEditPage = pathname === `/dashboard/p/${postId}/edit`;
//     const router = useRouter();

//     // const formSchema = z.object({
//     //     id: z.string().min(2, {
//     //         message: "Please enter a valid id.",
//     //     }),
//     //     caption: z.string().min(2, {
//     //         message: "Password must be at least 2 characters.",
//     //     }),
//     // });

//     // const form = useForm<z.infer<typeof formSchema>>({
//     //     resolver: zodResolver(formSchema),
//     //     defaultValues: {
//     //         id: post.id,
//     //         caption: post.caption || "",
//     //     },
//     // });

//     const formSchema = z.object({
//         username: z.string().min(2, {
//           message: "Username must be at least 2 characters.",
//         }),
//       })
       
//         // 1. Define your form.
//         const form = useForm<z.infer<typeof formSchema>>({
//           resolver: zodResolver(formSchema),
//           defaultValues: {
//             username: "",
//           },
//         })
        

//     // 2. Define a submit handler.
//     function onSubmit(values: z.infer<typeof formSchema>) {
//         // Do something with the form values.
//         // ✅ This will be type-safe and validated.
//         console.log(values)
//     }


//     if (!mount) return null;

//     return (
//         <Dialog open={isEditPage} onOpenChange={(open) => !open && router.back()}>
//             <DialogContent className="flex gap-0 flex-col md:flex-row items-start p-0 md:max-w-3xl lg:max-w-5xl h-full max-h-[500px] lg:max-h-[400px] xl:max-h-[500px]">
//                 <div className="flex flex-col justify-between md:h-full md:order-2 w-full max-w-md">
//                     <DialogHeader className="border-b space-y-0 space-x-2.5py-4 pl-3.5 pr-6 py-3">
//                         <div className='flex justify-between'>
//                             <div className='flex items-center gap-2'>
//                                 <Link href={"test"}>
//                                     <UserAvatar user={post?.user} />
//                                 </Link>
//                                 <Link href={"test"} className="font-semibold text-sm">
//                                     {post?.post?.userName}
//                                 </Link>
//                             </div>
//                         </div>
//                     </DialogHeader>

//                     {/* <Form {...form}>
//                         <form
//                             className="space-y-4"
//                             onSubmit={form.handleSubmit(async (values) => {
//                                 console.log('clicked');
//                                 //   const res = await updatePost(values);

//                                 //   if (res) {
//                                 //     return toast.error(<Error res={res} />);
//                                 //   }
//                             })}
//                         >

//                             <FormField
//                                 control={form.control}
//                                 name="caption"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormControl>
//                                             <Input
//                                                 type="caption"
//                                                 id="caption"
//                                                 placeholder="Write a caption..."
//                                                 {...field}
//                                             />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             <Button type="submit" disabled={form.formState.isSubmitting}>
//                                 Done
//                             </Button>
//                         </form>
//                     </Form> */}

//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                             <FormField
//                                 control={form.control}
//                                 name="username"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Username</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="shadcn" {...field} />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />
//                             <Button type="submit">Submit</Button>
//                         </form>
//                     </Form>

//                     <div className="px-2 hidden md:block mt-auto p-2.5">
//                         <time className="text-[11px]  uppercase text-zinc-500 font-medium">
//                             {new Date(post?.post?.createdAt).toLocaleDateString("en-US", {
//                                 month: "long",
//                                 day: "numeric",
//                             })}
//                         </time>
//                     </div>
//                 </div>

//                 <div className="relative overflow-hidden h-96 md:h-[500px] lg:h-[700px] xl:h-[500px] max-w-3xl w-full rounded">
//                     <ImageSlider multiImage={parsedImages} images={post?.post?.files} />
//                 </div>

//             </DialogContent>
//         </Dialog>
//     );
// }

// export default EditPost;