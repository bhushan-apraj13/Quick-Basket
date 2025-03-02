import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader className="animate-spin w-16 h-16 text-brandGreen" />
        <p className="text-textPrimary text-lg font-medium">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;