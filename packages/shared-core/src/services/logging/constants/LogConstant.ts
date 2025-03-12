class LOG_MODULE_CONSTANTS {
  static readonly LOG_SITE_FRONTEND = "site_frontend";
  static readonly LOG_SHARED_BACKEND = "shared_backend";
  static readonly LOG_SHARED_CLIENT = "shared_client";
  static readonly LOG_SHARED_CORE = "shared_core";
  static readonly LOG_AFFILIATE_API = "shared_affiliate_api";
  static readonly LOG_ADMIN_SCRIPTS = "shared_admin_scripts";
  static readonly LOG_SHARED_ADMIN_BACKEND = "shared_admin_backend";
  static readonly LOG_SHARED_ADMIN_FRONTEND = "shared_admin_frontend";
  static readonly LOG_SHARED_REPORTING_SERVER = "shared_reporting_server";
  static readonly LOG_SHARED_IPN_SERVER = "shared_ipn_server";
  static readonly LOG_SHARED_SERVER = "shared_server";
  static readonly LOG_SHARED_DISCORD_BOT = "shared_discord_bot";
}

class LOG_LEVEL_CONSTANTS {
  static readonly LOG_INFO = "info";
  static readonly LOG_WARN = "warn";
  static readonly LOG_WARNING = "warning";
  static readonly LOG_ERROR = "error";
  static readonly LOG_DEBUG = "debug";
}
export { LOG_MODULE_CONSTANTS, LOG_LEVEL_CONSTANTS };
