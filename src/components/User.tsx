import React, { memo } from "react";
import ChevronRightIcon from "../icons/ChevronRightIcon";

export interface UserRecord {
  avatarUrl: string;
  login: string;
  name?: string;
  url: string;
  email: string | null;
  followers?: {totalCount: number}
  repositories: {totalCount: number}
  createdAt: string;
  description?: string;
  bio?: string;
}

const User = memo<{ user: UserRecord }>(({ user }) => {
  return (
    <a className="block h-full border-b-2 border-gray-200" href={user.url}>
      <div className="flex h-full items-center">
        <img className="w-16 h-16 mr-4 rounded-md border" alt={`Avatar for ${user.login}`} src={user.avatarUrl} />
        <div className="flex-grow">
          <div className="flex">
            <div className="text-blue-800 mr-2">{user.login}</div>
            <div className="text-gray-800">{user.name}</div>
          </div>
          <div className="text-gray-600 mb-4">
            {user.description || user.bio}
          </div>
          <div className="hidden sm:flex">
            <div className="text-gray-600 flex-grow">{user.email}</div>
            <div className="text-gray-600">joined on</div>
            <div className="text-gray-900 w-24 ml-2">{user.createdAt.split('T')[0]}</div>
            <div className="text-gray-900 w-20 text-right mr-2">{user.followers?.totalCount || 0}</div>
            <div className="text-gray-600">followers</div>
            <div className="text-gray-900 w-20 text-right mr-2">{user.repositories.totalCount || 0}</div>
            <div className="text-gray-600">repositories</div>
          </div>
        </div>
        <div className="hidden md:flex w-32 items-center justify-center">
          <ChevronRightIcon className="text-gray-700 w-10 h-auto" />
        </div>
      </div>
    </a>
  );
});

export default User;
