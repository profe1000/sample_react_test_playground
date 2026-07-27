// Admin Auth Data
export interface IAdminAuthType {
  message?: string;
  data?: IAdminTypeData;
}

export interface IAdminTypeData {
  status: number;
  adminCredentials: Credentials;
  credentials: Credentials;
  id: number
  adminId: number
  apiKey: string
  accessToken: string
  refreshToken: string
  expiresAt: string
}

export interface Credentials {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  emailVerified: boolean;
  dpUrl: string;
  blocked: boolean;
}

// Admin Dashboard Details
export interface IAdminDashboardType {
  status: number;
  message: string;
  data: IAdminDashboardTypeData;
}

export interface IAdminDashboardTypeData {
  userGrowth: UserGrowth[];
  summary: Summary;
  recentUsers: RecentUser[];
}

export interface Summary {
  noOfUsers: number;
  noOfBooks: number;
  noOfStreams: number;
  noOfSubscribers: number;
  user: UserStats;
  book: BookStats;
  stream: StreamStats;
  subscriber: SubscriberStats;
}

export interface UserStats {
  total: number;
  isPositiveTrend: boolean;
  monthlyPercentageChange: number;
}

export interface BookStats {
  total: number;
  isPositiveTrend: boolean;
  monthlyPercentageChange: number;
}

export interface StreamStats {
  total: number;
  isPositiveTrend: boolean;
  monthlyPercentageChange: number;
}

export interface SubscriberStats {
  total: number;
  isPositiveTrend: boolean;
  monthlyPercentageChange: number;
}

export interface UserGrowth {
  dateName: string;
  noOfUsers: number;
}

export interface RecentUser {
  id: number;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  fullName: string;
  imageUrl: string;
  dateModified: string;
  dateCreated: string;
}

// Settings

export interface ISettingsConfig {
  status: number;
  message: string;
  data: ISettingsConfigData;
}

export interface ISettingsConfigData {
  maximumDailyTransferOut3pAmount: number;
  maximumDailyTransferOut3pFrequency: number;
  tranferOut3pAutoInitiationEnabled: boolean;
}
