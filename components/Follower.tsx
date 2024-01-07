"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import FollowButton from "./FollowButton";
import UserAvatar from "./UserAvatar";

function Follower({ follower }: { follower: any }) {

  return (
    <div className="p-4 flex items-center justify-between gap-x-3">
        <h1>{follower?.userName}</h1>
    </div>
  );
}

export default Follower;