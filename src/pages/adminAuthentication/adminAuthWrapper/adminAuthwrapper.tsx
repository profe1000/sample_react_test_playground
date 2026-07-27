import { SafetyCertificateOutlined } from "@ant-design/icons";
import "./../adminAuth.css";

type IAdminAuthWrapper = {
  testId?: string;
  children?: React.ReactNode;
  imageType?: "user" | "admin";
  title?: string;
  brandName?: string;
  description?: string;
};

/** Shared visual panel used by every admin authentication screen. */
const AdminAuthWrapper = ({
  testId,
  children,
  title = "Welcome to",
  brandName = "SupaRecords Hotel",
  description =
    "Manage inventory, accounting, sales, purchasing and warehouses from one secure cloud platform.",
}: IAdminAuthWrapper) => {
  return (
    <aside
      data-testid={testId}
      className="fixed inset-y-0 left-0 z-10 flex w-1/2 overflow-hidden  text-white"
    >
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full " />

      <div className="relative m-auto w-full max-w-xl px-10 py-12 xl:px-16">
        <div className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2 text-sm font-medium">
          <SafetyCertificateOutlined className="mr-2" />
          Trusted Business Platform
        </div>

        <h1 className="mt-8 text-5xl font-black leading-tight xl:text-6xl">
          {title}
          <span className="block bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
            {brandName}
          </span>
        </h1>

        <p className="mt-7 text-lg leading-8 text-slate-300 xl:text-xl xl:leading-9">
          {description}
        </p>

        <div className="mt-10 grid gap-4">
          {[
            "Hotel Management",
            "Real-time Reporting",
            "Room Services",
            "24/7 Support",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-medium xl:p-5 xl:text-base"
            >
              <span className="mr-3 text-red-300">✓</span>
              {item}
            </div>
          ))}
        </div>

        {children}
      </div>
    </aside>
  );
};

export default AdminAuthWrapper;
