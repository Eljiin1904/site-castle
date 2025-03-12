import { AuthenticatedUser } from "#core/types/users/AuthenticatedUser";
import { UserDocument } from "#core/types/users/UserDocument";

export function getAuthenticatedUser(value: UserDocument): AuthenticatedUser {
  return {
    _id: value._id,
    registerDate: value.registerDate,
    referer: value.referer,
    referral: value.referral,
    locale: value.locale,
    username: value.username,
    email: value.email,
    emailConfirmed: value.emailConfirmed,
    role: value.role,
    tags: value.tags,
    avatarIndex: value.avatarIndex,
    avatarId: value.avatarId,
    tokenBalance: value.tokenBalance,
    vaultBalance: value.vaultBalance,
    gemBalance: value.gemBalance,
    holidayBalance: value.holidayBalance,
    xp: value.xp,
    stats: value.stats,
    chestKeys: value.chestKeys,
    settings: value.settings,
    passwordSet: value.passwordSet,
    steamId: value.steamId,
    googleId: value.googleId,
    discordId: value.discordId,
    twitchId: value.twitchId,
    affiliate: value.affiliate,
    tfa: {
      enabled: value.tfa.enabled,
    },
    kyc: {
      tier: value.kyc.tier,
    },
    mute: value.mute,
    suspension: value.suspension,
    ban: value.ban,
    blockedUsers: value.blockedUsers,
    meta: {
      lastMessageDate: value.meta.lastMessageDate,
      lastRainId: value.meta.lastRainId,
      tipLimit: value.meta.tipLimit,
      pendingReferralCode: value.meta.pendingReferralCode,
      reloadsEnabled: value.meta.reloadsEnabled,
      steamTradeUrl: value.meta.steamTradeUrl,
      wagerRequirement: value.meta.wagerRequirement,
    },
  };
}
