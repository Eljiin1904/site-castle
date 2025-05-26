//Same mode for crash and dice
import type { controlModes } from "#core/services/crash/Crash";

export type  CrashControlMode = (typeof controlModes)[number];
