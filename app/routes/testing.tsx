import { Link } from "react-router";
import { Plus } from "lucide-react";

export default function Testing() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b px-4 py-4">
        <h1 className="text-lg font-semibold text-gray-800">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Track your collections and payments
        </p>
      </header>

      {/* Content */}
      <main className="px-4 py-6 max-w-3xl mx-auto space-y-6">

        {/* Total Collected */}
        <section className="bg-blue-700 text-white rounded-2xl p-6 shadow-sm">
          <p className="text-sm opacity-80">Total Collected</p>
          <h2 className="text-3xl font-bold mt-2">₦245,000</h2>

          <div className="mt-4 flex items-center justify-between text-sm opacity-90">
            <span>12 Contributors</span>
            <span>5 Collections</span>
          </div>
        </section>

        {/* Active & Closed */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-2xl font-semibold mt-1 text-gray-800">
              3
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border">
            <p className="text-sm text-gray-500">Closed</p>
            <p className="text-2xl font-semibold mt-1 text-gray-800">
              2
            </p>
          </div>
        </section>

        {/* Recent Payments */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold text-gray-800">
              Recent Payments
            </h3>
            <button className="text-sm text-blue-700 font-medium">
              View all
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                name: "John Doe",
                collection: "Birthday Fund",
                amount: "₦5,000",
                date: "Feb 14, 2026",
              },
              {
                name: "Amina Yusuf",
                collection: "School Dues",
                amount: "₦10,000",
                date: "Feb 13, 2026",
              },
              {
                name: "David Mark",
                collection: "Trip Fund",
                amount: "₦3,500",
                date: "Feb 12, 2026",
              },
            ].map((payment, index) => (
              <div
                key={index}
                className="bg-white border rounded-2xl p-4 shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {payment.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {payment.collection}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    {payment.amount}
                  </p>
                  <p className="text-xs text-gray-500">
                    {payment.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Create Button */}
      <Link
        to="/collections/new"
        className="fixed bottom-6 right-6 bg-blue-700 text-white p-4 rounded-full shadow-lg active:scale-95 transition"
      >
        <Plus size={20} />
      </Link>
    </div>
  );
}
