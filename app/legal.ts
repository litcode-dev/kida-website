/* Facts that /privacy and /delete-account both state out loud. They are legal
 * commitments — the Play Console Data safety form points at the deletion page
 * — so they live here and both pages read from them rather than each carrying
 * its own copy that can drift. */

export const SUPPORT_EMAIL = "kida.audio@gmail.com";

/* Rights requests (copies of data, complaints) route here. Move this to an
 * address on a domain we control as soon as there is one — a rights notice
 * that answers from a free mailbox is the detail reviewers and enterprise
 * buyers pick up on first. Ordinary support stays on SUPPORT_EMAIL. */
export const PRIVACY_EMAIL = SUPPORT_EMAIL;

/* How long we take to answer a deletion or rights request. */
export const RESPONSE_TIME = "two working days";

/* Deletion is immediate. These are the only things that outlive the account. */
export const BACKUP_WINDOW = "30 days";
export const COPY_WINDOW = "30 days";
export const PURCHASE_RETENTION = "6 years";
export const CRASH_RETENTION = "90 days";
export const LOG_RETENTION = "30 days";
