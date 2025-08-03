// pages/DashboardPage.jsx

import DashLayout from "../components/dashboard/DashLayout";

export default function DashboardPage() {
  return (
    <div className=" flex flex-col">
      <DashLayout>
        <div className="h-full">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-auto gap-4 mb-6">
          <div className="rounded-2xl border bg-secondary-light dark:bg-secondary-dark p-6">Card 1</div>
          <div className="rounded-2xl border border-white p-6">Card 2</div>
          <div className="rounded-2xl border border-white p-6">Card 3</div>
        </div>

        {/* Bottom Section */}
        <div className="rounded-2xl border bg-boxes-light dark:bg-boxes-dark p-6 h-70">
          Main Content (Chart/Table/etc.)
        </div>
        </div>
      </DashLayout>
    </div>
  );
}
