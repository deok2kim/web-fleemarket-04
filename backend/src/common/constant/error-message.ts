export const ERROR_MESSAGE = {
  UNAUTHORIZED: '로그인을 해주세요',
  INVALID_TOKEN: '유효하지 않은 토큰입니다',
  EXPIRED_TOKEN: '토큰이 만료되었습니다',
  INTERNAL_SERVER_ERROR: '서버 오류입니다',
  EXCEED_REGIONS: '등록할 수 있는 동네 수를 초과했습니다.',
  DUPLICATE_REGION: '이미 등록된 동네입니다.',
  NOT_FOUND_REGION: '등록된 동네가 없습니다.',
  NOT_APPLIED_REGION: '등록되지 않은 동네는 삭제하실 수 없습니다.',
} as const;

export const ERROR_CODE = {
  EXCEED_REGIONS: 1000,
  DUPLICATE_REGION: 1001,
  NOT_FOUND_REGION: 1002,
  NOT_APPLIED_REGION: 1003,
};
