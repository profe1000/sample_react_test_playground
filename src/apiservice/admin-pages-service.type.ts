export interface IAdminServices {
  status: number;
  message: string;
  data: IAdminServiceData[];
  meta: Meta;
}

export interface IAdminServiceData {
  id: number;
  title: string;
  imageUrl: string;
  dateModified: string;
  dateCreated: string;
}

export interface Meta {
  total: number;
}

// Admin Roles
export interface IAdminRoles {
  status: number;
  message: string;
  data: IAdminRoleData[];
  meta: Meta;
}

export interface IAdminRoleData {
  id: number;
  title: string;
  isSuperAdmin: boolean;
  dateModified: string;
  dateCreated: string;
}

export interface Meta {
  total: number;
}

// Admin Users
export interface IAdminUsers {
  status: number;
  message: string;
  data: IAdminUserData[];
  meta: Meta;
}

export interface IAdminUserData {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  emailVerified: boolean;
  dpUrl: string;
  blocked: boolean;
  isSystemAdmin: boolean;
  adminRole: AdminRole;
  dateModified: string;
  dateCreated: string;
}

export interface AdminRole {
  id: number;
  title: string;
}

export interface Meta {
  total: number;
}

//Users

export interface IAppUsers {
  status: number;
  message: string;
  data: IAppUserData[];
  meta: Meta;
}

export interface IAppUserData {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  membersType: string; // or MembersType if you have an enum
  districtId: number;
  Zone: string;
  Church: string;
  gender: "Male" | "Female" | string;
  age: number;
  email: string | null;
  guardianName: string;
  guradianPhoneNumber: string;
  relationshipWithGuardian: string;
  allergy: string | null;
  yearOfCamp: number;
  normalizedName: string;
  dateCheckIn: string | null;
  dateCheckOut: string | null;
  dateCreated: string;
  dateModified: string;


  emailVerified: boolean;
  fullName: string;
  imageUrl: string;
  hasActiveSubscription: boolean;
  subscription: Subscription;
  blocked?: boolean;
}

export interface Subscription {
  isActive: boolean;
  nextBillingDate?: string;
  statusId: number;
  statusName: string;
}

export interface Account {
  accountNumber: string;
  accountName: string;
  bankName: string;
}

export interface Wallet {
  balance: number;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
}

export interface Verification {
  bvn?: string;
  bvnVerified: boolean;
  nin: string;
  ninVerified: boolean;
}

// Transactions
export interface ITransactions {
  status: number;
  message: string;
  data: ITransactionsData[];
  meta: Meta;
}

export interface ITransactionsData {
  id: number;
  title: string;
  amount: number;
  currency: string;
  userId: number;
  user: any;
  typeId: number;
  typeName: string;
  dateModified: string;
  dateCreated: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  otherNames: any;
  fullName: any;
  email: string;
}

export interface TransferOut3P {
  id: number;
  accountNumber: string;
  bankCode: string;
}

export interface Meta {
  total: number;
}

// Transfer

export interface ITransfers {
  status: number;
  message: string;
  data: ITransfersData[];
  meta: Meta;
}

export interface ITransfersData {
  id: number;
  transactionId: number;
  amount: number;
  description: string;
  statusId: number;
  status: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  bankCode: string;
  paymentGateway: any;
  reference: string;
  markedAsSpam: boolean;
  receivedAt: any;
  transaction: Transaction;
  dateModified: string;
  dateCreated: string;
}

export interface Transaction {
  id: number;
  user: User;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  otherNames: any;
  fullName: any;
  email: string;
}

export interface Meta {
  total: number;
}

// Transaction Disputes
export interface ITransactionDispute {
  status: number;
  message: string;
  data: ITransactionDisputeData[];
  meta: Meta;
}

export interface ITransactionDisputeData {
  id: number;
  userId: number;
  user: UserDispute;
  transactionId: number;
  transaction: Transaction;
  statusId: number;
  status: string;
  description: string;
  dateModified: string;
  dateCreated: string;
}

export interface UserDispute {
  id: number;
  email: string;
  fullName: string;
}

export interface Transaction {
  id: number;
  amount: string;
  description: string;
  statusId: any;
  status: any;
  typeId: number;
  type: string;
}

