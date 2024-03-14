/**
 * Array containing provider objects.
 * Each provider object represents a different authentication provider.
 * It includes properties such as code, icon link, title, subtitle, and redirect URL.
 * This array can be used to configure multiple authentication providers in an application.
 */
export const providers = [
  {
    code: 'digilocker',
    iconLink: 'https://example.com/icon1.png',
    title: 'Provider 1',
    subTitle: 'Sub Title 1',
    redirectUrl: '',
  },
  {
    code: 'googleAuth',
    iconLink: 'https://example.com/icon2.png',
    title: 'Provider 2',
    subTitle: 'Sub Title 2',
    redirectUrl: 'https://example.com/provider2',
  },
];
