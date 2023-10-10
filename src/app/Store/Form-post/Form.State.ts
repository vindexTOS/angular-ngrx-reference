export interface FormType {
  name: string
  channelid: string
  language: string
  zoneid: string
  priority: number
  fileId: string
  url: string
  startDate: string
  endDate: string
  active: boolean
  label: string[]
  error?: string
  succsess?: string
  loading?: boolean
}
export interface formData {
  formData: FormType
}
export const initialFormState: FormType = {
  name: '',
  channelid: '',
  language: '',
  zoneid: '',
  priority: 0,
  fileId: '',
  url: '',
  startDate: '',
  endDate: '',
  active: false,
  label: [],
  error: '',
  succsess: '',
  loading: false,
}
