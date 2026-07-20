import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";

type WarehouseHeaderProps = {
  today: number;
  pending: number;
  accepted: number;
};

export default function WarehouseHeader({
  today,
  pending,
  accepted,
}: WarehouseHeaderProps) {
  return (
    <PageHeader
      eyebrow="CocoaPass Logistics"
      title="Warehouse Operations"
      subtitle="Receiving & Inventory Control"
      icon="🏭"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Today's Receipts"
          value={today}
          icon="📦"
          color="blue"
        />

        <StatCard
          label="Pending Inspection"
          value={pending}
          icon="🕒"
          color="orange"
        />

        <StatCard
          label="Accepted Today"
          value={accepted}
          icon="✅"
          color="green"
        />
      </div>
    </PageHeader>
  );
}