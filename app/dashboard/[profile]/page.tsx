//Dynamic routing applied to the profile page

import ProfilePostsGrid from "@/components/ProfilePostsGrid";
import { PostsSkeleton } from "@/components/Skeletons";
import { fetchPostsByUsername } from "@/lib/data";
import { Suspense } from "react";

async function ProfilePage({ params }: { params: { profile: string } }) {
  //console.log(params.profile);
  const username = params.profile;
  const posts = await fetchPostsByUsername(username);

  return(
    <Suspense fallback={<PostsSkeleton></PostsSkeleton>}>
      <ProfilePostsGrid posts={posts}/>
    </Suspense>
  )
}

export default ProfilePage;