export type OidcConfig = {
  issuerBase: string; // https://auth.example.com/realms/xxx
  clientId: string;
  redirectUri: string; // https://app.example.com/auth/callback  | mobile: myapp://auth
  scope?: string; // "openid email profile"
};

export const endpoints = (issuerBase: string) => ({
  authorize: `${issuerBase}/protocol/openid-connect/auth`,
  token: `${issuerBase}/protocol/openid-connect/token`,
  logout: `${issuerBase}/protocol/openid-connect/logout`,
});

export function buildAuthorizeUrl(
  cfg: OidcConfig,
  state: string,
  codeChallenge: string
) {
  const { authorize } = endpoints(cfg.issuerBase);
  const q = new URLSearchParams({
    client_id: cfg.clientId,
    response_type: 'code',
    redirect_uri: cfg.redirectUri,
    scope: cfg.scope ?? 'openid email profile',
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });
  return `${authorize}?${q.toString()}`;
}

export function buildTokenBodyByCode(
  cfg: OidcConfig,
  code: string,
  verifier: string
) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: cfg.clientId,
    code,
    code_verifier: verifier,
    redirect_uri: cfg.redirectUri,
  });
  return body;
}

export function buildTokenBodyByRefresh(cfg: OidcConfig, refreshToken: string) {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: cfg.clientId,
    refresh_token: refreshToken,
  });
  return body;
}
