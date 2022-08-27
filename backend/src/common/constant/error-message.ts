export const ERROR_MESSAGE = {
  UNAUTHORIZED: '로그인을 해주세요',
  INVALID_TOKEN: '유효하지 않은 토큰입니다',
  EXPIRED_TOKEN: '토큰이 만료되었습니다',
  INTERNAL_SERVER_ERROR: '서버 오류입니다',
  EXCEED_REGIONS: '등록할 수 있는 동네 수를 초과했습니다.',
  DUPLICATE_REGION: '이미 등록된 동네입니다.',
  NOT_FOUND_REGION: '등록된 동네가 없습니다.',
  NOT_APPLIED_REGION: '등록되지 않은 동네입니다.',
  ALREADY_LIKE: '이미 찜한 상품입니다.',
  NOT_LIKED: '찜하지 않은 상품은 취소할 수 없습니다.',
  NOT_FOUND_PRODUCT: '등록되지 않은 상품입니다',
  ONLY_EDITABLE_OWNER: '상품 주인만 수정이 가능합니다.',
  NOT_FOUND_USER: '존재하지 않는 사용자입니다.',
  CANNOT_REMOVE_ONE_REGION: '최소 1개의 지역을 등록해야합니다.',
  ALREADY_PRIMARY_REGION: '이미 선택한 지역입니다.',
  ONLY_DELETE_OWNER: '상품 주인만 삭제가 가능합니다.',
} as const;

export const ERROR_CODE = {
  EXCEED_REGIONS: 1000,
  DUPLICATE_REGION: 1001,
  NOT_FOUND_REGION: 1002,
  NOT_APPLIED_REGION: 1003,
  ALREADY_LIKE: 1004,
  NOT_LIKED: 1005,
  NOT_FOUND_PRODUCT: 1006,
  ONLY_EDITABLE_OWNER: 1007,
  NOT_FOUND_USER: 1008,
  CANNOT_REMOVE_ONE_REGION: 1009,
  ALREADY_PRIMARY_REGION: 1010,
  ONLY_DELETE_OWNER: 1011,
} as const;

