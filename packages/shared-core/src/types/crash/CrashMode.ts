//Same mode for crash and dice
import type { modes } from "#core/services/crash/Crash";

export type CrashMode = (typeof modes)[number];
