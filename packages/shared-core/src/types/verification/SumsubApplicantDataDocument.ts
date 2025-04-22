import { Verification } from "#core/services/verification";

// https://docs.sumsub.com/reference/get-applicant-data-via-externaluserid

export interface SumsubApplicantDataDocument {
  id: string;
  createdAt?: Date;
  clientId?: string;
  inspectionId?: string;
  externalUserId?: string;
  sourceKey?: string;
  info?: SumsubInfo;
  fixedInfo?: SumsubFixedInfo;
  email?: string;
  phone?: string;
  applicantPlatform?: string;
  ipCountry?: Alpha3Code;
  authCode?: string;
  agreement?: SumsubAgreement;
  requiredIdDocs?: SumsubRequiredDocs;
  review?: SumsubReview;
  lang?: ISO639Set1;
  type?: "individual" | "company";
  riskLabels?: Object; //
  questionnaires?: Array<SumsubQuestionnaires>;
  notes?: Array<SumsubNotes>;
  tags?: Array<string>;
  memberOf?: Array<SumsubMemberOf>;
}

interface SumsubInfo {
  companyInfo?: SumsubCompanyInfo;
  firstName?: string;
  firstNameEn?: string;
  middleName?: string;
  middleNameEn?: string;
  lastName?: string;
  lastNameEn?: string;
  legalName?: string;
  gender?: string;
  dob?: string;
  placeOfBirth?: string;
  countryOfBirth?: Alpha3Code;
  stateOfBirth?: string;
  country?: Alpha3Code;
  nationality?: Alpha3Code;
  addresses?: Array<SumsubAddress>;
  tin?: string;
  idDocs?: Array<SumsubIdDoc>;
}

interface SumsubCompanyInfo {
  companyName?: string;
  registrationNumber?: string;
  country?: Alpha3Code;
  legalAddress?: string;
  incorporatedOn?: Date;
  applicantPosition?: string;
  type?: string;
  email?: string;
  phone?: string;
  taxId?: string;
  registrationLocation?: string;
  website?: string;
  postalAddress?: string;
  address?: SumsubAddress;
  controlScheme?: string;
  noUBOs?: boolean;
  noShareholders?: boolean;
  beneficiaries?: Array<SumsubBeneficiaries>;
}

interface SumsubBeneficiaries {
  id?: string;
  applicant?: SumsubApplicantDataDocument;
  applicantId?: string;
  beneficiaryInfo?: SumsubBeneficiaryInfo;
  positions?: Array<"director" | "shareholder" | "other">;
  type?: "ubo" | "shareholder" | "representative" | "other";
  types?: Array<"ubo" | "shareholder" | "representative" | "other">;
  shareSize?: number;
  inRegistry?: boolean | null;
  imageIds?: Array<string>;
}

interface SumsubBeneficiaryInfo {
  firstName?: string;
  lastName?: string;
  dob?: Date;
  email?: string;
  taxResidenceCountry?: Alpha3Code;
  shareSize?: number;
}

interface SumsubIdDoc {
  idDocType?: string;
  country?: Alpha3Code;
  firstName?: string;
  firstNameEn?: string;
  middleName?: string;
  middleNameEn?: string;
  lastName?: string;
  lastNameEn?: string;
  issuedDate?: Date;
  issueAuthority?: string;
  issueAuthorityCode?: string;
  validUntil?: Date;
  number?: string;
  additionalNumber?: string;
  dob?: Date;
  address?: SumsubAddress;
}

interface SumsubAddress {
  buildingName?: string;
  flatNumber?: string;
  subStreet?: string;
  subStreetEn?: string;
  street?: string;
  streetEn?: string;
  state?: string;
  stateEn?: string;
  buildingNumber?: string;
  town?: string;
  townEn?: string;
  postCode?: string;
  country?: Alpha3Code;
  formattedAddress?: string;
}

interface SumsubFixedInfo {
  companyInfo?: SumsubCompanyInfo;
  firstName?: string;
  firstNameEn?: string;
  middleName?: string;
  middleNameEn?: string;
  lastName?: string;
  lastNameEn?: string;
  legalName?: string;
  gender?: "M" | "F";
  dob?: string;
  placeOfBirth?: string;
  countryOfBirth?: Alpha3Code;
  stateOfBirth?: string;
  country?: Alpha3Code;
  nationality?: Alpha3Code;
  addresses?: Array<SumsubAddress>;
  tin?: string;
  taxResidenceCountry?: Alpha3Code;
}

interface SumsubAgreement {
  createdAt?: Date;
  acceptedAt?: Date;
  source?: string;
}

interface SumsubRequiredDocs {
  videoIdent?: boolean;
  docSets?: Array<SumsubDocSets>;
  excludedCountries?: Array<Alpha3Code>;
  kybSettings?: Object; //
}

interface SumsubDocSets {
  idDocSetType?: string;
  companyBeneficiaryDefinitions?: Array<SumsubCompanyBeneficiaryDefinitions>;
  companyDocsGroupDefinitions?: Array<SumsubCompanyDocsGroupDefinitions>;
  fields?: Array<SumsubFields>;
  types?: Array<string>;
  videoRequired?:
    | "disabled"
    | "enabled"
    | "photoRequired"
    | "passiveLiveness"
    | "docapture";
  captureMode?: "manualAndAuto" | "manualOnly";
  uploaderMode?: "always" | "never" | "fallback";
  questionnaireDefId?: string;
}

interface SumsubFields {
  name?: string;
  required?: boolean;
}

interface SumsubCompanyBeneficiaryDefinitions {
  category?: string; // "ubos" | "shareholders" | "directors"
  canSkip?: boolean;
  individual?: SumsubIndividual;
  company?: SumsubCompany;
}

interface SumsubIndividual {
  enabled?: boolean;
  levelName?: string;
  fields?: Array<SumsubFields>;
}

interface SumsubCompany extends SumsubIndividual {}

interface SumsubCompanyDocsGroupDefinitions {
  label?: string;
  subTypes?: Array<string>;
  required?: boolean;
}

interface SumsubReview {
  reviewId?: string;
  levelName?: string;
  attemptId?: string;
  attemptCnt?: number;
  elapsedSincePendingMs?: number;
  createDate?: Date;
  reviewDate?: Date;
  reviewResult?: SumsubReviewResult;
  reviewStatus?: string;
}

export interface SumsubReviewResult {
  reviewAnswer: (typeof Verification.sumsubReviewAnswer)[number];
  rejectLabels?: Array<(typeof Verification.sumsubRejectionLabels)[number]>;
  reviewRejectType?: (typeof Verification.sumsubRejectionType)[number];
  clientComment?: string;
  moderationComment?: string;
  buttonIds?: Array<string>;
}

interface SumsubQuestionnaires {
  id?: string;
  sections?: SumsubSections;
  score?: number;
}

interface SumsubSections {
  id?: string;
  condition?: string;
  items?: SumsubItems;
}

interface SumsubItems {
  id?: string;
  condition?: string;
  value?: string;
  values?: Array<string>;
  score?: number;
  dataScores?: Array<{
    value?: string;
    score?: number;
  }>;
}

interface SumsubNotes {
  note?: string;
  moderatorName?: string;
  createdAt?: Date;
}

interface SumsubMemberOf {
  applicantId?: string;
  fullName?: string;
}

type Alpha3Code = string[3];
type ISO639Set1 = string[2];
