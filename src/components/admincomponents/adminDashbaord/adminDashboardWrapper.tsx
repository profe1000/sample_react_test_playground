import {
  CheckCircleFilled,
  DownOutlined,
  MoreOutlined,
  ReloadOutlined,
  SearchOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import "./adminDashboardComponent.css";

const usageData = [48, 0, 45, 52, 70, 51, 49, 40, 55, 102, 124, 54, 34, 71, 98, 82, 123, 94, 119, 80, 101, 67, 55, 121, 114, 113, 50, 0, 4, 0, 0];

const meters = [
  { no: "32597045", unit: "Unit 1B", user: "Harry Isidore", credits: "-₦1,121,551.20", fees: "₦17,457,593.49", lastSync: "12:00 PM  (an hour ago)", alert: "Tamper Alarm(4)", status: "Connected" },
  { no: "32597046", unit: "Unit 2A", user: "Adaeze Okafor", credits: "₦324,500.00", fees: "₦0.00", lastSync: "11:58 AM  (an hour ago)", alert: "—", status: "Connected" },
  { no: "32597047", unit: "Unit 3C", user: "Chinedu Obi", credits: "₦88,240.00", fees: "₦12,000.00", lastSync: "11:55 AM  (an hour ago)", alert: "Low credit", status: "Connected" },
];

const SummaryRing = ({ value, label, tone }: { value: string; label: string; tone: "purple" | "teal" | "gold" }) => (
  <div className="meter-ring-item">
    <div className={`meter-ring ${tone}`}><span>{value}</span></div>
    <span>{label}</span>
  </div>
);

export const AdminDashboardWrapper = () => (
  <main className="utility-dashboard p-4">
    <header className="utility-dashboard__header">
      <h1>Dashboard</h1>
      <div className="utility-address">Plot 2, Prince Bode Adebowale Cr.<br />Lekki, Lagos NG</div>
    </header>

    <div className="site-selector">Parkway Office Complex <DownOutlined /></div>

    <section className="utility-overview">
      <article className="usage-panel">
        <h2>Usage History</h2>
        <div className="usage-legend"><span><i className="teal-key" />Energy Credits Used (₦)</span><span><i className="purple-key" />Total Available Credits (₦)</span></div>
        <div className="usage-chart" aria-label="Energy credit usage for the last month">
          <div className="usage-scale left"><span>₦200</span><span>₦150</span><span>₦100</span><span>₦50</span><span>0</span></div>
          <div className="usage-bars">{usageData.map((value, index) => <div className="usage-bar-column" key={index}><div className={value < 8 ? "usage-bar purple" : "usage-bar"} style={{ height: `${value}px` }} />{index % 2 === 0 && <small>{index === 0 ? "Jun 30" : `Jul ${index}`}</small>}</div>)}</div>
          <div className="usage-scale right"><span>₦50,000</span><span>₦40,000</span><span>₦30,000</span><span>₦20,000</span><span>₦10,000</span><span>0</span></div>
        </div>
      </article>

      <div className="utility-summary-column">
        <article className="meter-summary-panel">
          <h2>Meter Summary</h2>
          <div className="meter-summary-content">
            <SummaryRing value="2/10" label="Meters Online" tone="purple" />
            <SummaryRing value="9/10" label="Meter Breaker Connected" tone="teal" />
            <SummaryRing value="0/10" label="Accounts in Good Standing" tone="gold" />
            <div className="power-source"><WifiOutlined /><span>System Upgrade<br />Required</span><strong>Power Source</strong></div>
          </div>
        </article>
        <div className="metric-cards">
          <article><small>Usage This Month (₦)</small><strong>₦512,412.00</strong><em>+64%</em></article>
          <article><small>Usage This Month (kWh)</small><strong>2,553 kWh</strong><em>+222%</em></article>
          <article><small>Total Available Credits (₦)</small><strong>-₦32,957,055.88</strong></article>
        </div>
      </div>
    </section>

    <section className="meter-table-panel">
      <div className="meter-table-toolbar">
        <label><SearchOutlined /><input placeholder="Search by meter number, user names or unit name" /></label>
        <span>10 of 10 meters</span>
        <span className="updated"><ReloadOutlined /> Updated 27 Jul 2026 1:19 PM GMT+1</span>
      </div>
      <div className="meter-table-scroll"><table>
        <thead><tr><th>Meter No</th><th>Unit Name</th><th>Primary User</th><th>Credits</th><th>Fees Due</th><th><WifiOutlined /></th><th>Last Sync</th><th>Alerts</th><th>Meter Status</th><th>Action</th></tr></thead>
        <tbody>{meters.map((meter, index) => <tr key={meter.no} className={index === 0 ? "needs-attention" : ""}><td><a href="#meter">{meter.no}</a></td><td>{meter.unit}</td><td>{meter.user}</td><td>{meter.credits}</td><td className="fees-due">{meter.fees}</td><td><CheckCircleFilled /></td><td>{meter.lastSync}</td><td className="meter-alert">{meter.alert}</td><td>{meter.status}</td><td><button aria-label="Open meter"><MoreOutlined /></button></td></tr>)}</tbody>
      </table></div>
    </section>
  </main>
);

export default AdminDashboardWrapper;
