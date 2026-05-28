import { SOWPreview } from "@/app/components/SOWPreview";

export default function ProjectViewPage({ params }: { params: { id: string } }) {
  return <SOWPreview projectId={params.id} />;
}
