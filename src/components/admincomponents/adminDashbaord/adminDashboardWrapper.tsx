"use client";

import {
  ReloadOutlined,
  DashboardOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Button, Spin, message, Card, Row, Col, Alert, Statistic } from "antd";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { IAdminAuthType } from "../../../apiservice/admin-AuthService.type";
import { useAppSelector } from "../../../Redux/reduxCustomHook";
import type { RootState } from "../../../Redux/store";
import type { ILoadState } from "../../../utils/loading.utils.";
import GeneralCharts from "../../Sharedcomponents/Charts/GeneralCharts";
import { adminGetDashboardDetails } from "../../../apiservice/admin-AuthService";


// ─── Types ────────────────────────────────────────────────────────────────────

interface MemberPerDistrict {
  districtId: number;
  districtName: string;
  totalMembers: number;
}

interface GenderPerDistrict {
  districtId: number;
  districtName: string;
  male: number;
  female: number;
}

interface CheckInPerDistrict {
  districtId: number;
  districtName: string;
  checkIns: number;
}

interface DashboardData {
  membersPerDistrict: MemberPerDistrict[];
  genderPerDistrict: GenderPerDistrict[];
  checkInPerDistrict: CheckInPerDistrict[];
}

// ─── Mock fetch (replace with your real API call) ─────────────────────────────

const fetchDashboardData = async (): Promise<DashboardData> => {
  const res = await adminGetDashboardDetails();
  return res.data;
  // return {
  //   membersPerDistrict: [{ districtId: 1, districtName: "DST", totalMembers: 5 }],
  //   genderPerDistrict: [{ districtId: 1, districtName: "DST", male: 4, female: 0 }],
  //   checkInPerDistrict: [{ districtId: 1, districtName: "DST", checkIns: 2 }],
  // };
};

// ─── Component ────────────────────────────────────────────────────────────────

