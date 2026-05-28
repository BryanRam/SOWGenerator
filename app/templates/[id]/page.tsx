import { TemplateConfigView } from "@/app/components/TemplateConfigView";

export default function TemplateConfigPage({ params }: { params: { id: string } }) {
  return <TemplateConfigView projectId={params.id} />;
}
