import crypto from 'crypto';

export const b64url = (b: Buffer) =>
  b
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

export const genState = () => b64url(crypto.randomBytes(32));
export const genCodeVerifier = () => b64url(crypto.randomBytes(64));
export const toCodeChallenge = (verifier: string) =>
  b64url(crypto.createHash('sha256').update(verifier).digest());
