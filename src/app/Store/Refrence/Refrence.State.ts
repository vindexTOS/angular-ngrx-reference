export interface refrenceTypes {
  id: string
  typeId: string
  key: string
  name: string
  sortIndex: number
  system: string
}

export interface refrenceZones {}

export interface RefrenceTypes {
  channels: refrenceTypes[]
  zones: refrenceTypes[]
  labels: refrenceTypes[]
  languages: refrenceTypes[]
  error: string
}

export const InitialRefrenceState: RefrenceTypes = {
  channels: [],
  zones: [],
  labels: [], // This is the structure where labelData is nested
  languages: [],
  error: '',
}
