"use state";

import { SyncLoader } from "react-spinners";

export default function LoadingSync() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex justify-center">
        <SyncLoader color="#c45200" loading size={15} />;
      </div>
    </div>
  );
}
