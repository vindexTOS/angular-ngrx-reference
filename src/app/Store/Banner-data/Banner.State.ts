export interface BannerData {
  data: {
    entities: BannerDataObj[]
    searchAFter: string[]
    total: number
  }
  singleData?: any
  localObj?: any
}

export interface BannerQueryTypes {
  queryParams: {
    includes: string[]
    excludes: string[]
    search: string
    ids: string[]
    excludeIds: string[]
    targetAudienceIds: string[]
    query: {}
    sortBy: string
    sortDirection: string
    pageIndex: number
    pageSize: number
    searchAfter: string[]
  }
  data: BannerData
}
export interface keyType {
  key:
    | 'includes'
    | 'excludes'
    | 'search'
    | 'ids'
    | 'excludeIds'
    | 'targetAudienceIds'
    | 'query'
    | 'sortBy'
    | 'sortDirection'
    | 'pageIndex'
    | 'pageSize'
    | 'searchAfter'
}
export interface BannerDataObj {
  name?: string
  channelid?: string
  language?: string
  zoneid?: string
  priority?: number
  fileId?: string
  url?: string
  startDate?: string
  endDate?: string
  active?: boolean
  label?: string[]
}

export const BannerQueryState: any = {
  queryParams: {
    includes: [],
    excludes: [],
    search: '',
    ids: [],
    excludeIds: [],
    targetAudienceIds: [],
    query: {},
    sortBy: 'name',
    sortDirection: 'asc',
    pageIndex: 0,
    pageSize: 10,
    searchAfter: [],
  },
  data: [],
  singleData: {},
  localObj: {},
}
