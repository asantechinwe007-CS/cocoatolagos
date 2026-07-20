"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/dashboard/farms", icon: "🌱", label: "Farms" },
  { href: "/dashboard/batches", icon: "📦", label: "Batches" },
  { href: "/dashboard/shipments", icon: "🚚", label: "Shipments" },
  { href: "/dashboard/drivers", icon: "👨‍✈️", label: "Drivers" },
  { href: "/dashboard/documents", icon: "📄", label: "Documents" },
  { href: "/dashboard/compliance", icon: "🛡️", label: "Compliance" },
  { href: "/dashboard/shipment-map", icon: "🗺️", label: "Live Map" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-[#0b1220] to-[#111827] border-r border-gray-800 flex flex-col">

      <div className="p-8 border-b border-gray-800">

        <div className="text-4xl mb-2 text-center">🍫</div>

        <h1 className="text-3xl font-extrabold text-center text-green-400">
          CocoaPass
        </h1>

        <p className="text-center text-gray-400 text-sm mt-2">
          Chain Visibility Platform
        </p>

      </div>

      <nav className="flex-1 p-5">

        {links.map((link) => {

          const active =
            pathname === link.href ||
            pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center gap-4 rounded-2xl px-5 py-4 mb-3 transition-all duration-300 ${
                active
                  ? "bg-green-600 shadow-lg shadow-green-900/40"
                  : "hover:bg-[#1f2937]"
              }`}
            >
              <span className="text-2xl">
                {link.icon}
              </span>

              <span className="font-medium">
                {link.label}
              </span>

              {active && (
                <span className="ml-auto w-2 h-2 rounded-full bg-white"></span>
              )}
            </Link>
          );
        })}

      </nav>

      <div className="p-5 border-t border-gray-800">

        <div className="rounded-2xl bg-[#161b22] p-4">

          <div className="text-green-400 font-bold">
            EUDR READY
          </div>

          <div className="text-gray-400 text-sm mt-1">
            Farm-to-Export Traceability
          </div>

        </div>

      </div>

    </aside>
  );
}