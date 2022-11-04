export enum Gender {
  /** 女性 */
  FEMALE = 0,
  /** 男性 */
  MALEL = 1,
}

export enum UserType {
  /** 管理员 */
  ADMIN = 0,
  /** 普通用户 */
  USER = 1,
}

export enum StatusValue {
  /** 禁用 */
  DISABLED = 0,
  /** 正常使用 */
  ENABLED = 1,
}

export enum ConsumptionType {
  /** 养发 */
  HAIR_CARE = 1,
  /** 染发 */
  HAIR_DYE = 2,
  /** 其他 */
  OTHER = 9,
}

export enum HairType {
  /** 短发 */
  SHORT = 1,
  /** 中发 */
  MIDDLE = 2,
  /** 长发 */
  LONE = 3,
  /** 超长发 */
  EXTRA_LONG = 4,
}

export enum BalanceType {
  /** 充值 */
  RECHARGE = 1,
  /** 消费 */
  CONSUMEPTION = 2,
}
