import { Avatar } from "@/components/ui/avatar";
import type { AvatarProps } from "@radix-ui/react-avatar";
import type { User } from "next-auth";
import Image from "next/image";

type Props = Partial<AvatarProps> & {
  user: User | undefined;
};

function ProfileAvatar({ user, ...avatarProps }: Props) {
  return (
    <Avatar className="relative h-8 w-8" {...avatarProps}>
      <Image
        src={user?.image || "https://github.com/shadcn.png"}
        fill
        alt={`${user?.name}'s profile picture`}
        className="rounded-full object-cover"
      />
    </Avatar>
  );
}

export default ProfileAvatar;


// "use client";

// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import useMount from "@/hooks/useMount";
// import { UpdateUser } from "@/lib/schemas";
// import { UploadButton } from "@/lib/uploadthing";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useSession } from "next-auth/react";
// import { useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { z } from "zod";
// import SubmitButton from "./SubmitButton";
// import UserAvatar from "./UserAvatar";
// import { Form } from "./ui/form";
// import type { AvatarProps } from "@radix-ui/react-avatar";


// type Props = Partial<AvatarProps> & {
//   image: string | undefined;
//   profileName: string | undefined;
//   loggedIn:any;
// };

// function ProfileAvatar({
//   image,
//   profileName,
//   loggedIn,
//   children,
//   ...avatarProps
// }: Props) {

//   const isCurrentUser = loggedIn?.UserName === profileName;

//   const form = useForm<z.infer<typeof UpdateUser>>({
//     resolver: zodResolver(UpdateUser),
//     defaultValues: {
//       id: loggedIn?.UserId,
//       image: loggedIn?.ProfileImageUrl || "",
//       name: loggedIn?.FirstName || "",
//       username: loggedIn?.UserName || "",
//     },
//   });
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [open, setOpen] = useState(false);
//   const mount = useMount();

//   if (!mount || !loggedIn) return null;

//   if (!isCurrentUser)
//     return <UserAvatar user={loggedIn} className="w-20 h-20 md:w-36 md:h-36" />;

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>{children}</DialogTrigger>

//       <DialogContent className="dialogContent">
//         <DialogHeader>
//           <DialogTitle className="mx-auto font-medium text-xl py-5">
//             Change Profile Photo
//           </DialogTitle>
//         </DialogHeader>

//         {isCurrentUser && (
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(async (values) => {
//                 console.log("values", values);
//                 // const { message } = await updateProfile(values);
//                 // toast(message);

//                 setOpen(false);
//               })}
//             >
//               <FormField
//                 control={form.control}
//                 name="image"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <UploadButton
//                         className="text-sm h-11 ut-button:bg-transparent border-y border-zinc-300 dark:border-neutral-700 ut-button:text-blue-500 ut-button:font-bold ut-allowed-content:hidden ut-button:ring-0 ut-button:focus-visible:ring-0 ut-button:ring-offset-0 ut-button:w-full"
//                         endpoint="imageUploader"
//                         onClientUploadComplete={(res) => {
//                           form.setValue("image", res[0].url);

//                           if (inputRef.current) {
//                             inputRef.current.click();
//                           }
//                         }}
//                         onUploadError={(error: Error) => {
//                           console.error(error);
//                           toast.error("Upload failed");
//                         }}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               {loggedIn?.ProfileImageUrl && (
//                 <SubmitButton
//                   className="text-red-500 border-b border-zinc-300 dark:border-neutral-700 font-bold disabled:cursor-not-allowed w-full text-sm p-3"
//                   onClick={() => {
//                     form.setValue("image", "");
//                     if (inputRef.current) {
//                       inputRef.current.click();
//                     }
//                   }}
//                   disabled={form.formState.isSubmitting}
//                 >
//                   Remove Current Photo
//                 </SubmitButton>
//               )}

//               <input type="submit" hidden ref={inputRef} />
//             </form>
//           </Form>
//         )}

//         <DialogClose className="postOption border-0 w-full p-3">
//           Cancel
//         </DialogClose>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default ProfileAvatar;

