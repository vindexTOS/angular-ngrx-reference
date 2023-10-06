export interface counterModel {
  counter: number
  channelname: string
}

export const initialState: counterModel = {
  counter: 0,
  channelname: 'gio',
}
