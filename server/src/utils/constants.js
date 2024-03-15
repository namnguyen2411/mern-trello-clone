export const BOARD_TYPE = {
  private: 'private',
  public: 'public'
}

export const MONGODB_OBJECT_ID_RULE = {
  rule: /^[0-9a-fA-F]{24}$/,
  message: 'Your string fails to match the Object Id pattern!'
}

export const WHITELIST_DOMAINS = ['http://localhost:5173']
