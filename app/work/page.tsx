import { Suspense } from "react";
import { WorkView } from "@/components/work/WorkView";

export default function WorkPage() {
  return (
    <Suspense fallback={null}>
      <WorkView />
    </Suspense>
  );
}