export const AdminDashboardWrapper = () => {
  const [loadState, setLoadState] = useState<ILoadState>("notLoading");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const authAdminData: IAdminAuthType = useAppSelector(
    (state: RootState) => state?.AdminAuthData
  );

  const fetchData = async (showMessage = false) => {
    setLoadState("loading");
    try {
      const data = await fetchDashboardData();
      if (!data) {
        setLoadState("noData");
        return;
      }
      setDashboardData(data);
      setLastUpdated(new Date());
      setLoadState("completed");
      if (showMessage) message.success("Dashboard data refreshed successfully!");
    } catch {
      setLoadState("error");
      message.error("Failed to load data. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ── Derived totals ────────────────────────────────────────────────────────

  const totalMembers =
    dashboardData?.membersPerDistrict.reduce((s, d) => s + d.totalMembers, 0) ?? 0;
  const totalCheckIns =
    dashboardData?.checkInPerDistrict.reduce((s, d) => s + d.checkIns, 0) ?? 0;
  const totalDistricts = dashboardData?.membersPerDistrict.length ?? 0;
  const totalMale =
    dashboardData?.genderPerDistrict.reduce((s, d) => s + d.male, 0) ?? 0;
  const totalFemale =
    dashboardData?.genderPerDistrict.reduce((s, d) => s + d.female, 0) ?? 0;

  // ── Gender chart data ─────────────────────────────────────────────────────

  const genderChartData = dashboardData
    ? {
      labels: dashboardData.genderPerDistrict.map((d) => d.districtName),
      datasets: [
        {
          label: "Male",
          data: dashboardData.genderPerDistrict.map((d) => d.male),
          backgroundColor: "rgba(239, 68, 68, 0.8)",   // red-500
          borderColor: "rgb(220, 38, 38)",              // red-600
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: "Female",
          data: dashboardData.genderPerDistrict.map((d) => d.female),
          backgroundColor: "rgba(59, 130, 246, 0.8)",  // blue-500
          borderColor: "rgb(37, 99, 235)",              // blue-600
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    }
    : null;

  const genderChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      tooltip: {
        callbacks: {
          label: (ctx: any) => ` ${ctx.dataset.label}: ${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
  };

  // ── Animation variants ────────────────────────────────────────────────────

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  // ── State renderers ───────────────────────────────────────────────────────

  const renderLoadingState = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center items-center mt-16">
      <div className="text-center">
        <Spin size="large" />
        <p className="mt-4 text-gray-600">Loading dashboard data…</p>
      </div>
    </motion.div>
  );

  const renderErrorState = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center items-center mt-16">
      <Card className="text-center max-w-md">
        <Alert message="Error Loading Data" description="We encountered an issue while loading your dashboard data. Please try refreshing." type="error" showIcon className="mb-4" />
        <Button icon={<ReloadOutlined />} onClick={() => fetchData(true)} type="primary" size="large">Refresh Dashboard</Button>
      </Card>
    </motion.div>
  );

  const renderNoDataState = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center items-center mt-16">
      <Card className="text-center max-w-md">
        <Alert message="No Data Available" description="There's no data available at the moment. The system may still be collecting data." type="info" showIcon className="mb-4" />
        <Button icon={<ReloadOutlined />} onClick={() => fetchData(true)} type="primary" size="large">Check Again</Button>
      </Card>
    </motion.div>
  );

  // ── Main render ───────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <DashboardOutlined className="text-blue-600" />
                Dashboard
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                Welcome back, {authAdminData?.data?.credentials?.fullName || "Admin"}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {lastUpdated && (
                <div className="text-sm text-gray-500">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}
              <Button
                icon={<ReloadOutlined />}
                onClick={() => fetchData(true)}
                loading={loadState === "loading"}
                type="default"
              >
                Refresh
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loadState === "loading" && renderLoadingState()}
          {loadState === "error" && renderErrorState()}
          {loadState === "noData" && renderNoDataState()}

          {loadState === "completed" && (
            <motion.div
              key="dashboard-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* ── Summary Stats ── */}
              <motion.div variants={itemVariants}>
                <Row gutter={[16, 16]}>
                  {[
                    {
                      title: "Total Members",
                      value: totalMembers,
                      icon: <TeamOutlined style={{ color: "#3b82f6" }} />,
                      color: "#3b82f6",
                    },
                    {
                      title: "Total Check-ins",
                      value: totalCheckIns,
                      icon: <CheckCircleOutlined style={{ color: "#10b981" }} />,
                      color: "#10b981",
                    },
                    {
                      title: "Districts",
                      value: totalDistricts,
                      icon: <EnvironmentOutlined style={{ color: "#f59e0b" }} />,
                      color: "#f59e0b",
                    },
                    {
                      title: "Male / Female",
                      value: `${totalMale} / ${totalFemale}`,
                      icon: <TeamOutlined style={{ color: "#ef4444" }} />,
                      color: "#ef4444",
                      isText: true,
                    },
                  ].map((stat) => (
                    <Col key={stat.title} xs={24} sm={12} lg={6}>
                      <Card
                        className="shadow-sm"
                        bodyStyle={{ padding: "20px" }}
                        style={{ borderTop: `3px solid ${stat.color}` }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-500 text-sm font-medium">{stat.title}</span>
                          <span className="text-xl">{stat.icon}</span>
                        </div>
                        {stat.isText ? (
                          <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                        ) : (
                          <Statistic value={stat.value as number} valueStyle={{ color: stat.color, fontWeight: 700 }} />
                        )}
                      </Card>
                    </Col>
                  ))}
                </Row>
              </motion.div>

              {/* ── Charts Row ── */}
              <motion.div variants={itemVariants}>
                <Row gutter={[24, 24]}>

                  {/* Gender per District Chart */}
                  <Col xs={24} lg={16}>
                    <Card
                      title={
                        <div className="flex items-center gap-2">
                          <TeamOutlined className="text-blue-600" />
                          <span>Gender Distribution per District</span>
                        </div>
                      }
                      className="shadow-sm h-full"
                      bodyStyle={{ padding: "16px" }}
                    >
                      <div style={{ height: 380 }}>
                        {genderChartData && (
                          <GeneralCharts
                            data={genderChartData}
                            title=""
                            frameStyle={{
                              width: "100%",
                              height: "400px",
                              border: "0px",
                            }}
                            chartHeight={380}
                            options={genderChartOptions}
                          />

                        )}
                      </div>
                      {/* Legend callout */}
                      <div className="flex items-center gap-6 mt-3 px-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: "rgb(239,68,68)" }} />
                          Male
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: "rgb(59,130,246)" }} />
                          Female
                        </div>
                      </div>
                    </Card>
                  </Col>

                  {/* Members & Check-ins per District Table */}
                  <Col xs={24} lg={8}>
                    <Card
                      title={
                        <div className="flex items-center gap-2">
                          <EnvironmentOutlined className="text-amber-500" />
                          <span>District Summary</span>
                        </div>
                      }
                      className="shadow-sm h-full"
                      bodyStyle={{ padding: "16px" }}
                    >
                      <div className="space-y-3">
                        {dashboardData?.membersPerDistrict.map((district) => {
                          const checkIn = dashboardData.checkInPerDistrict.find(
                            (c) => c.districtId === district.districtId
                          );
                          const gender = dashboardData.genderPerDistrict.find(
                            (g) => g.districtId === district.districtId
                          );
                          return (
                            <div
                              key={district.districtId}
                              className="rounded-lg border border-gray-100 p-4 bg-white"
                              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <span className="font-semibold text-gray-800 text-base">
                                  {district.districtName}
                                </span>
                                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                                  ID {district.districtId}
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div>
                                  <div className="text-lg font-bold text-blue-600">
                                    {district.totalMembers}
                                  </div>
                                  <div className="text-xs text-gray-500">Members</div>
                                </div>
                                <div>
                                  <div className="text-lg font-bold text-green-600">
                                    {checkIn?.checkIns ?? 0}
                                  </div>
                                  <div className="text-xs text-gray-500">Check-ins</div>
                                </div>
                                <div>
                                  <div className="text-lg font-bold text-gray-700">
                                    <span className="text-red-500">{gender?.male ?? 0}</span>
                                    <span className="text-gray-400 mx-0.5">/</span>
                                    <span className="text-blue-500">{gender?.female ?? 0}</span>
                                  </div>
                                  <div className="text-xs text-gray-500">M / F</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Card>
                  </Col>

                </Row>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboardWrapper;