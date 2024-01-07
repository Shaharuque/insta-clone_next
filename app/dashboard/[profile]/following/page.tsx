import FollowingModal from "@/components/FollowingModal";
import { fetchUserDetails } from '@/lib/actions';
import { fetchFollowedUsers } from "@/lib/data";

async function FollowingPage({
    params: { profile },
}: {
    params: {
        profile: string;
    };
}) {
    const userDetails = await fetchUserDetails(profile)
    const { userId } = userDetails?.details?.user
    const userFollowing = await fetchFollowedUsers(userId)
    //console.log(userFollowing)
    return <FollowingModal username={profile} followings={userFollowing?.following}/>;
}

export default FollowingPage;