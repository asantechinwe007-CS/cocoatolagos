"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const menu = {
  admin: [
    { href: "/dashboard", icon: "📊", label: "Dashboard" },
    { href: "/dashboard/farms", icon: "🌱", label: "Farms" },
    { href: "/dashboard/batches", icon: "📦", label: "Batches" },
    { href: "/dashboard/shipments", icon: "🚚", label: "Shipments" },
    { href: "/dashboard/warehouse", icon: "🏬", label: "Warehouse" },
    { href: "/dashboard/export", icon: "🚢", label: "Exports" },
    { href: "/dashboard/buyer", icon: "🌍", label: "Buyer Portal" },
    { href: "/dashboard/passports", icon: "📱", label: "Cocoa Passports" },
    { href: "/dashboard/documents", icon: "📄", label: "Documents" },
    { href: "/dashboard/compliance", icon: "🛡️", label: "Compliance" },
    { href: "/dashboard/reports", icon: "📈", label: "Reports" },
    { href: "/dashboard/drivers", icon: "👨‍✈️", label: "Drivers" },
    { href: "/dashboard/users", icon: "👥", label: "Users" },
    { href: "/dashboard/shipment-map", icon: "🗺️", label: "Live Map" },
  ],

  exporter: [
    { href: "/dashboard", icon: "📊", label: "Dashboard" },
    { href: "/dashboard/farms", icon: "🌱", label: "Farms" },
    { href: "/dashboard/batches", icon: "📦", label: "Batches" },
    { href: "/dashboard/shipments", icon: "🚚", label: "Shipments" },
    { href: "/dashboard/warehouse", icon: "🏬", label: "Warehouse" },
    { href: "/dashboard/export", icon: "🚢", label: "Export Lots" },
    { href: "/dashboard/buyer", icon: "🌍", label: "Buyer Portal" },
    { href: "/dashboard/passports", icon: "📱", label: "Cocoa Passports" },
    { href: "/dashboard/documents", icon: "📄", label: "Documents" },
    { href: "/dashboard/compliance", icon: "🛡️", label: "Compliance" },
    { href: "/dashboard/reports", icon: "📈", label: "Reports" },
  ],

  driver: [
    { href: "/dashboard", icon: "📊", label: "Dashboard" },
    { href: "/dashboard/shipments", icon: "🚚", label: "My Shipments" },
    { href: "/dashboard/evidence", icon: "📷", label: "Evidence Upload" },
  ],
};

export default function Sidebar() {
  const pathname = usePathname();

  const { data: session } = useSession();

  const role = (session?.user as any)?.role;

  const links = menu[role as keyof typeof menu] ?? [];

  return (
    <aside className="w-72 h-screen sticky top-0 bg-gradient-to-b from-[#0b1220] to-[#111827] border-r border-gray-800 flex flex-col">

      {/* Logo */}
      <div className="border-b border-gray-800 p-6">
        <div className="flex justify-center">
          <Image
  src="/piazza-navona-logo.png"
  alt="Piazza Navona"
  width={150}
  height={150}
  priority
  className="w-auto h-auto object-contain"

          />
        </div>

        <h1 className="text-center text-3xl font-black text-green-400 mt-4">
          CocoaPass
        </h1>

        <p className="text-center text-xs text-gray-400 mt-2">
          Powered by Piazza Navona Nigeria Ltd.
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-4 py-5">
        {links.map((link) => {
          const active =
            pathname === link.href ||
            pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 mb-2 transition-all ${
                active
                  ? "bg-green-600 text-white"
                  : "text-gray-300 hover:bg-[#1f2937]"
              }`}
            >
              <span className="text-2xl">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-800 p-5">
        <div className="rounded-xl bg-[#161b22] p-4">
          <p className="text-green-400 font-bold">🟢 EUDR READY</p>

          <p className="text-gray-400 text-sm mt-2">
            Farm-to-Export Traceability Platform
          </p>
        </div>
      </div>
    </aside>
  );
}