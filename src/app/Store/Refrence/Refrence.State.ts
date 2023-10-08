export interface RefrenceTypes {
  channels: any
  zones: any
  labels: any
  languages: any
  error: string
}

export const InitialRefrenceState: RefrenceTypes = {
  channels: [],
  zones: [],
  labels: { labelData: [] }, // This is the structure where labelData is nested
  languages: [],
  error: '',
}
