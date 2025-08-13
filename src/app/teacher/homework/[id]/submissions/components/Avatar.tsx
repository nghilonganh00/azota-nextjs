import extractNameEdges from "@/lib/utils/extractNameEdges";
import React from "react";

interface StudentAvatarProps {
  fullname: string;
}

const StudentAvatar: React.FC<StudentAvatarProps> = (props) => {
  const { fullname } = props;

  return (
    <div className="flex size-10 items-center justify-center rounded-full bg-zinc-300">
      <div className="text-lg font-semibold uppercase text-gray-800">{extractNameEdges(fullname)}</div>
    </div>
  );
};

export default StudentAvatar;
