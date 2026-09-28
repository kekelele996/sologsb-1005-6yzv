export type Role = 'author' | 'examiner' | 'viewer'

/** 证据片段核验状态：未填写/未确认 -> 待核验；摘录与正文失配 -> 待复核；人工确认且匹配 -> 已核验 */
export type EvidenceStatus = 'unverified' | 'review' | 'verified'

export const evidenceStatusLabel: Record<EvidenceStatus, string> = {
  unverified: '待核验',
  review: '待复核',
  verified: '已核验'
}

export interface Claim {
  id: string
  number: number
  title: string
  text: string
  independent: boolean
}

export interface Paragraph {
  id: string
  section: string
  text: string
}

/** 单条支持关系（特征 + 段落）对应的证据片段；同一段落被多个特征引用时各自独立、互不覆盖 */
export interface SupportEvidence {
  id: string
  featureId: string
  paragraphId: string
  excerpt: string
  status: EvidenceStatus
  note: string
  updatedAt: string
}

export interface Feature {
  id: string
  claimId: string
  label: string
  text: string
  parentId: string | null
  referenceIds: string[]
  supportIds: string[]
  ownerRole: Role
}

export interface Annotation {
  id: string
  featureId: string
  authorRole: Role
  authorName: string
  text: string
  updatedAt: string
}

export interface OrphanMapping {
  id: string
  featureLabel: string
  paragraphId: string
  reason: string
  /** 特征删除时留存的证据片段快照，便于清理前核对落点 */
  excerpt: string
  status: EvidenceStatus
  note: string
}

export interface ClaimVersion {
  id: string
  name: string
  createdAt: string
  claims: Claim[]
  features: Feature[]
  evidences: SupportEvidence[]
}

export interface Position {
  tab: string
  claimId: string
  featureId: string | null
  scrollY: number
}

export interface WorkbenchState {
  claims: Claim[]
  paragraphs: Paragraph[]
  features: Feature[]
  evidences: SupportEvidence[]
  annotations: Annotation[]
  orphanMappings: OrphanMapping[]
  versions: ClaimVersion[]
  role: Role
  selectedClaimId: string
  selectedFeatureId: string | null
  activeTab: string
  currentUserRole: Role
}

export interface ValidationIssue {
  id: string
  severity: 'error' | 'warning'
  type: 'cycle' | 'missing-support' | 'orphan-mapping' | 'empty-feature' | 'evidence-empty' | 'evidence-mismatch'
  featureId?: string
  paragraphId?: string
  title: string
  detail: string
}
