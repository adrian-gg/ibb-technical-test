import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useData from "@/storages/useData";

import { User as UserIcon } from "lucide-react";
import { useEffect } from "react";

const User = () => {
  const { user, setUser } = useData();

  useEffect(() => {
    if (user) return;
    setUser();
  }, [user, setUser]);

  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={user?.avatar} alt={user?.name} />
        <AvatarFallback>
          <UserIcon />
        </AvatarFallback>
      </Avatar>
      <div className="hidden lg:flex flex-col">
        <span className="text-sm font-medium">{user?.name}</span>
        <span className="text-xs text-primary/40">{user?.email}</span>
      </div>
    </div>
  );
};

export default User;
