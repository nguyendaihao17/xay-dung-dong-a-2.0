import { Badge } from "@/components/ui/badge";

export function PublishBadge({ published }: { published: boolean }) {
  return (
    <Badge variant={published ? "green" : "default"}>
      {published ? "Đã đăng" : "Nháp"}
    </Badge>
  );
}

export function FeatureBadge({ featured }: { featured: boolean }) {
  if (!featured) return <span className="text-neutral-300">—</span>;
  return <Badge variant="navy">Nổi bật</Badge>;
}