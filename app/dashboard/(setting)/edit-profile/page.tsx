import ProfileForm from "@/components/ProfileForm";
import { fetchLoggedInUser, fetchUserDetails } from "@/lib/actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit profile",
  description: "Edit profile",
};

async function EditProfile() {
    const loggedIn=await fetchLoggedInUser()
    const profile = await fetchUserDetails(loggedIn?.UserName);

  if (!profile) {
    notFound();
  }

  return (
    <div className="px-12 ml-[10px]">
      <ProfileForm profile={profile} />
    </div>
  );
}

export default EditProfile;
