import {
  ApartmentOutlined,
  BankOutlined,
  CalendarOutlined,
  DollarOutlined,
  PlusOutlined,
  ReloadOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Modal, Row, Space, Statistic, Table, Tag, Typography, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import "./HotelOperations.css";

type RecordItem = { id: number;[key: string]: string | number };

type Screen = {
  title: string;
  subtitle: string;
  singular: string;
  icon: React.ReactNode;
  stats: { label: string; value: string | number }[];
  fields: { key: string; title: string; type?: "status" | "money" }[];
  rows: RecordItem[];
};

const screens: Record<string, Screen> = {
  "/admin/billings": {
    title: "Billings", subtitle: "Create, review and track utility bills across your private network.", singular: "bill", icon: <ApartmentOutlined />,
    stats: [{ label: "Bills issued", value: 186 }, { label: "Due this month", value: "NGN 4,850,000" }, { label: "Collection rate", value: "92%" }],
    fields: [{ key: "reference", title: "Bill reference" }, { key: "resident", title: "Resident" }, { key: "period", title: "Billing period" }, { key: "amount", title: "Amount", type: "money" }, { key: "status", title: "Status", type: "status" }],
    rows: [{ id: 1, reference: "BILL-24071", resident: "Adaeze Okafor", period: "July 2026", amount: 24500, status: "Paid" }, { id: 2, reference: "BILL-24072", resident: "Chinedu Obi", period: "July 2026", amount: 18750, status: "Pending" }, { id: 3, reference: "BILL-24073", resident: "Fatima Bello", period: "July 2026", amount: 32100, status: "Issued" }],
  },
  "/admin/fees": {
    title: "Fees", subtitle: "Configure service, connection and late-payment fees for your utility network.", singular: "fee", icon: <BankOutlined />,
    stats: [{ label: "Active fees", value: 6 }, { label: "Collected this month", value: "NGN 385,000" }, { label: "Waived", value: "NGN 42,000" }],
    fields: [{ key: "name", title: "Fee" }, { key: "category", title: "Category" }, { key: "amount", title: "Amount", type: "money" }, { key: "frequency", title: "Frequency" }, { key: "status", title: "Status", type: "status" }],
    rows: [{ id: 1, name: "Meter service charge", category: "Service", amount: 1500, frequency: "Monthly", status: "Active" }, { id: 2, name: "Late payment fee", category: "Penalty", amount: 2500, frequency: "Per invoice", status: "Active" }, { id: 3, name: "Connection fee", category: "Setup", amount: 15000, frequency: "One-time", status: "Active" }],
  },
  "/admin/residents": {
    title: "Residents", subtitle: "Manage resident profiles, meter assignments and account status.", singular: "resident", icon: <UserOutlined />,
    stats: [{ label: "Active residents", value: 284 }, { label: "Meters assigned", value: 267 }, { label: "Accounts overdue", value: 19 }],
    fields: [{ key: "name", title: "Resident" }, { key: "meter", title: "Meter number" }, { key: "unit", title: "Unit" }, { key: "balance", title: "Balance", type: "money" }, { key: "status", title: "Status", type: "status" }],
    rows: [{ id: 1, name: "Adaeze Okafor", meter: "MTR-2048", unit: "Block A, 204", balance: 0, status: "Active" }, { id: 2, name: "Chinedu Obi", meter: "MTR-1357", unit: "Block B, 101", balance: 18750, status: "Pending" }, { id: 3, name: "Fatima Bello", meter: "MTR-8892", unit: "Block C, 308", balance: 32100, status: "Active" }],
  },
  "/admin/room-types": {
    title: "Room types", subtitle: "Configure accommodation types, capacity, beds and nightly pricing.", singular: "room type", icon: <ApartmentOutlined />,
    stats: [{ label: "Active types", value: 6 }, { label: "Average nightly rate", value: "₦84,500" }, { label: "Total inventory", value: 48 }],
    fields: [{ key: "name", title: "Room type" }, { key: "basePrice", title: "Base price", type: "money" }, { key: "capacity", title: "Guests" }, { key: "bedType", title: "Bed type" }, { key: "status", title: "Status", type: "status" }],
    rows: [{ id: 1, name: "Deluxe King", basePrice: 85000, capacity: "2 adults", bedType: "1 King", status: "Active" }, { id: 2, name: "Executive Suite", basePrice: 145000, capacity: "2 adults, 1 child", bedType: "1 King + sofa", status: "Active" }, { id: 3, name: "Classic Twin", basePrice: 68000, capacity: "2 adults", bedType: "2 Twin", status: "Active" }],
  },
  "/admin/rooms": {
    title: "Rooms", subtitle: "Track individual rooms, housekeeping state and maintenance notes.", singular: "room", icon: <BankOutlined />,
    stats: [{ label: "Available now", value: 31 }, { label: "Occupied", value: 13 }, { label: "Out of service", value: 4 }],
    fields: [{ key: "room", title: "Room" }, { key: "roomType", title: "Room type" }, { key: "floor", title: "Floor" }, { key: "cleaning", title: "Cleaning" }, { key: "status", title: "Status", type: "status" }],
    rows: [{ id: 1, room: "101", roomType: "Deluxe King", floor: "1", cleaning: "Clean", status: "Available" }, { id: 2, room: "204", roomType: "Executive Suite", floor: "2", cleaning: "Inspected", status: "Occupied" }, { id: 3, room: "308", roomType: "Classic Twin", floor: "3", cleaning: "In progress", status: "Maintenance" }],
  },
  "/admin/room-reservations": {
    title: "Reservations", subtitle: "Manage guest bookings, stays, allocation and payment progress.", singular: "reservation", icon: <CalendarOutlined />,
    stats: [{ label: "Arrivals today", value: 8 }, { label: "In house", value: 13 }, { label: "Pending payment", value: 4 }],
    fields: [{ key: "reference", title: "Reference" }, { key: "guest", title: "Guest" }, { key: "stay", title: "Stay" }, { key: "room", title: "Room" }, { key: "payment", title: "Payment", type: "status" }],
    rows: [{ id: 1, reference: "SRH-24071", guest: "Adaeze Okafor", stay: "26–29 Jul", room: "204", payment: "Paid" }, { id: 2, reference: "SRH-24072", guest: "Chinedu Obi", stay: "26–28 Jul", room: "101", payment: "Part paid" }, { id: 3, reference: "SRH-24073", guest: "Fatima Bello", stay: "27–30 Jul", room: "—", payment: "Pending" }],
  },
  "/admin/room-maintenance": {
    title: "Room maintenance", subtitle: "Coordinate faults and maintenance work without losing room availability context.", singular: "maintenance task", icon: <ToolOutlined />,
    stats: [{ label: "Open tasks", value: 4 }, { label: "Urgent", value: 1 }, { label: "Completed this week", value: 11 }],
    fields: [{ key: "room", title: "Room" }, { key: "issue", title: "Maintenance note" }, { key: "reported", title: "Reported" }, { key: "assignee", title: "Assigned to" }, { key: "status", title: "Status", type: "status" }],
    rows: [{ id: 1, room: "308", issue: "Air conditioner not cooling", reported: "Today, 08:15", assignee: "Ibrahim Musa", status: "In progress" }, { id: 2, room: "115", issue: "Replace bathroom light", reported: "25 Jul", assignee: "—", status: "Open" }, { id: 3, room: "402", issue: "Door lock inspection", reported: "24 Jul", assignee: "Chukwu N.", status: "Completed" }],
  },
  "/admin/customers": {
    title: "Customers", subtitle: "Keep guest profiles, contact details and stay history ready for every reservation.", singular: "customer", icon: <UserOutlined />,
    stats: [{ label: "Total guests", value: "1,284" }, { label: "Returning guests", value: "38%" }, { label: "New this month", value: 97 }],
    fields: [{ key: "name", title: "Guest" }, { key: "email", title: "Email" }, { key: "phone", title: "Phone" }, { key: "stays", title: "Stays" }, { key: "status", title: "Profile", type: "status" }],
    rows: [{ id: 1, name: "Adaeze Okafor", email: "adaeze@example.com", phone: "+234 803 555 0193", stays: 4, status: "Verified" }, { id: 2, name: "Chinedu Obi", email: "chinedu@example.com", phone: "+234 806 128 4002", stays: 2, status: "Verified" }, { id: 3, name: "Fatima Bello", email: "fatima@example.com", phone: "+234 805 949 2271", stays: 1, status: "New" }],
  },
  "/admin/customer-payment-transactions": {
    title: "Customer payments", subtitle: "Review payment references, gateways, methods and settlement status.", singular: "payment", icon: <DollarOutlined />,
    stats: [{ label: "Collected today", value: "₦1,245,000" }, { label: "Successful", value: 18 }, { label: "Failed / pending", value: 3 }],
    fields: [{ key: "reference", title: "Payment reference" }, { key: "booking", title: "Booking" }, { key: "method", title: "Method" }, { key: "amount", title: "Amount", type: "money" }, { key: "status", title: "Status", type: "status" }],
    rows: [{ id: 1, reference: "PAY-9821", booking: "SRH-24071", method: "Card / Paystack", amount: 255000, status: "Successful" }, { id: 2, reference: "PAY-9822", booking: "SRH-24072", method: "Bank transfer", amount: 85000, status: "Successful" }, { id: 3, reference: "PAY-9823", booking: "SRH-24073", method: "Card / Paystack", amount: 120000, status: "Pending" }],
  },
  "/admin/inflow-transactions": {
    title: "Inflow transactions", subtitle: "Monitor recognised booking income and settlement entries across the property.", singular: "inflow", icon: <DollarOutlined />,
    stats: [{ label: "This month", value: "₦18.4m" }, { label: "Today", value: "₦1.25m" }, { label: "Reconciled", value: "96%" }],
    fields: [{ key: "date", title: "Date" }, { key: "source", title: "Source" }, { key: "reference", title: "Reference" }, { key: "amount", title: "Amount", type: "money" }, { key: "status", title: "Status", type: "status" }],
    rows: [{ id: 1, date: "26 Jul 2026", source: "Room booking", reference: "INV-24071", amount: 255000, status: "Reconciled" }, { id: 2, date: "26 Jul 2026", source: "Room booking", reference: "INV-24072", amount: 85000, status: "Reconciled" }, { id: 3, date: "25 Jul 2026", source: "Late checkout", reference: "INV-24068", amount: 35000, status: "Awaiting review" }],
  },
  "/admin/transactions": {
    title: "Transactions", subtitle: "A unified ledger for payments, refunds, invoices and booking-related movement.", singular: "transaction", icon: <DollarOutlined />,
    stats: [{ label: "Gross volume", value: "₦18.4m" }, { label: "Refunded", value: "₦185,000" }, { label: "Outstanding", value: "₦640,000" }],
    fields: [{ key: "date", title: "Date" }, { key: "type", title: "Type" }, { key: "reference", title: "Reference" }, { key: "amount", title: "Amount", type: "money" }, { key: "status", title: "Status", type: "status" }],
    rows: [{ id: 1, date: "26 Jul 2026", type: "Payment", reference: "PAY-9821", amount: 255000, status: "Successful" }, { id: 2, date: "25 Jul 2026", type: "Refund", reference: "RFD-1008", amount: -50000, status: "Completed" }, { id: 3, date: "25 Jul 2026", type: "Invoice", reference: "INV-24068", amount: 35000, status: "Issued" }],
  },
};

const money = (value: string | number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(Number(value));
const tagColor = (value: string) => /successful|paid|available|active|verified|reconciled|completed|issued|clean/i.test(value) ? "success" : /pending|open|progress|part|review|maintenance/i.test(value) ? "warning" : "default";

export default function HotelOperations() {
  const location = useLocation();
  const screen = screens[location.pathname] || screens["/admin/billings"];
  const [rows, setRows] = useState(screen.rows);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [api, contextHolder] = notification.useNotification();

  // The component is reused across routes, so refresh local demo data when the screen changes.
  useEffect(() => {
    setRows(screen.rows);
    setQuery("");
    setDraft({});
    setModalOpen(false);
  }, [location.pathname, screen]);

  const visibleRows = useMemo(() => rows.filter(row => Object.values(row).join(" ").toLowerCase().includes(query.toLowerCase())), [rows, query]);
  const columns: ColumnsType<RecordItem> = screen.fields.map(field => ({ title: field.title, dataIndex: field.key, key: field.key, render: (value: string | number) => field.type === "money" ? <span className={Number(value) < 0 ? "text-red-600" : "font-medium"}>{money(value)}</span> : field.type === "status" ? <Tag color={tagColor(String(value))}>{value}</Tag> : value }));

  const addRecord = () => {
    const primary = screen.fields[0].key;
    const values = draft;
    const next = screen.fields.reduce<RecordItem>((record, field) => ({ ...record, [field.key]: values[field.key] || (field.type === "status" ? "Pending" : "—") }), { id: Date.now() });
    next[primary] = draft[primary] || `New ${screen.singular}`;
    setRows(current => [next, ...current]); setDraft({}); setModalOpen(false);
    api.success({ message: `${screen.singular.replace(/^./, c => c.toUpperCase())} added`, description: "Saved locally until the backend endpoint is connected." });
  };

  return <div className="hotel-operations">
    {contextHolder}
    <div className="operations-header"><div><Typography.Title level={2}>{screen.icon} {screen.title}</Typography.Title><Typography.Paragraph>{screen.subtitle}</Typography.Paragraph></div><Space><Button icon={<ReloadOutlined />} onClick={() => setRows([...screen.rows])}>Reset demo</Button><Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>Add {screen.singular}</Button></Space></div>
    <Row gutter={[16, 16]} className="operations-stats">{screen.stats.map(stat => <Col xs={24} sm={8} key={stat.label}><Card><Statistic title={stat.label} value={stat.value} /></Card></Col>)}</Row>
    <Card className="operations-table" title={`${screen.title} register`} extra={<input className="operations-input" type="search" placeholder={`Search ${screen.title.toLowerCase()}`} value={query} onChange={event => setQuery(event.target.value)} />}><Table columns={columns} dataSource={visibleRows} rowKey="id" pagination={{ pageSize: 8 }} /></Card>
    <Modal open={modalOpen} title={`Add ${screen.singular}`} onCancel={() => setModalOpen(false)} onOk={addRecord} okText="Save locally"><form className="operations-form" onSubmit={event => { event.preventDefault(); addRecord(); }}>{screen.fields.slice(0, 4).map(field => <label key={field.key}>{field.title}{field.type === "status" ? <select value={draft[field.key] || "Pending"} onChange={event => setDraft(current => ({ ...current, [field.key]: event.target.value }))}><option>Pending</option><option>Active</option><option>Available</option><option>Successful</option></select> : <input required={field.key === screen.fields[0].key} type={field.type === "money" ? "number" : "text"} placeholder={field.title} value={draft[field.key] || ""} onChange={event => setDraft(current => ({ ...current, [field.key]: event.target.value }))} />}</label>)}</form></Modal>
  </div>;
}
