export const BOARD_TYPE = {
  private: 'private',
  public: 'public'
}

export const MONGODB_OBJECT_ID_RULE = {
  rule: /^[0-9a-fA-F]{24}$/,
  message: 'Your string fails to match the Object Id pattern!'
}

export const EMAIL_RULE = {
  rule: /^[\w\.]+@([\w-]+.)+[\w-]{2,4}$/,
  message: 'Your email fails to match the Email pattern!'
}

export const PASSWORD_RULE = {
  rule: /^[a-zA-Z0-9]+$/,
  message: 'Your password fails to match the Password pattern!'
}

export const WHITELIST_DOMAINS = [
  // 'http://localhost:5173',
  'https://npn-trello.vercel.app'
]
