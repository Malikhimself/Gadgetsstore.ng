import { AdminSidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-neutral-950 flex">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