export interface Meta {
  total: number;
}

// Books
export interface IAdminBooksType {
  status: number;
  message: string;
  data: IAdminBookData[];
}

export interface IAdminBookData {
  id: number;
  title: string;
  authorId: number;
  author: Author;
  authorName: string;
  coverImageUrl: string;
  bookFileUrl: string;
  summary: string;
  disclaimer: string;
  publishStatusId: number;
  publishStatus: string;
  categoriesText: string[];
  tagsText: string[];
  learningPoints: LearningPoint[];
  keyPoints: KeyPoint[];
  categories: Category[];
  tags: Tag[];
  mainAudio: MainAudio;
  audios: IAudio[];
  isNewRelease: boolean;
  isFree: boolean;
  price: number | string;
  noOfViews: number;
  noOfStreams: number;
  dateModified: string;
  dateCreated: string;
}

export interface Author {
  id: number;
  bio: string;
  imageUrl: string;
}

export interface LearningPoint {
  id: number;
  title: string;
}

export interface KeyPoint {
  id: number;
  title: string;
}

export interface Category {
  id: number;
  bookCategory: BookCategory;
}

export interface BookCategory {
  id: number;
  title: string;
}

export interface Tag {
  id: number;
  title: string;
}

export interface MainAudio {
  id?: string;
  fileUrl: string;
  fileName: string;
  duration: string;
  subTitle: string;
  isMainAudio: boolean;
}

export interface IAudio {
  id?: string;
  fileUrl: string;
  fileName: string;
  duration: string;
  subTitle: string;
  isMainAudio: boolean;
}

// Book Category
export interface IBookCategory {
  status: number;
  message: string;
  data: IBookCategoryData[];
  meta: Meta;
}

export interface IBookCategoryData {
  id: number;
  title: string;
  dateModified?: string;
  dateCreated?: string;
}

export interface Meta {
  total: number;
}

// Book Group
export interface IBookGroup {
  status: number;
  message: string;
  data: IBookGroupData[];
  meta: Meta;
}

export interface IBookGroupData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  bookBookGroups: BookBookGroup[];
  dateModified: string;
  dateCreated: string;
}

export interface BookBookGroup {
  id: number;
  sequence: number;
  bookId: number;
  bookTitle: any;
  book: Book;
}

export interface Book { }

export interface Meta {
  total: number;
}

// Short Category
export interface IShortCategory {
  status: number;
  message: string;
  data: IShortCategoryData[];
  meta: Meta;
}

export interface IShortCategoryData {
  id: number;
  title: string;
  dateModified?: string;
  dateCreated?: string;
}

export interface Meta {
  total: number;
}

// Book Tagged
export interface IBookTag {
  status: number;
  message: string;
  data: IBookTagData[];
  meta: Meta;
}

export interface IBookTagData {
  title: string;
  noOfBooks: number;
}

export interface Meta {
  total: number;
}

// Book Authors

export interface IBookAuthor {
  status: number;
  message: string;
  data: IBookAuthorData[];
  meta: Meta;
}

export interface IBookAuthorData {
  id: number | string;
  name: string;
  bio: string;
  imageUrl?: any;
  dateModified?: string;
  dateCreated?: string;
}

export interface Meta {
  total: number;
}

// Subscription Pricing.

export interface IPricing {
  status: number;
  message: string;
  data: IPricingData[];
  meta: Meta;
}

export interface IPricingData {
  id: number;
  title: string;
  price: number;
  oldPrice: any;
  dateModified: string;
  dateCreated: string;
}

export interface Meta {
  total: number;
}

//Shorts
export interface IShort {
  success: boolean;
  data: IAdminShortData[];
  status?: number;
  message: string;
  meta: Meta;
}

export interface IAdminShortData {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  externalLinkUrl: string;
  duration: any;
  categoriesText: string[];
  tagsText: string[];
  categories: Short_Category[];
  tags: Tag[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  dateModified: string;
  dateCreated: string;
}

export interface Tag {
  id: number;
  title: string;
}

export interface Short_Category {
  id: number;
  shortCategory: ShortCategory;
}

export interface ShortCategory {
  id: number;
  title: string;
}

export interface Meta {
  total: number;
}
